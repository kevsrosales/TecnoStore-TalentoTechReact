import { Form, InputGroup } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const StyledInputGroup = styled(InputGroup)`
  max-width: 500px;
  margin: 0 auto;

  .form-control {
    background-color: ${props => props.theme?.colors?.bgSecondary || '#282c3e'};
    border-color: rgba(139, 92, 246, 0.3);
    color: ${props => props.theme?.colors?.textPrimary || '#e5e7eb'};
    padding: 0.75rem 1rem;
    font-size: 1rem;

    &:focus {
      background-color: ${props => props.theme?.colors?.bgSecondary || '#282c3e'};
      border-color: ${props => props.theme?.colors?.accentPurple || '#8b5cf6'};
      color: ${props => props.theme?.colors?.textPrimary || '#e5e7eb'};
      box-shadow: 0 0 0 0.2rem rgba(139, 92, 246, 0.25);
    }
  }

  .input-group-text {
    background-color: ${props => props.theme?.colors?.accentPurple || '#8b5cf6'};
    border-color: ${props => props.theme?.colors?.accentPurple || '#8b5cf6'};
    color: white;
  }
`;

export default function SearchBar({ searchTerm, onSearchChange, placeholder = "Buscar productos..." }) {
    return (
        <SearchContainer>
            <StyledInputGroup>
                <InputGroup.Text>
                    <FiSearch />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </StyledInputGroup>
        </SearchContainer>
    );
}