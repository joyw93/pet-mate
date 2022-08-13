import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityItem from "./CommunityItem";
import { ListContainer, BtnContainer, BtnLine, MoreBtn } from "./styled";
import { communityActions } from "../../store/reducers/community";

const CommunityList = ({ filterCond }) => {
  const morePostsRef = useRef(1);
  const dispatch = useDispatch();
  const { posts, loadPostsDone, loadMoreDone, morePosts } = useSelector(
    (state) => state.community
  );
  const [noMoreList, setNoMoreList] = useState(false);

  useEffect(() => {
    dispatch(communityActions.loadPostsRequest(filterCond));
    morePostsRef.current = 1;
  }, [filterCond]);

  useEffect(() => {
    dispatch(communityActions.loadPostDetailReset());
  }, []);

  useEffect(() => {
    //로딩 완료 되면 list업데이트
    if (loadPostsDone) {
      dispatch(communityActions.loadMoreReset());
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
  }, [filterCond]);

  const handleMorePosts = () => {
    const data = {
      orderBy: filterCond,
      offset: 10 * morePostsRef.current,
    };
    dispatch(communityActions.loadMoreRequest(data));
    morePostsRef.current++;
  };

  return (
    <>
      <ListContainer>
        {posts &&
          posts.map((item) => <CommunityItem key={item.id} {...item} />)}
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
            {posts && posts.length >= 10 ? (
              <MoreBtn onClick={handleMorePosts}>더보기</MoreBtn>
            ) : null}
          </BtnContainer>
        )}
      </ListContainer>
    </>
  );
};

export default CommunityList;
