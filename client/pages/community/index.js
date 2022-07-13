import Link from "next/link";
import { useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import Head from "next/head";

import CommunityMain from "../../components/CommunityMain/CommunityMain";

const Community = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title>커뮤니티 | 펫메이트</title>
      </Head>
      <AppLayout>
        {/* {me ? (
          <button>
            <Link href="/community/post">
              <a>게시글 쓰기</a>
            </Link>
          </button>
        ) : null} */}
        <CommunityMain />
      </AppLayout>
    </>
  );
};
export default Community;
