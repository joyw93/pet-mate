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

// export const getServerSideProps = async () => {
//   // Fetch data from external API
//   const result = await fetch("http://api.petmate.kr/community");
//   const data = await result.json();

//   console.log(data);
//   // Pass data to the page via props
//   return { props: { data } };
// };

export default Community;
