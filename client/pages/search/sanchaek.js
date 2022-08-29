import Head from "next/head";

import AppLayout from "../../components/AppLayout";
import SanchaekSearch from "../../components/SearchResult/SanchaekSearch";
const SanchaekSearchPage = () => {
  return (
    <>
      <Head>
        <title>산책메이트 검색결과 | 펫메이트</title>
      </Head>
      <AppLayout>
        <SanchaekSearch />
      </AppLayout>
    </>
  );
};

export default SanchaekSearchPage;
