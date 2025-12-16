import { useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import ProductoCard from '../components/productoCard';
import Banner from '../components/banner';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { useProductos } from '../context/ProductosContext';

const ITEMS_PER_PAGE = 8;

export default function Inicio() {
    const { productos, loading, error } = useProductos();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Filtrar productos por búsqueda
    const filteredProductos = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcular paginación
    const totalPages = Math.ceil(filteredProductos.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProductos = filteredProductos.slice(startIndex, endIndex);

    // Resetear a página 1 cuando se busca
    const handleSearchChange = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p className="mt-3">Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="my-4">
                <Alert.Heading>Error</Alert.Heading>
                <p>{error}</p>
            </Alert>
        );
    }

    return (
        <>
            <Helmet>
                <title>TechStore - Tu tienda de tecnología</title>
                <meta name="description" content="Descubre los mejores productos tecnológicos: laptops, accesorios y más. Precios competitivos y envío rápido." />
            </Helmet>

            <Banner />

            <Container className="my-5" id="productos">
                <h2 className="mb-4 text-center">Productos Disponibles</h2>

                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    placeholder="Buscar por nombre o categoría..."
                />

                {filteredProductos.length === 0 ? (
                    <Alert variant="info" className="text-center">
                        No se encontraron productos que coincidan con "{searchTerm}"
                    </Alert>
                ) : (
                    <>
                        <div className="text-center mb-3 text-muted">
                            Mostrando {currentProductos.length} de {filteredProductos.length} productos
                        </div>

                        <Row xs={1} md={2} lg={4} className="g-4">
                            {currentProductos.map(producto => (
                                <Col key={producto.id}>
                                    <ProductoCard producto={producto} />
                                </Col>
                            ))}
                        </Row>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </>
                )}
            </Container>
        </>
    );
}