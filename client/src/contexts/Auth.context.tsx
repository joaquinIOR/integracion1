import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

// Define una interfaz para el objeto de usuario
interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    login: (userData: any) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        // Al cargar la app, intenta recuperar el token y el usuario del localStorage
        try {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser)); // Convierte el string de vuelta a objeto
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Error al cargar datos de autenticación:", error);
            // Limpia el storage si los datos están corruptos
            localStorage.clear();
        }
        setIsLoading(false);
    }, []);

    const login = async (userData: any) => {
        const response = await fetch('http://localhost:7000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');
        
        // Guarda tanto el token como el objeto de usuario en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // Convierte el objeto a string
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        history.push('/home');
    };

    const register = async (userData: any) => {
        const response = await fetch('http://localhost:7000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error al registrarse');
        history.push('/login');
    };
    
    const logout = () => {
        // Limpia ambos items del localStorage al cerrar sesión
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        history.push('/login');
    };

    const value = { isAuthenticated, user, token, login, register, logout, isLoading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
