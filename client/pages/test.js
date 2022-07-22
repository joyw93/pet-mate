import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Test = () => {
  return (
    <>
      <Head>
        <title>환영합니다! | 펫메이트</title>
      </Head>
      <AppLayout>
        <input type="password" name="" id="" autoComplete="new-password" />
      </AppLayout>
    </>
  );
};

export default Test;
