import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

const Header: React.FC = () => {
  return (
    <Nav>
      <Link href="/">Home</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/blog">Blog</Link>
    </Nav>
  );
};

export default Header;
