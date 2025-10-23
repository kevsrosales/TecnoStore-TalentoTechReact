import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductoCard({ producto, onAgregar }) {
    return (
        <Card className="h-100">
            <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img
                    variant="top"
                    src={producto.imagen}
                    style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                />
            </Link>
            <Card.Body className="d-flex flex-column">
                <Card.Subtitle className="mb-2 text-muted">
                    {producto.categoria}
                </Card.Subtitle>
                <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Title style={{ cursor: 'pointer' }}>{producto.nombre}</Card.Title>
                </Link>
                <Card.Text className="text-success fw-bold fs-4">
                    ${producto.precio}
                </Card.Text>
                <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() => onAgregar(producto)}
                >
                    Agregar al Carrito
                </Button>
            </Card.Body>
        </Card>
    );
}