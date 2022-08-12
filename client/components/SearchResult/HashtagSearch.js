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

// import { loadHashtagPostsRequestAction } from "../../reducers/search";
import { useDispatch, useSelector } from "react-redux";

const HashtagSearch = () => {
  const searchPosts = useSelector((state) => state.search.searchPosts);
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();

  console.log(keyword);

  useEffect(() => {
    if (router.isReady) {
      dispatch(searchActions.loadHashtagPostsRequest(keyword));
    }
  }, [router.isReady, keyword]);

  return (
    <SearchContainer>
      <SearchResultComment>
        <SearchKeyword>{`#${keyword}`}</SearchKeyword>에 대한 검색결과{" "}
        <ResultLength>{`(${searchPosts.length}개)`}</ResultLength>
      </SearchResultComment>
      {searchPosts && searchPosts.length === 0 ? (
        <NoResult>
          <p>검색결과가 없습니다&#128546; 다른 검색어를 입력하세요.</p>
          <NoResultImg src="../img/no-search-result.png" />
        </NoResult>
      ) : (
        <>
          {searchPosts && (
            <ListContainer>
              {searchPosts &&
                searchPosts.map((item) => (
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
