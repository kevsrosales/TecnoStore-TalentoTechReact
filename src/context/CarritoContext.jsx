import { createContext, useState, useContext } from 'react';

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
                return prevCarrito.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [...prevCarrito, { ...producto, cantidad: 1 }];
            }
        });
    };

    const eliminarDelCarrito = (productoId) => {
        setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== productoId));
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
        setCarrito([]);
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