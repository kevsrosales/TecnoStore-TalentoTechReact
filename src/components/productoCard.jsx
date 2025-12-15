import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import styled from 'styled-components';
import { useCarrito } from '../context/CarritoContext';

const StyledCard = styled(Card)`
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(139, 92, 246, 0.2) !important;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
    border-color: #8b5cf6 !important;
  }
`;

const CategoryBadge = styled.span`
  background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Price = styled.div`
  color: #8b5cf6;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

export default function ProductoCard({ producto }) {
    const { agregarAlCarrito } = useCarrito();

    return (
        <StyledCard className="h-100">
            <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img
                    variant="top"
                    src={producto.imagen}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
            </Link>
            <Card.Body className="d-flex flex-column">
                <CategoryBadge>{producto.categoria}</CategoryBadge>
                <Card.Title className="mt-2">{producto.nombre}</Card.Title>
                <Price>${producto.precio}</Price>
                <ActionButtons>
                    <Button
                        variant="primary"
                        className="flex-grow-1"
                        onClick={() => agregarAlCarrito(producto)}
                    >
                        <FiShoppingCart className="me-2" />
                        Agregar
                    </Button>
                    <Button
                        as={Link}
                        to={`/producto/${producto.id}`}
                        variant="outline-light"
                        style={{ borderColor: '#8b5cf6', color: '#8b5cf6' }}
                    >
                        <FiEye />
                    </Button>
                </ActionButtons>
            </Card.Body>
        </StyledCard>
    );
}