import React from 'react';
import styled from 'styled-components';

const AchievementsContainer = styled.div`
  position: fixed;
  bottom: 96px; // Approximately 1 inch from the bottom
  left: 0;
  width: 100vw;
  z-index: 20;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  position: relative;
`;

const StepMarkers = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StepMarker = styled.div<{ completed: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${props => props.completed ? props.theme.colors.accent : 'rgba(255, 255, 255, 0.2)'}; 
  transition: background-color 0.3s ease-in-out;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: ${props => props.theme.colors.accent};
  font-family: 'Courier New', monospace;
  font-size: 14px;
  text-shadow: 0 0 5px ${props => props.theme.colors.accent};
  letter-spacing: 1px;
`;

const Achievements: React.FC = () => {
  const currentDay = 5;
  const totalDays = 100;
  const progress = (currentDay / totalDays) * 100;

  return (
    <AchievementsContainer>
      <ProgressBarContainer>
        <StepMarkers>
          {Array.from({ length: totalDays }, (_, i) => (
            <StepMarker key={i} completed={i < currentDay} />
          ))}
        </StepMarkers>
      </ProgressBarContainer>
      <StatsContainer>
        Day {currentDay} out of {totalDays} complete - Progress: {progress.toFixed(2)}%
      </StatsContainer>
    </AchievementsContainer>
  );
};

export default Achievements;