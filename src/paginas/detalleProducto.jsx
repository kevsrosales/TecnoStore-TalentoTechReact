import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FiShoppingCart } from 'react-icons/fi';
import { useCarrito } from '../context/CarritoContext';

export default function DetalleProducto() {
    const { id } = useParams();
    const { agregarAlCarrito } = useCarrito();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://68f048d60b966ad50032670e.mockapi.io/Productos/${id}`);

                if (!response.ok) {
                    throw new Error('Producto no encontrado');
                }

                const data = await response.json();
                setProducto(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Cargando producto...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-4">
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Container>
        );
    }

    return (
        <>
            <Helmet>
                <title>{producto.nombre} - TechStore</title>
                <meta name="description" content={`${producto.nombre} - ${producto.categoria} por solo $${producto.precio}. Compra ahora en TechStore.`} />
            </Helmet>

            <Container className="my-5">
                <Row>
                    <Col md={6}>
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="img-fluid rounded"
                            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                        />
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Subtitle className="mb-3 text-muted">
                                    {producto.categoria}
                                </Card.Subtitle>
                                <Card.Title as="h2">{producto.nombre}</Card.Title>
                                <h3 className="text-success my-4">${producto.precio}</h3>
                                <Card.Text>
                                    Este es un excelente producto de la categoría {producto.categoria}.
                                    Disponible para compra inmediata.
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-100 mt-3"
                                    onClick={() => agregarAlCarrito(producto)}
                                >
                                    <FiShoppingCart className="me-2" />
                                    Agregar al Carrito
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}