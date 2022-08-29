import Head from "next/head";

import AppLayout from "../../components/AppLayout";
import CommunitySearch from "../../components/SearchResult/CommunitySearch";
const CommunitySearchPage = () => {
  return (
    <>
      <Head>
        <title>커뮤니티 검색결과 | 펫메이트</title>
      </Head>
      <AppLayout>
        <CommunitySearch />
      </AppLayout>
    </>
  );
};

export default CommunitySearchPage;
