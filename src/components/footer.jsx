import { Container } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="footer-bottom mt-auto py-4">
            <Container>
                <div className="text-center">
                    <p className="mb-0" style={{ color: '#9ca3af' }}>
                        © 2024 TechStore - Tu tienda de tecnología
                    </p>
                </div>
            </Container>
        </footer>
    );
}