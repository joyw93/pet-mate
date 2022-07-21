import Link from "next/link";
import { useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import Head from "next/head";

import CommunityMain from "../../components/CommunityMain/CommunityMain";
import { useEffect } from "react";

const Community = ({ hotdata }) => {

  return (
    <>
      <Head>
        <title>커뮤니티 | 펫메이트</title>
      </Head>
      <AppLayout>
        <CommunityMain hotdata={hotdata} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = async () => {
  // Fetch data from external API
  const result = await fetch("http://api.petmate.kr/community/hot-posts");
  const hotdata = await result.json();
  console.log(hotdata);
  // Pass data to the page via props
  return { props: { hotdata } };
};

export default Community;
