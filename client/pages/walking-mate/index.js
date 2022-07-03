import Link from "next/link";
import AppLayout from "../../components/AppLayout";

const WalkingMate = () => {
  return (
    <>
      <AppLayout>
        <div>산책메이트 목록</div>
        <button>
          <Link href="/walking-mate/post">
            <a>게시글 쓰기</a>
          </Link>
        </button>
      </AppLayout>
    </>
  );
};

export default WalkingMate;
