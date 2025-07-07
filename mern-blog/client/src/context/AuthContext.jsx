import { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (token) {
          const { data } = await API.get('/api/users/me');
          setUser(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post('/api/users/login', { email, password });
    localStorage.setItem('userToken', data.token);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  const register = async (name, email, password) => {
    const { data } = await API.post('/api/users', { name, email, password });
    localStorage.setItem('userToken', data.token);
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);