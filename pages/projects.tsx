"use client"

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import ProjectCard from '@/components/ProjectCard'
import projectsData from '@/data/projects.json'
import { motion, AnimatePresence } from 'framer-motion'

const ProjectsContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: relative;
  z-index: 10;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem;
  position: relative;
  z-index: 10;
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  align-items: start;
`;

const Footer = styled.footer`
  padding: 1rem;
  text-align: center;
  position: relative;
  z-index: 10;
`;

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  link?: string;
  image: string;
  xTweetId?: string;
  day?: number;  // Make day optional
  technologies?: string[];
};

export default function ProjectsPage() {
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
      if (!ctx || !canvas) return

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
    <ProjectsContainer>
      <StyledCanvas ref={canvasRef} />
      
      <Navigation>
        <NavLink href="/" className="text-2xl font-bold">
          100 Days of Code
        </NavLink>
        <div className="flex space-x-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
      </Navigation>

      <MainContent>
        <AnimatePresence>
          <ProjectGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {projectsData.map((project: Project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard project={{
                  ...project,
                  day: project.day || 0 // Ensure day is always a number
                }} />
              </motion.div>
            ))}
          </ProjectGrid>
        </AnimatePresence>
      </MainContent>

      <Footer>
        <p>© 2024 Your Name. All rights reserved.</p>
      </Footer>
    </ProjectsContainer>
  )
}