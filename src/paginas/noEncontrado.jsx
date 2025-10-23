import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NoEncontrado() {
    return (
        <Container className="text-center my-5">
            <h1 className="display-1">404</h1>
            <h2>Página no encontrada</h2>
            <p className="lead my-4">Lo sentimos, la página que buscas no existe.</p>
            <Button as={Link} to="/" variant="primary" size="lg">
                Volver al Inicio
            </Button>
        </Container>
    );
}