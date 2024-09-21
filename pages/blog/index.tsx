import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { getSortedPostsData } from '../../utils/posts';
import styled from 'styled-components';

const PostList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PostItem = styled.li`
  margin-bottom: 1rem;
`;

interface BlogPageProps {
  allPostsData: {
    id: string;
    date: string;
    title: string;
  }[];
}

const BlogPage: React.FC<BlogPageProps> = ({ allPostsData }) => {
  return (
    <Layout title="Daily Log">
      <h1>Daily Log</h1>
      <PostList>
        {allPostsData.map(({ id, date, title }) => (
          <PostItem key={id}>
            <Link href={`/blog/${id}`}>
              {title}
            </Link>
            <br />
            <small>{date}</small>
          </PostItem>
        ))}
      </PostList>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return { props: { allPostsData } };
};

export default BlogPage;
