import AppLayout from "../components/AppLayout";
import Banner from "../components/Main/Banner/Banner";
import Carousels from "../components/Main/Carousels/Carousels";
import PostCards from "../components/Main/PostCards/PostCards";

const Community = () => {
  return (
    <AppLayout>
      <Carousels />
      <Banner />
      <PostCards />
    </AppLayout>
  );
};

export default Community;
