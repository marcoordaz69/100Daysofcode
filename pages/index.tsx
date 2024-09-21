"use client"
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Button } from '../components/UI/button'
import Achievements from '../components/Achievements'  // Add this import

const StyledCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: relative;
  z-index: 10;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  margin-left: 1rem;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
`;

const Footer = styled.footer`
  padding: 1rem;
  text-align: center;
  position: relative;
  z-index: 10;
`;

const StyledButton = styled(Button)`
  border-radius: 8px; // Less round, but still slightly rounded
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  padding: 10px 20px; // Add some padding for better appearance

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.1);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const YellowButton = styled(StyledButton)`
  background-color: ${props => props.theme.colors.accent};
  color: black;
  font-weight: bold;

  &:hover {
    background-color: #e6e600; // Slightly darker yellow for hover effect
  }
`;

const WhiteButton = styled(StyledButton)`
  background-color: white;
  color: black;
  font-weight: bold;

  &:hover {
    background-color: #f0f0f0; // Slightly darker white for hover effect
  }
`;

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const fontSize = 10
    const columns = canvas.width / fontSize
    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }
    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#ffff00'
      ctx.font = fontSize + 'px monospace'
      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.floor(Math.random() * 128))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }
    const interval = setInterval(draw, 33)
    return () => clearInterval(interval)
  }, [])

  return (
    <PageWrapper>
      <StyledCanvas ref={canvasRef} />
      
      <Nav>
        <NavLink href="/" className="text-2xl font-bold">
          100 Days of Code
        </NavLink>
        <div>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
      </Nav>

      <MainContent>
        <div>
          <h1 className="text-7xl font-bold mb-4">
            <span style={{ color: '#ffff00' }}>100 DAYS</span><br />
            <span>OF CODE</span>
          </h1>
          <p className="text-2xl mb-8">Little Projects, Big Dreams</p>
          <div className="space-x-4">
            <YellowButton>
              LES&apos;GO
            </YellowButton>
            <WhiteButton>
              ENTER
            </WhiteButton>
          </div>
        </div>
      </MainContent>

      <Footer>
        <p>© 2023 100 Days of Code. All rights reserved.</p>
      </Footer>

      <Achievements />
    </PageWrapper>
  )
}