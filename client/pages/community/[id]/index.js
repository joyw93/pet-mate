import Head from 'next/head';
import AppLayout from "../../../components/AppLayout";
import CommunityPostDetail from "../../../components/CommunityPostDetail/CommunityPostDetail";

const PostPage = () => {
  return (
    <>
      <Head>
        <title>커뮤니티 | 펫메이트</title>
      </Head>
      <AppLayout>
        <CommunityPostDetail />
      </AppLayout>
    </>
  );
};

export default PostPage;
