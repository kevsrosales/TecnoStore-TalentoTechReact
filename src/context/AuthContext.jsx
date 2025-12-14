import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authStatus = localStorage.getItem('auth');
        const userData = localStorage.getItem('user');

        if (authStatus === 'true' && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        if (username === 'admin' && password === '1234') {
            const userData = {
                username: 'admin',
                email: 'admin@techstore.com',
                role: 'admin'
            };

            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('auth', 'true');
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
        } else {
            return { success: false, error: 'Usuario o contraseña incorrectos' };
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};