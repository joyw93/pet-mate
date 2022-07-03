import Link from "next/link";
import AppLayout from "../../components/AppLayout";

const Community = () => {
  return (
    <>
      <AppLayout>
        <div>커뮤니티 목록</div>
        <button>
          <Link href="/community/post">
            <a>게시글 쓰기</a>
          </Link>
        </button>
      </AppLayout>
    </>
  );
};
export default Community;
