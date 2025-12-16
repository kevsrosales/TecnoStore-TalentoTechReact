import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { FiTrash2, FiShoppingCart, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Carrito() {
    const { carrito, eliminarDelCarrito, modificarCantidad, vaciarCarrito, totalPrecio } = useCarrito();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleFinalizarCompra = () => {
        if (!isAuthenticated) {
            toast.warning('⚠️ Debes iniciar sesión para finalizar la compra');
            navigate('/login');
            return;
        }

        if (carrito.length === 0) {
            toast.error('❌ El carrito está vacío');
            return;
        }

        // Simular finalización de compra
        toast.success('🎉 ¡Compra realizada con éxito! Gracias por tu compra.');
        vaciarCarrito();
    };

    return (
        <Card>
            <Card.Header className="d-flex align-items-center justify-content-between">
                <h3 className="mb-0">
                    <FiShoppingCart className="me-2" />
                    Carrito de Compras
                </h3>
                {carrito.length > 0 && (
                    <Badge bg="primary">{carrito.length}</Badge>
                )}
            </Card.Header>
            <Card.Body>
                {carrito.length === 0 ? (
                    <div className="text-center py-4">
                        <FiShoppingCart size={48} className="text-muted mb-3" />
                        <p className="text-muted">El carrito está vacío</p>
                    </div>
                ) : (
                    <>
                        <ListGroup variant="flush">
                            {carrito.map(item => (
                                <ListGroup.Item key={item.id}>
                                    <div className="d-flex align-items-center mb-2">
                                        <img
                                            src={item.imagen}
                                            alt={item.nombre}
                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                            className="me-3 rounded"
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1">{item.nombre}</h6>
                                            <small className="text-muted">${item.precio} c/u</small>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group" role="group">
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => modificarCantidad(item.id, item.cantidad - 1)}
                                                disabled={item.cantidad <= 1}
                                            >
                                                -
                                            </Button>
                                            <Button variant="outline-secondary" size="sm" disabled>
                                                {item.cantidad}
                                            </Button>
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => modificarCantidad(item.id, item.cantidad + 1)}
                                            >
                                                +
                                            </Button>
                                        </div>

                                        <div className="d-flex align-items-center gap-2">
                                            <strong className="text-success">
                                                ${(item.precio * item.cantidad).toFixed(2)}
                                            </strong>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => eliminarDelCarrito(item.id)}
                                                title="Eliminar"
                                            >
                                                <FiTrash2 />
                                            </Button>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        <div className="mt-3 pt-3 border-top">
                            <div className="d-flex justify-content-between mb-3">
                                <h5>Total:</h5>
                                <h5 className="text-success">${totalPrecio.toFixed(2)}</h5>
                            </div>
                            <Button
                                variant="success"
                                className="w-100 mb-2"
                                onClick={handleFinalizarCompra}
                            >
                                <FiCheck className="me-2" />
                                Finalizar Compra
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="w-100"
                                onClick={vaciarCarrito}
                            >
                                <FiTrash2 className="me-2" />
                                Vaciar Carrito
                            </Button>
                        </div>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}