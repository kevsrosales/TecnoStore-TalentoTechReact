import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';

export default function Header() {
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useAuth();
    const { totalItems } = useCarrito();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar
            variant="dark"
            expand="lg"
            className="mb-4 navbar-sticky"
            style={{ backgroundColor: '#1a1d29' }}
        >
            <Container>
                <Navbar.Brand as={Link} to="/">🛒 TechStore</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        {isAuthenticated && user?.role === 'admin' && (
                            <Nav.Link as={Link} to="/admin">Administración</Nav.Link>
                        )}
                        <Nav.Link as={Link} to="/carrito">
                            Carrito <Badge bg="primary">{totalItems}</Badge>
                        </Nav.Link>

                        {isAuthenticated ? (
                            <>
                                <Nav.Link disabled className="text-light">
                                    Hola, {user?.username}
                                </Nav.Link>
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="ms-2"
                                >
                                    Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}