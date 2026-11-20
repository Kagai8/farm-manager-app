import { useState } from 'react';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('shambasync_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    const sessionUser = {
      id: userData.id,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      hasOnboarded: userData.hasOnboarded,
      farmProfile: userData.farmProfile,
    };
    localStorage.setItem('shambasync_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const updateUser = (updatedData) => {
    login(updatedData);
  };

  const logout = () => {
    localStorage.removeItem('shambasync_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}