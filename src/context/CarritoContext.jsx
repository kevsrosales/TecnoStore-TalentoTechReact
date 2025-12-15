import { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';

const CarritoContext = createContext();

export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito debe usarse dentro de CarritoProvider');
    }
    return context;
};

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito(prevCarrito => {
            const productoExistente = prevCarrito.find(item => item.id === producto.id);

            if (productoExistente) {
                toast.info(`➕ Cantidad de ${producto.nombre} actualizada`);
                return prevCarrito.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                toast.success(`🛒 ${producto.nombre} agregado al carrito`);
                return [...prevCarrito, { ...producto, cantidad: 1 }];
            }
        });
    };

    const eliminarDelCarrito = (productoId) => {
        const producto = carrito.find(item => item.id === productoId);
        setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== productoId));
        toast.warning(`🗑️ ${producto?.nombre} eliminado del carrito`);
    };

    const modificarCantidad = (productoId, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;

        setCarrito(prevCarrito =>
            prevCarrito.map(item =>
                item.id === productoId
                    ? { ...item, cantidad: nuevaCantidad }
                    : item
            )
        );
    };

    const vaciarCarrito = () => {
        if (carrito.length > 0) {
            setCarrito([]);
            toast.info('🧹 Carrito vaciado');
        }
    };

    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrecio = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    const value = {
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        modificarCantidad,
        vaciarCarrito,
        totalItems,
        totalPrecio
    };

    return (
        <CarritoContext.Provider value={value}>
            {children}
        </CarritoContext.Provider>
    );
};