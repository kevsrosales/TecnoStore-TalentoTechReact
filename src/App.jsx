import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/header';
import Footer from './components/footer';
import Carrito from './components/carrito';
import Inicio from './paginas/inicio';
import DetalleProducto from './paginas/detalleProducto';
import Login from './paginas/login';
import CarritoPage from './paginas/carritoPage';
import Administracion from './paginas/Administracion';
import NoEncontrado from './paginas/noEncontrado';
import { useCarrito } from './context/CarritoContext';

function App() {
  const { totalItems } = useCarrito();

  return (
    <>
      <Header cartCount={totalItems} />

      <main style={{ flex: 1 }}>
        <Routes>
          {/* Ruta de Login sin carrito ni sidebar */}
          <Route
            path="/login"
            element={
              <Container>
                <Login />
              </Container>
            }
          />

          {/* Ruta de Administración */}
          <Route
            path="/admin"
            element={
              <Container>
                <Administracion />
              </Container>
            }
          />

          {/* Ruta de Carrito página completa sin sidebar */}
          <Route
            path="/carrito"
            element={<CarritoPage />}
          />

          {/* Ruta de Inicio con sidebar de carrito */}
          <Route
            path="/"
            element={
              <>
                <Inicio />
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

          {/* Ruta de Detalle de Producto con sidebar de carrito */}
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

          {/* Ruta 404 */}
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;