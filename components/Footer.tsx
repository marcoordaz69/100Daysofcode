import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 1rem;
  text-align: center;
  background: ${props => props.theme.colors.primary};
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.text};
`;

interface FooterProps {
  authorName?: string;
}

const Footer: React.FC<FooterProps> = ({ authorName = 'Your Name' }) => {
  return (
    <FooterContainer>
      <FooterText>&copy; {new Date().getFullYear()} {authorName}. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
