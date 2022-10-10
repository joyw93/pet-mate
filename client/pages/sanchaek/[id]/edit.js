import Head from 'next/head';
import { useEffect } from "react";
import { useState } from "react";
import AppLayout from "../../../components/AppLayout";
import SanchaekPost from "../../../components/SanchaekPost/SanchaekPost";

const SanchaekEditPage = () => {
  const [editState, setEditState] = useState(false);
  useEffect(() => {
    setEditState(true);
  }, []);
  return (
    <>
      <Head>
        <title>산책메이트 게시글 수정 중 | 펫메이트</title>
      </Head>
      <AppLayout>
        <SanchaekPost editState={editState} />
      </AppLayout>
    </>
  );
};

export default SanchaekEditPage;
