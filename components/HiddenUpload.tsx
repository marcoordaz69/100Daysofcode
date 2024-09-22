import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

interface HiddenUploadContainerProps {
  $isVisible: boolean;
}

const HiddenUploadContainer = styled.div<HiddenUploadContainerProps>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  display: ${props => props.$isVisible ? 'block' : 'none'};
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface HiddenUploadProps {
  projectId: number;
}

const HiddenUpload: React.FC<HiddenUploadProps> = ({ projectId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId.toString());
    formData.append('password', password);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message || 'Image uploaded successfully!');
        setIsVisible(false);
        // Optionally, you can reload the page or update the project image here
        window.location.reload();
      } else {
        alert(data.error || 'Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)} style={{ position: 'fixed', bottom: '10px', right: '10px', opacity: 0.2 }}>
        •••
      </button>
      <HiddenUploadContainer $isVisible={isVisible}>
        <UploadForm onSubmit={handleUpload}>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <input 
            type="file" 
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setFile(files[0]);
              }
            }}
          />
          <button type="submit">Upload</button>
        </UploadForm>
      </HiddenUploadContainer>
    </>
  );
};

export default HiddenUpload;