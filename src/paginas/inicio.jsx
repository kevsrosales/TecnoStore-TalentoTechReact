import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductoCard from '../components/ProductoCard';
import Banner from '../components/Banner';

export default function Inicio({ productos, loading, error, onAgregarAlCarrito }) {
    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p className="mt-3">Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="my-4">
                <Alert.Heading>Error</Alert.Heading>
                <p>{error}</p>
            </Alert>
        );
    }

    return (
        <>
            <Banner />

            <Container className="my-5" id="productos">
                <h2 className="mb-4 text-center">Productos Disponibles</h2>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {productos.map(producto => (
                        <Col key={producto.id}>
                            <ProductoCard
                                producto={producto}
                                onAgregar={onAgregarAlCarrito}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}