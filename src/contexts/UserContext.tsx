'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import Cookies from 'js-cookie';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = Cookies.get('user');
    if (savedUser) {
      try {
        setUserState(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        Cookies.remove('user');
      }
    }
    setIsLoading(false);
  }, []);

  const setUser = (userData: User | null) => {
    if (userData) {
      Cookies.set('user', JSON.stringify(userData), { expires: 7 });
      setUserState(userData);
    } else {
      Cookies.remove('user');
      setUserState(null);
    }
  };

  const logout = () => {
    Cookies.remove('user');
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}