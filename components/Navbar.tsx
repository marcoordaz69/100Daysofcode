import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.primary};
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  margin-left: 1rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar: React.FC = () => {
  return (
    <Nav>
      <Link href="/" passHref legacyBehavior>
        <NavLink>Home</NavLink>
      </Link>
      <div>
        <Link href="/projects" passHref legacyBehavior>
          <NavLink>Projects</NavLink>
        </Link>
        <Link href="/about" passHref legacyBehavior>
          <NavLink>About</NavLink>
        </Link>
        <Link href="/contact" passHref legacyBehavior>
          <NavLink>Contact</NavLink>
        </Link>
      </div>
    </Nav>
  );
};

export default Navbar;