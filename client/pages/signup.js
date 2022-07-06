import Head from "next/head";

import AppLayout from "../components/AppLayout";
import SignUp from "../components/SignUp/SignUp";

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>환영합니다! | 펫메이트</title>
      </Head>
      <AppLayout>
        <SignUp />
      </AppLayout>
    </>
  );
};

export default SignUpPage;
