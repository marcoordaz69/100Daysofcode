import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from '../components/UI/button'

const ContactWrapper = styled.section`
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
  max-width: 600px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ffff00;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ffff00;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 4px;
  min-height: 150px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  color: #ffff00;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your server or a service like Formspree
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <ContactWrapper>
      <ContentContainer>
        <Title>Get in Touch</Title>
        <Paragraph>
          Have questions about my 100 Days of Code journey? Want to collaborate on a project? 
          Or just want to say hi? Feel free to reach out!
        </Paragraph>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextArea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="group">
            Send Message
          </Button>
        </Form>
        <SocialLinks>
          <SocialLink href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            GitHub
          </SocialLink>
          <SocialLink href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </SocialLink>
          <SocialLink href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
            Twitter
          </SocialLink>
        </SocialLinks>
      </ContentContainer>
    </ContactWrapper>
  )
}