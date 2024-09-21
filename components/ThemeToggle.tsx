import React from 'react';
import styled from 'styled-components';

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
`;

interface ThemeToggleProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <ToggleButton onClick={toggleTheme}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </ToggleButton>
  );
};

export default ThemeToggle;