import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import CommunityItem from "../CommunityMain/CommunityItem";
import SanchaekItem from "../Sanchaek/SanchaekItem";
import {
  SearchContainer,
  NoResult,
  NoResultImg,
  ListContainer,
  SearchResultComment,
  SearchKeyword,
  ResultLength,
  CommunityList,
  SanchaekList,
  TitleWrapper,
  MoreButton,
} from "./styled";

import { searchActions } from "../../store/reducers/search";
import { useDispatch, useSelector } from "react-redux";

const SearchAll = () => {
  // const searchPosts = useSelector((state) => state.search.searchPosts);
  // const router = useRouter();
  // const { query } = router.query;
  // const dispatch = useDispatch();

  // console.log(query);

  // useEffect(() => {
  //   if (router.isReady) {
  //     dispatch(searchActions.loadHashtagPostsRequest(query));
  //   }
  // }, [router.isReady, query]);

  return (
    <SearchContainer>
      <SearchResultComment>
        <SearchKeyword>{query}</SearchKeyword>에 대한 검색결과
        <ResultLength>{`(${
          searchPosts.community.length + searchPosts.sanchaek
        }개)`}</ResultLength>
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
                <TitleWrapper>
                  <h1>
                    커뮤니티 <span>${searchPosts.community.length}</span>
                  </h1>
                  <MoreButton>더보기</MoreButton>
                </TitleWrapper>
                {searchPosts.community &&
                  searchPosts.community.map((item) => (
                    <CommunityItem key={item.id} {...item} />
                  ))}
              </CommunityList>
              <SanchaekList>
                <TitleWrapper>
                  <h1>
                    산책메이트 <span>${searchPosts.sanchaek.length}</span>
                  </h1>
                  <MoreButton>더보기</MoreButton>
                </TitleWrapper>
                {searchPosts.sanchaek &&
                  searchPosts.sanchaek.map((item) => (
                    <SanchaekItem key={item.id} {...item} />
                  ))}
              </SanchaekList>
            </ListContainer>
          )}
        </>
      )}
    </SearchContainer>
  );
};

export default SearchAll;
