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
  min-height: 600px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 1rem;
  text-align: center;
  font-weight: 300;
`;

const MediaContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 1rem; // Added margin-bottom
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto; // Changed from 100% to auto
  object-fit: contain; // Changed from cover to contain
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
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

const ViewDetailsButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accent};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
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
      <Title>{project.title}</Title>
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
        <ViewDetailsButton as={Link} href={`/projects/${project.id}`}>
          View Details
        </ViewDetailsButton>
      </Content>
    </Card>
  );
};

export default ProjectCard;