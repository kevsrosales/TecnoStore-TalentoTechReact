import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Carrito from '../components/carrito';

export default function CarritoPage() {
    return (
        <>
            <Helmet>
                <title>Mi Carrito - TechStore</title>
                <meta name="description" content="Revisa los productos en tu carrito de compras" />
            </Helmet>

            <Container className="my-4">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <h2 className="mb-4">Mi Carrito</h2>
                        <Carrito />
                    </Col>
                </Row>
            </Container>
        </>
    );
}