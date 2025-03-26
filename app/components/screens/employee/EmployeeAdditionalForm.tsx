import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useAuth, CategoryItem } from '../../../context/AuthContext'; 

type CitySuggestion = {
  name: string;
  lat: number;
  lng: number;
};

export default function EmployeeAdditionalForm() {
  const router = useRouter();
  const {
    token,
    firstName,
    lastName,
    userAge,
    setUserAge,
    setIsProfileComplete,
    employeeCategories,
    setEmployeeCategories,
  } = useAuth(); 

  // City input and suggestion state
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(false);

  // -------------------- Fetch City Suggestions --------------------
  useEffect(() => {
    if (city.length > 2) {
      fetchCitySuggestions(city).then((results) => {
        setSuggestions(results);
      });
    } else {
      setSuggestions([]);
    }
  }, [city]);

  async function fetchCitySuggestions(query: string): Promise<CitySuggestion[]> {
    const indonesianCities: CitySuggestion[] = [
      { name: 'Jakarta', lat: -6.2088, lng: 106.8456 },
      { name: 'Surabaya', lat: -7.2504, lng: 112.7688 },
      { name: 'Bandung', lat: -6.9147, lng: 107.6098 },
      { name: 'Medan', lat: 3.5952, lng: 98.6722 },
      { name: 'Semarang', lat: -6.9667, lng: 110.4167 },
      { name: 'Makassar', lat: -5.1354, lng: 119.4238 },
      { name: 'Denpasar', lat: -8.6705, lng: 115.2126 },
      { name: 'Palembang', lat: -2.9761, lng: 104.7754 },
      { name: 'Yogyakarta', lat: -7.7956, lng: 110.3695 },
      { name: 'Balikpapan', lat: -1.2379, lng: 116.8529 },
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = indonesianCities.filter((city) =>
          city.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  }

  function handleSelectSuggestion(item: CitySuggestion) {
    setCity(item.name);
    setSelectedCoordinates({ lat: item.lat, lng: item.lng });
    setSuggestions([]);
  }

  // -------------------- Fetch Categories from API --------------------
  useEffect(() => {
    async function fetchCategories() {
      setFetchingCategories(true);
      try {
        const response = await fetch('http://195.49.213.214:5700/api/v1/Catalog/Categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Fetching categories failed');
        }
        const data = await response.json();
        console.log('Categories:', data);
        if (data.items && Array.isArray(data.items)) {
          // Initialize each category with an extra "selected" property set to false
          const initialCategories = data.items.map((item: CategoryItem) => ({
            ...item,
            selected: false,
          }));
          setEmployeeCategories(initialCategories);
        }
      } catch (error: any) {
        console.log(error);
        Alert.alert('Error', error.message);
      } finally {
        setFetchingCategories(false);
      }
    }

    if (employeeCategories.length === 0) {
      fetchCategories();
    }
  }, [token, employeeCategories, setEmployeeCategories]);

  // -------------------- Category Selection --------------------
  function handleCategoryPress(categoryId: string) {
    // Toggle the "selected" property for the corresponding category
    const updatedCategories = employeeCategories.map((cat: CategoryItem & { selected?: boolean }) => {
      if (cat.id === categoryId) {
        return { ...cat, selected: !cat.selected };
      }
      return cat;
    });
    setEmployeeCategories(updatedCategories);
  }

  // -------------------- Submit Profile --------------------
  async function handleSubmitProfile() {
    if (!userAge) {
      Alert.alert('Error', 'Please enter your age');
      return;
    }
    if (!selectedCoordinates) {
      Alert.alert('Error', 'Please select a city from the suggestions');
      return;
    }
    
    // Build array of selected category IDs from employeeCategories
    const selectedCategoryIds = employeeCategories
      .filter((cat: any) => cat.selected)
      .map((cat: any) => cat.id);

    if (selectedCategoryIds.length === 0) {
      Alert.alert('Error', 'Please select at least one category');
      return;
    }

    const payload = {
      firstName: firstName || '',  // from context
      lastName: lastName || '',      // from context
      age: parseInt(userAge, 10) || 0,
      geoPoint: {
        latitude: selectedCoordinates.lat,
        longitude: selectedCoordinates.lng,
      },
      categories: selectedCategoryIds,
    };

    console.log('Submitting payload:', payload);

    setLoading(true);
    try {
      const response = await fetch('http://195.49.213.214:5700/api/v1/jobseeker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);

      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error('Profile creation failed');
      }

      setIsProfileComplete(true);
      router.push('/tabs/employee/EmployeeProfile');
    } catch (error: any) {
      console.log(error);
      Alert.alert('Profile Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  // -------------------- Render --------------------
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={userAge}
          onChangeText={setUserAge}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={(val) => {
            setCity(val);
            setSelectedCoordinates(null); // Reset coordinates if user types a new city
          }}
        />
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.name}
            style={styles.suggestionsList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelectSuggestion(item)}
              >
                <Text style={styles.suggestionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <Text style={styles.subtitle}>Select Your Categories:</Text>
        {fetchingCategories ? (
          <ActivityIndicator style={{ marginVertical: 8 }} />
        ) : (
          <FlatList
            data={employeeCategories}
            keyExtractor={(item) => item.id}
            style={styles.categoriesList}
            renderItem={({ item }) => {
              const isSelected = (item as any).selected;
              return (
                <TouchableOpacity
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipSelected,
                  ]}
                  onPress={() => handleCategoryPress(item.id)}
                >
                  <Text style={styles.categoryText}>{item.category}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitProfile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Profile</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
    width: '80%',
    margin: 'auto',
    top: '20%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
  },
  formContainer: {
    marginTop: 16,
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#111',
  },
  suggestionsList: {
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    marginBottom: 12,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  suggestionText: {
    fontSize: 16,
    color: '#111',
  },
  categoriesList: {
    maxHeight: 150,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    padding: 8,
  },
  categoryChip: {
    borderColor: '#AAA',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
  },
  categoryChipSelected: {
    backgroundColor: '#417290',
  },
  categoryText: {
    color: '#111',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#417290',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});