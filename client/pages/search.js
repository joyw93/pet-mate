import Head from "next/head";

import AppLayout from "../components/AppLayout";
const SearchPage = () => {
  return (
    <>
      <Head>
        <title>검색결과 | 펫메이트</title>
      </Head>
      <AppLayout>
        <div>검색결과 페이지</div>
      </AppLayout>
    </>
  );
};

export default SearchPage;
