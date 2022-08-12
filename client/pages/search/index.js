import Head from "next/head";

import AppLayout from "../../components/AppLayout";
import SearchAll from "../../components/SearchResult/SearchAll";
const SearchAllPage = () => {
  return (
    <>
      <Head>
        <title>검색결과 | 펫메이트</title>
      </Head>
      <AppLayout>
        <SearchAll />
      </AppLayout>
    </>
  );
};

export default SearchAllPage;
