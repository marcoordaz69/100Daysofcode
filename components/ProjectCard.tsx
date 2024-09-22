import React, { useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '@/components/UI/button';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 800px; // Increased height for all cards
`;

const MediaContainer = styled.div`
  width: 100%;
  height: 600px; // Increased height for media content
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const XTweetContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  .twitter-tweet {
    margin: 0 !important;
  }
`;

const Content = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ViewDetailsButton = styled(Button)`
  background-color: transparent;
  border: 3px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accent};
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.3rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
  }
`;

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  link?: string;
  image: string;
  xTweetId?: string;
  day: number;
  technologies?: string[];
};

const ProjectCard = ({ project }: { project: Project }) => {
  useEffect(() => {
    if (project.xTweetId) {
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [project.xTweetId]);

  return (
    <Card>
      <MediaContainer>
        {project.xTweetId ? (
          <XTweetContainer>
            <blockquote className="twitter-tweet" data-theme="dark" data-conversation="none">
              <a href={`https://twitter.com/x/status/${project.xTweetId}`}>
                Loading X Post...
              </a>
            </blockquote>
          </XTweetContainer>
        ) : (
          <ProjectImage src={project.image} alt={project.title} />
        )}
      </MediaContainer>
      <Content>
        <Title>{project.title}</Title>
        <ViewDetailsButton as={Link} href={`/projects/${project.id}`}>
          View Details
        </ViewDetailsButton>
      </Content>
    </Card>
  );
};

export default ProjectCard;