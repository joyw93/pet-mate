import AppLayout from "../../components/AppLayout";
import CommunityPostDetail from "../../components/CommunityPostDetail/CommunityPostDetail";
import { useRouter } from "next/router";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <AppLayout>
      <CommunityPostDetail />
    </AppLayout>
  );
};

export default PostPage;
