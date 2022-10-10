import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import CommunityPost from "../../components/CommunityPost/CommunityPost";

const PostPage = () => {
  return (
    <>
      <Head>
        <title>커뮤니티 게시글 작성 | 펫메이트</title>
      </Head>
      <AppLayout>
        <CommunityPost />
      </AppLayout>
    </>
  );
};
export default PostPage;
