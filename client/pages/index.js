import axios from "axios";
import AppLayout from "../components/AppLayout";
import Banner from "../components/Main/Banner/Banner";
import Carousels from "../components/Main/Carousels/Carousels";
import PostCards from "../components/Main/PostCards/PostCards";

const Home = ({ hotSanchaekPosts, hotCommunityPosts }) => {
  return (
    <AppLayout>
      <Carousels />
      <Banner />
      <PostCards
        hotCommunity={hotCommunityPosts}
        hotSanchaek={hotSanchaekPosts}
      />
    </AppLayout>
  );
};

export const getServerSideProps = async () => {
  const sanchaekResult = await axios(
    "http://api.petmate.kr/sanchaek/hot-sanchaek-posts"
  );
  const communityresult = await axios(
    "http://api.petmate.kr/community/hot-posts"
  );
  const hotSanchaekPosts = await sanchaekResult.data.data;
  const hotCommunityPosts = await communityresult.data.data;

  return { props: { hotSanchaekPosts, hotCommunityPosts } };
};

export default Home;
