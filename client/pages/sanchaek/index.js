import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import SanchaekMain from "../../components/Sanchaek/SanchaekMain";

const SanchaekMate = () => {

  return (
    <>
      <Head>
        <title>산책메이트 | 펫메이트</title>
      </Head>
      <AppLayout>
        <SanchaekMain />
      </AppLayout>
    </>
  );
};


export default SanchaekMate;
