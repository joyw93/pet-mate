import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import SanchaekPost from "../../components/SanchaekPost/SanchaekPost";

const PostPage = () => {
  return (
    <>
      <Head>
        <title>산책메이트 게시글 작성 | 펫메이트</title>
      </Head>
      <AppLayout>
        <SanchaekPost />
      </AppLayout>
    </>
  );
};
export default PostPage;
