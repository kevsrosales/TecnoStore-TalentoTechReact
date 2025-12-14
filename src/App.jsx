import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Carrito from './components/Carrito';
import Inicio from './paginas/Inicio';
import DetalleProducto from './paginas/DetalleProducto';
import Login from './paginas/Login';
import CarritoPage from './paginas/CarritoPage';
import NoEncontrado from './paginas/NoEncontrado';
import { useCarrito } from './context/CarritoContext';
import Administracion from './paginas/Administracion';

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { totalItems } = useCarrito();

  // useEffect para traer productos de la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://68f048d60b966ad50032670e.mockapi.io/Productos');

        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }

        const data = await response.json();
        setProductos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <>
      <Header cartCount={totalItems} />

      <main style={{ flex: 1 }}>
        <Routes>
          { }
          <Route
            path="/login"
            element={
              <Container>
                <Login />
              </Container>
            }
          />

          { }
          <Route
            path="/admin"
            element={
              <Container>
                <Administracion />
              </Container>
            }
          />

          { }
          <Route
            path="/carrito"
            element={<CarritoPage />}
          />

          { }
          <Route
            path="/"
            element={
              <>
                <Inicio
                  productos={productos}
                  loading={loading}
                  error={error}
                />
                <Container className="my-5">
                  <Row className="justify-content-center">
                    <Col lg={8}>
                      <Carrito />
                    </Col>
                  </Row>
                </Container>
              </>
            }
          />

          { }
          <Route
            path="/producto/:id"
            element={
              <Container>
                <Row>
                  <Col lg={8}>
                    <DetalleProducto />
                  </Col>
                  <Col lg={4}>
                    <div className="sticky-top" style={{ top: '20px' }}>
                      <Carrito />
                    </div>
                  </Col>
                </Row>
              </Container>
            }
          />

          { }
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;