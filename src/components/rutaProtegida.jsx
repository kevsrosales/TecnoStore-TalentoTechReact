import { Navigate } from 'react-router-dom';

export default function RutaProtegida({ children }) {
    const isAuth = localStorage.getItem('auth') === 'true';

    return isAuth ? children : <Navigate to="/login" />;
}