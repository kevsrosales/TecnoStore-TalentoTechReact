import { Container, Row, Col } from 'react-bootstrap';
import Carrito from '../components/Carrito';

export default function CarritoPage() {
    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <h2 className="mb-4">Mi Carrito</h2>
                    <Carrito />
                </Col>
            </Row>
        </Container>
    );
}