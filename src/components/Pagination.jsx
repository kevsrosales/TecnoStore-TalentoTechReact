import { Pagination as BsPagination } from 'react-bootstrap';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;

  .pagination {
    .page-item {
      .page-link {
        background-color: ${props => props.theme?.colors?.bgSecondary || '#282c3e'};
        border-color: rgba(139, 92, 246, 0.3);
        color: ${props => props.theme?.colors?.textPrimary || '#e5e7eb'};

        &:hover {
          background-color: ${props => props.theme?.colors?.accentPurple || '#8b5cf6'};
          border-color: ${props => props.theme?.colors?.accentPurple || '#8b5cf6'};
          color: white;
        }
      }

      &.active .page-link {
        background-color: ${props => props.theme?.colors?.accentPurple || '#8b5cf6'};
        border-color: ${props => props.theme?.colors?.accentPurple || '#8b5cf6'};
        color: white;
      }

      &.disabled .page-link {
        background-color: ${props => props.theme?.colors?.bgPrimary || '#1a1d29'};
        border-color: rgba(139, 92, 246, 0.2);
        color: ${props => props.theme?.colors?.textSecondary || '#9ca3af'};
      }
    }
  }
`;

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];

    // Generar números de página
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    // Si hay muchas páginas, mostrar solo algunas
    const getVisiblePages = () => {
        if (totalPages <= 7) return pages;

        if (currentPage <= 3) {
            return [...pages.slice(0, 5), '...', totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [1, '...', ...pages.slice(totalPages - 5)];
        }

        return [
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            totalPages
        ];
    };

    const visiblePages = getVisiblePages();

    return (
        <PaginationContainer>
            <BsPagination>
                <BsPagination.First
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                />
                <BsPagination.Prev
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />

                {visiblePages.map((page, index) => (
                    page === '...' ? (
                        <BsPagination.Ellipsis key={`ellipsis-${index}`} disabled />
                    ) : (
                        <BsPagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </BsPagination.Item>
                    )
                ))}

                <BsPagination.Next
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <BsPagination.Last
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                />
            </BsPagination>
        </PaginationContainer>
    );
}