import { createContext, useState, useContext, useEffect } from 'react';

const ProductosContext = createContext();

export const useProductos = () => {
    const context = useContext(ProductosContext);
    if (!context) {
        throw new Error('useProductos debe usarse dentro de ProductosProvider');
    }
    return context;
};

export const ProductosProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'https://68f048d60b966ad50032670e.mockapi.io/Productos';

    const fetchProductos = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }

            const data = await response.json();
            setProductos(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const crearProducto = async (nuevoProducto) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProducto)
            });

            if (!response.ok) throw new Error('Error al crear producto');

            await fetchProductos();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const actualizarProducto = async (id, productoActualizado) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoActualizado)
            });

            if (!response.ok) throw new Error('Error al actualizar producto');

            await fetchProductos();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const eliminarProducto = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Error al eliminar producto');

            await fetchProductos();
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const value = {
        productos,
        loading,
        error,
        fetchProductos,
        crearProducto,
        actualizarProducto,
        eliminarProducto
    };

    return (
        <ProductosContext.Provider value={value}>
            {children}
        </ProductosContext.Provider>
    );
};