import { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityItem from "./CommunityItem";
<<<<<<< HEAD
import { ListContainer, BtnContainer } from "./styled";
import { loadMorePostsAction, loadPostsRequestAction, loadPostDetailResetAction } from "../../reducers/community";
=======
import { ListContainer, BtnContainer, BtnLine, MoreBtn } from "./styled";
import {
  loadMorePostsAction,
  loadPostsRequestAction,
  loadPostDetailResetAction,
  loadMoreResetAction,
} from "../../reducers/community";
>>>>>>> 7c12712fd77160f03939349293f377d848e79c57

const CommunityList = (filterCond) => {
  const morePostsRef = useRef(1);
  const dispatch = useDispatch();
  const { posts, loadPostsDone, loadMoreDone, morePosts } = useSelector(
    (state) => state.community
  );
  const [list, setList] = useState([]);
  const [noMoreList, setNoMoreList] = useState(false);

  useEffect(() => {
    dispatch(loadPostsRequestAction(filterCond.filterCond));
    morePostsRef.current = 1;
  }, [filterCond.filterCond]);

  useEffect(() => {
    dispatch(loadPostDetailResetAction());
  }, []);

  useEffect(() => {
    //로딩 완료 되면 list업데이트
    if (loadPostsDone) {
      setList(posts);
      dispatch(loadMoreResetAction());
    }
    //더보기 눌렀을 때
    if (loadMoreDone && morePostsRef.current !== 1 && morePosts.length === 0) {
      console.log(morePosts.length);
      //이전 리스트 길이랑 새 리스트 길이가 같으면 더이상 게시글 없다! 알려줌
      setNoMoreList(true);
    }
  }, [posts]);

  useEffect(() => {
    setNoMoreList(false);
  }, [filterCond.filterCond]);

  const handleMorePosts = () => {
    const data = {
      orderBy: filterCond.filterCond,
      offset: 10 * morePostsRef.current,
    };
    dispatch(loadMorePostsAction(data));
    morePostsRef.current++;
  };

  return (
    <>
      <ListContainer>
<<<<<<< HEAD
        {list && list.map((item) => <CommunityItem key={item.id} {...item} />)}
        <BtnContainer>
          <span></span>
          {posts.length >= 10 ? <button onClick={handleMorePosts}>더보기</button> : null}
        </BtnContainer>
=======
        {posts && posts.map((item) => <CommunityItem key={item.id} {...item} />)}
        {noMoreList ? (
          <BtnContainer>
            <div>
              <p>
                더이상 게시글이 없습니다.
                <span>😢</span>
              </p>
            </div>
          </BtnContainer>
        ) : (
          <BtnContainer>
            <BtnLine></BtnLine>
            {posts.length >= 10 ? (
              <MoreBtn onClick={handleMorePosts}>더보기</MoreBtn>
            ) : null}
          </BtnContainer>
        )}
>>>>>>> 7c12712fd77160f03939349293f377d848e79c57
      </ListContainer>
    </>
  );
};

export default CommunityList;
