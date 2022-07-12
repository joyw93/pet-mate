import Head from "next/head";

import AppLayout from "../components/AppLayout";
import SearchResult from "../components/SearchResult/SearchResult";
const SearchPage = () => {
  return (
    <>
      <Head>
        <title>검색결과 | 펫메이트</title>
      </Head>
      <AppLayout>
        <SearchResult />
      </AppLayout>
    </>
  );
};

export default SearchPage;
