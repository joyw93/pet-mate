import Link from "next/link";
import { useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";

const Community = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <>
      <AppLayout>
        <div>커뮤니티 목록</div>
        {me ? (
          <button>
            <Link href="/community/post">
              <a>게시글 쓰기</a>
            </Link>
          </button>
        ) : null}
      </AppLayout>
    </>
  );
};
export default Community;
