import Head from 'next/head';
import AppLayout from "../../../components/AppLayout";
import SanchaekPostDetail from "../../../components/SanchaekPostDetail/SanchaekPostDetail";

const PostPage = () => {
  return (
    <>
      <Head>
        <title>산책메이트 | 펫메이트</title>
      </Head>
      <AppLayout>
        <SanchaekPostDetail />
      </AppLayout>
    </>
  );
};

export default PostPage;
