import Head from 'next/head';
import { useEffect } from "react";
import { useState } from "react";
import AppLayout from "../../../components/AppLayout";
import CommunityPost from "../../../components/CommunityPost/CommunityPost";

const EditPage = () => {
  const [editState, setEditState] = useState(false);
  useEffect(() => {
    setEditState(true);
  }, []);
  return (
    <>
      <Head>
        <title>커뮤니티 게시글 수정 중 | 펫메이트</title>
      </Head>
      <AppLayout>
        <CommunityPost editState={editState} />
      </AppLayout>
    </>
  );
};

export default EditPage;
