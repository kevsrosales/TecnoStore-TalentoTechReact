import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ cartCount }) {
    const navigate = useNavigate();
    const isAuth = localStorage.getItem('auth') === 'true';

    const handleLogout = () => {
        localStorage.removeItem('auth');
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">🛒 TechStore</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/carrito">
                            Carrito <Badge bg="primary">{cartCount}</Badge>
                        </Nav.Link>

                        {isAuth ? (
                            <Button
                                variant="outline-light"
                                size="sm"
                                onClick={handleLogout}
                                className="ms-2"
                            >
                                Cerrar Sesión
                            </Button>
                        ) : (
                            <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}