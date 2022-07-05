import Link from "next/link";
import AppLayout from "../../components/AppLayout";
import SanchaekMain from "../../components/Sanchaek/SanchaekMain";

const WalkingMate = () => {
  return (
    <>
      <AppLayout>
        <button>
          <Link href="/sanchaek/post">
            <a>게시글 쓰기</a>
          </Link>
        </button>
        <SanchaekMain />
      </AppLayout>
    </>
  );
};

export default WalkingMate;
