import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const result = login(usuario, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Iniciar Sesión - TechStore</title>
                <meta name="description" content="Inicia sesión en TechStore" />
            </Helmet>

            <Container className="my-5" style={{ maxWidth: '400px' }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Iniciar Sesión</h2>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    placeholder="Ingresa tu usuario"
                                    required
                                />
                                <Form.Text className="text-help">
                                    <strong style={{ color: '#8b5cf6' }}>Usuario:</strong> <span style={{ color: '#9ca3af' }}>admin</span>
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingresa tu contraseña"
                                    required
                                />
                                <Form.Text className="text-help">
                                    <strong style={{ color: '#8b5cf6' }}>Contraseña:</strong> <span style={{ color: '#9ca3af' }}>1234</span>
                                </Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Entrar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}