import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '@/data/projects.json';
import { Button } from '@/components/UI/button';
import HiddenUpload from '@/components/HiddenUpload';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProjectContainer = styled.div`
  width: 90%;
  max-width: 600px;
  height: 70vh;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`;

const CardContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProjectTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1rem;
  text-align: center;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const TechList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const TechItem = styled.li`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const NavigationButtons = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  xTweetId?: string;
  day: number;
  technologies?: string[];
  link?: string;
};

const ProjectDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const project = projectsData.find(p => p.id.toString() === id) as Project | undefined;
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!project) {
    return <div>Project not found</div>;
  }

  const slides = [
    { type: 'image', content: project.image },
    { type: 'description', content: project.description },
    { type: 'technologies', content: project.technologies },
    { type: 'category', content: project.category },
    { type: 'day', content: project.day },
  ].filter(slide => slide.content);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <PageWrapper>
      <ProjectContainer>
        <AnimatePresence mode="wait">
          <CardContent
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
          >
            {slides[currentSlide].type === 'image' ? (
              <ProjectImage src={slides[currentSlide].content as string} alt={project.title} />
            ) : (
              <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <ProjectTitle>{project.title}</ProjectTitle>
                {slides[currentSlide].type === 'technologies' ? (
                  <TechList>
                    {(slides[currentSlide].content as string[])?.map((tech, index) => (
                      <TechItem key={index}>{tech}</TechItem>
                    ))}
                  </TechList>
                ) : slides[currentSlide].type === 'day' ? (
                  <p>Day {slides[currentSlide].content} of 100 Days of Code</p>
                ) : (
                  <p>{slides[currentSlide].content as string}</p>
                )}
              </div>
            )}
          </CardContent>
        </AnimatePresence>
        <NavigationButtons>
          <Button onClick={prevSlide}>Previous</Button>
          <Button onClick={nextSlide}>Next</Button>
        </NavigationButtons>
      </ProjectContainer>
      <Button as={Link} href="/projects" style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 100 }}>
        Back to Projects
      </Button>
      <HiddenUpload projectId={project.id} />
    </PageWrapper>
  );
};

export default ProjectDetailPage;