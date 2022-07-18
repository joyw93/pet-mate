import AppLayout from "../../components/AppLayout";
import CommunityPostDetail from "../../components/CommunityPostDetail/CommunityPostDetail";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadPostDetailRequestAction } from "../../reducers/community";

const PostPage = () => {
  return (
    <AppLayout>
      <CommunityPostDetail />
    </AppLayout>
  );
};

export default PostPage;
