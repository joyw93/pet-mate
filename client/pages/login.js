import Head from "next/head";

import AppLayout from "../components/AppLayout";
import LogIn from "../components/LogIn/LogIn";

const LogInPage = () => {
  return (
    <>
      <Head>
        <title>로그인 | 펫메이트</title>
      </Head>
      <AppLayout>
        <LogIn />
      </AppLayout>
    </>
  );
};

export default LogInPage;
