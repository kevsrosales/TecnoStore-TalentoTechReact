import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

export default function Login() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (usuario === 'admin' && password === '1234') {
            localStorage.setItem('auth', 'true');
            navigate('/');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
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
                            <Form.Text className="text-muted">
                                Usuario: admin
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
                            <Form.Text className="text-muted">
                                Contraseña: 1234
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Entrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}