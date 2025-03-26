import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

interface MarkerData {
  id: number;
  title: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  count: number; // The number you displayed in circles on your example
}

export default function SearchMap() {
  // Initial region (could be any default or user's current location)
  const [region, setRegion] = useState<Region>({
    latitude: -6.200000,   // Example: Jakarta
    longitude: 106.816666, // Example: Jakarta
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Example marker data
  const [markers, setMarkers] = useState<MarkerData[]>([
    {
      id: 1,
      title: 'Central Jakarta',
      coordinate: { latitude: -6.186486, longitude: 106.834091 },
      count: 6458,
    },
    {
      id: 2,
      title: 'North Jakarta',
      coordinate: { latitude: -6.121435, longitude: 106.774124 },
      count: 3587,
    },
    {
      id: 3,
      title: 'South Jakarta',
      coordinate: { latitude: -6.243949, longitude: 106.800391 },
      count: 5485,
    },
    {
      id: 4,
      title: 'West Jakarta',
      coordinate: { latitude: -6.168329, longitude: 106.758911 },
      count: 2342,
    },
  ]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input changes
  function handleSearch(query: string) {
    setSearchQuery(query);
    // Here you can implement your logic to filter or fetch data
    // For example, you might fetch new markers based on the query
  }

  // Optional: fetch user location or update region when user moves
  // useEffect(() => {
  //   // Example: fetch user location
  //   // navigator.geolocation.getCurrentPosition(
  //   //   (position) => {
  //   //     const { latitude, longitude } = position.coords;
  //   //     setRegion((prev) => ({
  //   //       ...prev,
  //   //       latitude,
  //   //       longitude,
  //   //     }));
  //   //   },
  //   //   (error) => console.log(error),
  //   //   { enableHighAccuracy: true }
  //   // );
  // }, []);

  function onRegionChangeComplete(updatedRegion: Region) {
    setRegion(updatedRegion);
  }

  // Dismiss keyboard when tapping outside TextInput
  function dismissKeyboard() {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="In which area you are searching for the job?"
            value={searchQuery}
            placeholderTextColor="#6B6B6B"
            onChangeText={handleSearch}
            returnKeyType="search"
          />
        </View>

        {/* Map */}
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={`Jobs: ${marker.count}`}
            >
              {/* 
                Custom marker to display the count in a circle.
                You can style or customize as needed.
              */}
              <View style={styles.markerContainer}>
                <View style={styles.markerCircle}>
                  <Text style={styles.markerText}>{marker.count}</Text>
                </View>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 80,
    width: '90%',
    alignSelf: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 8
  },
  map: {
    width: width,
    height: height,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerCircle: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});