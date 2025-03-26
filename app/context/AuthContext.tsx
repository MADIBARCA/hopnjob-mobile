import React, { createContext, useState, useContext } from 'react';

type UserLocation = {
  latitude: number;
  longitude: number;
};

export type CategoryItem = {
  id: string;
  category: string;
  image_Base64: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isProfileComplete: boolean;
  token: string | null;
  firstName?: string;
  lastName?: string;
  userAge?: string;
  userLocation?: UserLocation;
  employeeCategories: CategoryItem[]; // Updated type here
  userAvatar?: string;
  setIsAuthenticated: (val: boolean) => void;
  setIsProfileComplete: (val: boolean) => void;
  setToken: (token: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setUserAge: (userAge: string) => void;
  setUserLocation: (location: UserLocation) => void;
  setEmployeeCategories: (categories: CategoryItem[]) => void; // Updated setter type
  setUserAvatar: (userAvatar: string) => void;
  resetAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const [userAge, setUserAge] = useState<string | undefined>(undefined);
  const [userLocation, setUserLocation] = useState<UserLocation | undefined>(undefined);
  const [employeeCategories, setEmployeeCategories] = useState<CategoryItem[]>([]); // Updated state
  const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined);

  const resetAuth = () => {
    setIsAuthenticated(false);
    setIsProfileComplete(false);
    setToken(null);
    setFirstName(undefined);
    setLastName(undefined);
    setUserAge(undefined);
    setUserLocation(undefined);
    setEmployeeCategories([]);
    setUserAvatar(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isProfileComplete,
        token,
        firstName,
        lastName,
        userAge,
        userLocation,
        employeeCategories,
        userAvatar,
        setIsAuthenticated,
        setIsProfileComplete,
        setToken,
        setFirstName,
        setLastName,
        setUserAge,
        setUserLocation,
        setEmployeeCategories,
        setUserAvatar,
        resetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}