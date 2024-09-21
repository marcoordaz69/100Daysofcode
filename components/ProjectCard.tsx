// components/ProjectCard.tsx
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const ProjectTitle = styled.h2`
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const ProjectLink = styled.a`
  display: inline-block;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
  category: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card>
      <Image src={project.image} alt={project.title} width={300} height={200} objectFit="cover" />
      <CardContent>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
          View Project
        </ProjectLink>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;