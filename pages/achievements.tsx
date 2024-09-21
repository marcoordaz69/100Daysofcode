import React from 'react';
import Layout from '../components/Layout';
import AchievementsTracker from '../components/AchievementsTracker';

const achievements = [
  { id: 1, title: 'Completed 30 days of coding', date: '2023-05-01' },
  { id: 2, title: 'Built first React application', date: '2023-05-15' },
  { id: 3, title: 'Learned TypeScript', date: '2023-06-01' },
];

const AchievementsPage: React.FC = () => {
  return (
    <Layout title="Achievements">
      <h1>My Achievements</h1>
      <AchievementsTracker achievements={achievements} />
    </Layout>
  );
};

export default AchievementsPage;