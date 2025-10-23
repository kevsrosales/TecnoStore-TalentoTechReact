import { Container, Button } from 'react-bootstrap';

export default function Banner() {
    return (
        <div className="hero-banner-full">
            <div className="hero-overlay"></div>
            <Container className="hero-content text-center py-5">
                <h1 className="display-3 fw-bold mb-3">
                    Domina la tecnología con <span className="text-gradient">TechStore</span>
                </h1>
                <p className="lead mb-4">
                    Desde potentes laptops hasta accesorios premium, descubre productos
                    diseñados para precisión, productividad y pasión por la tecnología.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Button
                        variant="primary"
                        size="lg"
                        href="#productos"
                    >
                        Ver Productos Destacados
                    </Button>
                    <Button
                        variant="outline-light"
                        size="lg"
                        className="btn-outline-purple"
                    >
                        Explorar Catálogo
                    </Button>
                </div>
                <p className="mt-4 text-muted">
                    <small>Mostrando los productos más vendidos</small>
                </p>
            </Container>
        </div>
    );
}