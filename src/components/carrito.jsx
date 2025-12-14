import { Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { useCarrito } from '../context/CarritoContext';

export default function Carrito() {
    const { carrito, eliminarDelCarrito, modificarCantidad, vaciarCarrito, totalPrecio } = useCarrito();

    return (
        <Card>
            <Card.Header>
                <h3>Carrito de Compras</h3>
            </Card.Header>
            <Card.Body>
                {carrito.length === 0 ? (
                    <p className="text-muted text-center">El carrito está vacío</p>
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
                                            >
                                                🗑️
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
                            <Button variant="success" className="w-100 mb-2">
                                Finalizar Compra
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="w-100"
                                onClick={vaciarCarrito}
                            >
                                Vaciar Carrito
                            </Button>
                        </div>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}