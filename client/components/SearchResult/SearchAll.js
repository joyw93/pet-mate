import { useEffect, useState } from "react";
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
  const searchPosts = useSelector((state) => state.search.searchPosts);
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();
  const [communityResults, setCommunityResults] = useState([]);
  const [sanchaekResults, setSanchaekResults] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      dispatch(searchActions.loadSearchPostsRequest(keyword));
    }
  }, [router.isReady, keyword]);
  console.log("postssssssss", searchPosts);

  // useEffect(() => {
  //   if (searchPosts) {
  //     if (searchPosts.communityPosts.length > 4) {
  //       const result = searchPosts.communityPosts.splice(0, 4);
  //       setCommunityResults(result);
  //       console.log(result);
  //     } else {
  //       setCommunityResults(searchPosts.communityPosts);
  //     }
  //     if (searchPosts.communityPosts.length > 4) {
  //       const result = searchPosts.sanchaekPosts.splice(0, 4);
  //       setSanchaekResults(result);
  //       console.log("산책", result);
  //     } else {
  //       setSanchaekResults(searchPosts.sanchaekPosts);
  //     }
  //   }
  // }, [searchPosts]);

  // console.log("커뮤", communityResults);
  // console.log("산책", sanchaekResults);

  return (
    <SearchContainer>
      <SearchResultComment>
        <SearchKeyword>{keyword}</SearchKeyword>에 대한 검색결과
        <ResultLength>
          {searchPosts &&
            `(${
              searchPosts.communityPosts.length +
              searchPosts.sanchaekPosts.length
            }개)`}
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
                <TitleWrapper>
                  <h1>
                    커뮤니티 <span>${searchPosts.communityPosts.length}</span>
                  </h1>
                  <MoreButton>더보기</MoreButton>
                </TitleWrapper>
                {searchPosts.communityPosts &&
                  searchPosts.communityPosts.map((item) => (
                    <CommunityItem key={item.id} {...item} />
                  ))}
              </CommunityList>
              <SanchaekList>
                <TitleWrapper>
                  <h1>
                    산책메이트{" "}
                    <span>({searchPosts.sanchaekPosts.length})개</span>
                  </h1>
                  <MoreButton>더보기</MoreButton>
                </TitleWrapper>
                {searchPosts.sanchaekPosts &&
                  searchPosts.sanchaekPosts.map((item) => (
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
