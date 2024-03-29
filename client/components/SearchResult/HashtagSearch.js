import { useEffect } from "react";
import { useRouter } from "next/router";

import CommunityItem from "../CommunityMain/CommunityItem";
import {
  SearchContainer,
  NoResult,
  NoResultImg,
  ListContainer,
  SearchResultComment,
  SearchKeyword,
  ResultLength,
} from "./styled";

import { searchActions } from "../../store/reducers/search";
import { communityActions } from "../../store/reducers/community";
import { sanchaekActions } from "../../store/reducers/sanchaek";
import { useDispatch, useSelector } from "react-redux";

const HashtagSearch = () => {
  const hashtagSearchPosts = useSelector(
    (state) => state.search.hashtagSearchPosts
  );
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();

  console.log(keyword);

  useEffect(() => {
    dispatch(communityActions.loadPostDetailReset());
    dispatch(sanchaekActions.sanchaekLoadPostDetailReset());
  }, []);

  useEffect(() => {
    if (router.isReady) {
      dispatch(searchActions.loadHashtagPostsRequest(keyword));
    }
  }, [router.isReady, keyword]);

  return (
    <SearchContainer>
      <SearchResultComment>
        <SearchKeyword>{`#${keyword}`}</SearchKeyword>에 대한 검색결과{" "}
        <ResultLength>{`(${hashtagSearchPosts.length}개)`}</ResultLength>
      </SearchResultComment>
      {hashtagSearchPosts && hashtagSearchPosts.length === 0 ? (
        <NoResult>
          <p>검색결과가 없습니다&#128546; 다른 검색어를 입력하세요.</p>
          <NoResultImg src="../img/no-search-result.png" />
        </NoResult>
      ) : (
        <>
          {hashtagSearchPosts && (
            <ListContainer>
              {hashtagSearchPosts &&
                hashtagSearchPosts.map((item) => (
                  <CommunityItem key={item.id} {...item} />
                ))}
              {/* <BtnContainer>
                <span></span>
                <button onClick={handleMorePosts}>더보기</button>
              </BtnContainer> */}
            </ListContainer>
          )}
        </>
      )}
    </SearchContainer>
  );
};

export default HashtagSearch;
