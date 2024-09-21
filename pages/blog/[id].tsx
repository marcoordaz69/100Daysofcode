import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../utils/posts';
import styled from 'styled-components';

const PostContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

interface PostPageProps {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}

const PostPage: React.FC<PostPageProps> = ({ postData }) => {
  return (
    <Layout title={postData.title}>
      <PostContent>
        <h1>{postData.title}</h1>
        <p>{postData.date}</p>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </PostContent>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id || typeof params.id !== 'string') {
    return { notFound: true };
  }
  const postData = await getPostData(params.id);
  return { props: { postData } };
};

export default PostPage;