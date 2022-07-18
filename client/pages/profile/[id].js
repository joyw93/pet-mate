import AppLayout from "../../components/AppLayout";
import CommunityPostDetail from "../../components/CommunityPostDetail/CommunityPostDetail";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadPostDetailRequestAction } from "../../reducers/community";

const PostPage = () => {
  // const router = useRouter();
  // const { id } = router.query;
  // const { singlePost } = useSelector((state) => state.community);
  // const [post, setPost] = useState(null);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadPostDetailRequestAction(id));
  // }, []);

  // useEffect(() => {
  //   setPost(singlePost);
  // }, []);

  // console.log("포스트으으으", singlePost);

  return (
    <AppLayout>
      <CommunityPostDetail />
    </AppLayout>
  );
};

export default PostPage;
