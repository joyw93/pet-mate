import { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityItem from "./CommunityItem";
import { ListContainer, BtnContainer, BtnLine, MoreBtn } from "./styled";
import {
  loadMorePostsAction,
  loadPostsRequestAction,
} from "../../reducers/community";

const CommunityList = (filterCond) => {
  const morePostsRef = useRef(1);
  const { posts, loadPostsDone, loadMoreDone } = useSelector(
    (state) => state.community
  );
  useEffect(() => {
    //setFilterCond("new");
    dispatch(loadPostsRequestAction(filterCond.filterCond));
  }, [filterCond.filterCond]);

  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const [noMoreList, setNoMoreList] = useState(false);

  useEffect(() => {
    console.log(posts);
    if (loadPostsDone) {
      setList(posts);
    }
    if (loadMoreDone) {
      if (list.length === posts.length) {
        setNoMoreList(true);
      }
    }
  }, [posts]);

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
        {list && list.map((item) => <CommunityItem key={item.id} {...item} />)}
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
            <MoreBtn onClick={handleMorePosts}>더보기</MoreBtn>
          </BtnContainer>
        )}
      </ListContainer>
    </>
  );
};

export default CommunityList;
