import styled from 'styled-components';

interface ThemeProps {
  theme: {
    colors: {
      background: string;
      accent: string;
      text: string;
    };
  };
}

export const Card = styled.div<ThemeProps>`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.accent};
  border-radius: 8px;
  padding: 1rem;
`;

export const CardHeader = styled.div`
  margin-bottom: 0.5rem;
`;

export const CardTitle = styled.h3<ThemeProps>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.accent};
`;

export const CardContent = styled.div`
  margin-bottom: 0.5rem;
`;

export const CardDescription = styled.p<ThemeProps>`
  color: ${(props) => props.theme.colors.text};
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;
