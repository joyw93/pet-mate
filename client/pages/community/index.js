import AppLayout from "../../components/AppLayout";
import Head from "next/head";
import CommunityMain from "../../components/CommunityMain/CommunityMain";
import wrapper from '../../store/configureStore';
import { communityActions } from '../../store/reducers/community';

const Community = ({ hotPosts }) => {
  return (
    <>
      <Head>
        <title>커뮤니티 | 펫메이트</title>
      </Head>
      <AppLayout>
        <CommunityMain hotPosts={hotPosts} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps =
  wrapper.getServerSideProps(
    (store) =>
      async () => {
        const result = await fetch("http://api.petmate.kr/community/hot-posts");
        const hotPosts = await result.json();

        return { props: { hotPosts } };
      });

export default Community;
