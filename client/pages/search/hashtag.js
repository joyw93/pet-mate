import Head from "next/head";

import AppLayout from "../../components/AppLayout";
import HashtagSearch from "../../components/SearchResult/HashtagSearch";
const HashtagSearchPage = () => {
  return (
    <>
      <Head>
        <title>해시태그 검색결과 | 펫메이트</title>
      </Head>
      <AppLayout>
        <HashtagSearch />
      </AppLayout>
    </>
  );
};

export default HashtagSearchPage;
