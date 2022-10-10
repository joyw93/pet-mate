import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

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
  CommunityResultsContainer,
} from "./styled";

import { searchActions } from "../../store/reducers/search";
import { communityActions } from "../../store/reducers/community";
import { sanchaekActions } from "../../store/reducers/sanchaek";
import { useDispatch, useSelector } from "react-redux";

const SearchAll = () => {
  const searchPosts = useSelector((state) => state.search.searchPosts);
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();
  const [communityResults, setCommunityResults] = useState([]);
  const [sanchaekResults, setSanchaekResults] = useState([]);

  /* 
  Todo : 디테일 리셋 기능 추가
  **/

  useEffect(() => {
    dispatch(communityActions.loadPostDetailReset());
    dispatch(sanchaekActions.sanchaekLoadPostDetailReset());
  }, []);

  useEffect(() => {
    if (router.isReady) {
      dispatch(searchActions.loadSearchPostsRequest(keyword));
    }
  }, [router.isReady, keyword]);

  useEffect(() => {
    if (searchPosts) {
      if (searchPosts.communityPosts.length > 2) {
        const result = searchPosts.communityPosts.slice(0, 2);
        setCommunityResults(result);
      } else {
        setCommunityResults(searchPosts.communityPosts);
      }
      if (searchPosts.sanchaekPosts.length > 4) {
        const result = searchPosts.sanchaekPosts.slice(0, 4);
        setSanchaekResults(result);
        console.log("산책", result);
      } else {
        setSanchaekResults(searchPosts.sanchaekPosts);
      }
    }
  }, [searchPosts]);

  const goToCommunitySearchResults = () => {
    router.push(`/search/community?keyword=${keyword}`);
  };
  const goToSanchaekSearchResults = () => {
    router.push(`/search/sanchaek?keyword=${keyword}`);
  };

  return (
    <SearchContainer>
      <SearchResultComment>
        <SearchKeyword>{keyword}</SearchKeyword>에 대한 검색결과
        <ResultLength>
          {searchPosts &&
            `(${searchPosts.communityPosts.length +
            searchPosts.sanchaekPosts.length
            }개)`}
        </ResultLength>
      </SearchResultComment>
      {searchPosts && searchPosts.length === 0 ? (
        <NoResult>
          <p>검색결과가 없습니다&#128546; 다른 검색어를 입력하세요.</p>
          <NoResultImg src="../img/no-search-result.png" alt='결과없음' />
        </NoResult>
      ) : (
        <>
          {searchPosts && (
            <ListContainer>
              {searchPosts.sanchaekPosts.length > 0 && (
                <SanchaekList>
                  <TitleWrapper>
                    <h1>
                      산책메이트
                      <span>({searchPosts.sanchaekPosts.length})</span>
                    </h1>
                    {searchPosts.sanchaekPosts.length > 4 && (
                      <MoreButton onClick={goToSanchaekSearchResults}>
                        더보기
                      </MoreButton>
                    )}
                  </TitleWrapper>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    {sanchaekResults && (
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                      >
                        {sanchaekResults.map((item) => (
                          <SanchaekItem key={item.id} {...item} />
                        ))}
                      </Grid>
                    )}
                  </Box>
                </SanchaekList>
              )}
              {searchPosts.communityPosts.length > 0 && (
                <CommunityList>
                  <TitleWrapper>
                    <h1>
                      커뮤니티
                      <span>({searchPosts.communityPosts.length})</span>
                    </h1>
                    {searchPosts.communityPosts.length > 2 && (
                      <MoreButton onClick={goToCommunitySearchResults}>
                        더보기
                      </MoreButton>
                    )}
                  </TitleWrapper>
                  {communityResults && (
                    <CommunityResultsContainer>
                      {communityResults.map((item) => (
                        <CommunityItem key={item.id} {...item} />
                      ))}
                    </CommunityResultsContainer>
                  )}
                </CommunityList>
              )}
            </ListContainer>
          )}
        </>
      )}
    </SearchContainer>
  );
};

export default SearchAll;
