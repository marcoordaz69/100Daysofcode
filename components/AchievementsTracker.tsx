import React from 'react';
import styled from 'styled-components';

const AchievementContainer = styled.div`
  margin-top: 2rem;
`;

const AchievementItem = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
`;

interface Achievement {
  id: number;
  title: string;
  date: string;
}

interface AchievementsTrackerProps {
  achievements: Achievement[];
}

const AchievementsTracker: React.FC<AchievementsTrackerProps> = ({ achievements }) => {
  return (
    <AchievementContainer>
      <h2>Achievements</h2>
      {achievements.map((achievement) => (
        <AchievementItem key={achievement.id}>
          <strong>{achievement.title}</strong> - {achievement.date}
        </AchievementItem>
      ))}
    </AchievementContainer>
  );
};

export default AchievementsTracker;