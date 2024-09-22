import React from 'react'
import styled from 'styled-components'
import { Button } from '../components/UI/button'

const AboutWrapper = styled.section`
  min-height: 100vh;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #ffff00;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

export default function AboutSection() {
  return (
    <AboutWrapper>
      <ContentContainer>
        <Title>About 100 Days of Code</Title>
        <Paragraph>
          Welcome to my 100 Days of Code journey! This website is a digital canvas where I document my commitment to coding every day for 100 consecutive days. It&apos;s a challenge designed to improve my skills, build a coding habit, and share my progress with the world.
        </Paragraph>
        <Paragraph>
          Each day, I take on a new coding project or continue working on ongoing ones. These projects range from small scripts to more complex applications, covering various aspects of web development, algorithms, and software engineering.
        </Paragraph>
        <Paragraph>
          On this site, you&apos;ll find:
        </Paragraph>
        <ul>
          <li>Daily logs of my coding activities</li>
          <li>Showcase of projects I&apos;m working on</li>
          <li>Insights and lessons learned along the way</li>
          <li>Resources and tips for fellow coders</li>
        </ul>
        <Paragraph>
          Whether you&apos;re a fellow coder, a curious observer, or someone considering your own coding challenge, I hope my journey inspires and motivates you. Feel free to explore my projects, read about my daily experiences, and connect with me as I navigate this exciting 100-day adventure.
        </Paragraph>
        <ButtonContainer>
          <Button className="group mr-4 bg-yellow-500 hover:bg-yellow-600 text-black">
            View Projects
          </Button>
          <Button className="group bg-white hover:bg-gray-100 text-black">
            Read Daily Logs
          </Button>
        </ButtonContainer>
      </ContentContainer>
    </AboutWrapper>
  )
}

