import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/header';
import Footer from './components/footer';
import Carrito from './components/carrito';
import Inicio from './paginas/inicio';
import DetalleProducto from './paginas/DetalleProducto';
import Login from './paginas/Login';
import RutaProtegida from './components/rutaProtegida';
import CarritoPage from './paginas/carritoPage';
import NoEncontrado from './paginas/NoEncontrado';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id);

      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar productos del carrito
  const eliminarDelCarrito = (productoId) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== productoId));
  };

  // Función para modificar cantidad
  const modificarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === productoId
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  // Calcular cantidad total de items en el carrito
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

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

          {/* Ruta de Carrito página completa sin sidebar */}
          <Route
            path="/carrito"
            element={
              <CarritoPage
                items={carrito}
                onEliminar={eliminarDelCarrito}
                onModificarCantidad={modificarCantidad}
              />
            }
          />

          {/* Ruta de Inicio con sidebar de carrito */}
          <Route
            path="/"
            element={
              <>
                <Inicio
                  productos={productos}
                  loading={loading}
                  error={error}
                  onAgregarAlCarrito={agregarAlCarrito}
                />
                <Container className="my-5">
                  <Row className="justify-content-center">
                    <Col lg={8}>
                      <Carrito
                        items={carrito}
                        onEliminar={eliminarDelCarrito}
                        onModificarCantidad={modificarCantidad}
                      />
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
                    <RutaProtegida>
                      <DetalleProducto
                        onAgregarAlCarrito={agregarAlCarrito}
                      />
                    </RutaProtegida>
                  </Col>
                  <Col lg={4}>
                    <div className="sticky-top" style={{ top: '20px' }}>
                      <Carrito
                        items={carrito}
                        onEliminar={eliminarDelCarrito}
                        onModificarCantidad={modificarCantidad}
                      />
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