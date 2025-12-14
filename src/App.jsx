import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Carrito from './components/Carrito';
import Inicio from './paginas/Inicio';
import DetalleProducto from './paginas/DetalleProducto';
import Login from './paginas/Login';
import CarritoPage from './paginas/CarritoPage';
import Administracion from './paginas/Administracion';
import NoEncontrado from './paginas/NoEncontrado';
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