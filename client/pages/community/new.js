import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import CommunityPost from "../../components/CommunityPost/CommunityPost";

const PostPage = () => {
  return (
    <>
      <head>
        <title>커뮤니티 게시글 작성 | 펫메이트</title>
      </head>
      <AppLayout>
        <CommunityPost />
      </AppLayout>
    </>
  );
};
export default PostPage;
