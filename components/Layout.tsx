import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Main = styled.main`
  min-height: calc(100vh - 60px); // Adjust this value based on your navbar and footer height
  padding: 2rem 0;
`;

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'My Portfolio' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <Container>
        <Main>{children}</Main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
