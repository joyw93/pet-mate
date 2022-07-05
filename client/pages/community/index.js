import Link from "next/link";
import { useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import CommunityMain from "../../components/CommunityMain/CommunityMain";

const Community = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <AppLayout>
        {me ? (
          <button>
            <Link href="/community/post">
              <a>게시글 쓰기</a>
            </Link>
          </button>
        ) : null}
        <CommunityMain />
      </AppLayout>
    </>
  );
};
export default Community;
