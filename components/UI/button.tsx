import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.background};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.accentHover};
  }
`;