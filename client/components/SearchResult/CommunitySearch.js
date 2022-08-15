import { useEffect, useState } from "react";
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
  CommunityList,
} from "./styled";

import { searchActions } from "../../store/reducers/search";
import { communityActions } from "../../store/reducers/community";
import { useDispatch, useSelector } from "react-redux";

const SearchAll = () => {
  const searchPosts = useSelector((state) => state.search.searchPosts);
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(communityActions.loadPostDetailReset());
  }, []);

  useEffect(() => {
    if (router.isReady) {
      dispatch(searchActions.loadSearchPostsRequest(keyword));
    }
  }, [router.isReady, keyword]);

  return (
    <SearchContainer>
      <SearchResultComment>
        <SearchKeyword>{keyword}</SearchKeyword>에 대한 커뮤니티 검색결과
        <ResultLength>
          {searchPosts && `(${searchPosts.communityPosts.length}개)`}
        </ResultLength>
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
              <CommunityList>
                {searchPosts.communityPosts &&
                  searchPosts.communityPosts.map((item) => (
                    <CommunityItem key={item.id} {...item} />
                  ))}
              </CommunityList>
            </ListContainer>
          )}
        </>
      )}
    </SearchContainer>
  );
};

export default SearchAll;
