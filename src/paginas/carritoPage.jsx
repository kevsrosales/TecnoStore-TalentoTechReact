import { Container, Row, Col } from 'react-bootstrap';
import Carrito from '../components/carrito';

export default function CarritoPage({ items, onEliminar, onModificarCantidad }) {
    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <h2 className="mb-4">Mi Carrito</h2>
                    <Carrito
                        items={items}
                        onEliminar={onEliminar}
                        onModificarCantidad={onModificarCantidad}
                    />
                </Col>
            </Row>
        </Container>
    );
}