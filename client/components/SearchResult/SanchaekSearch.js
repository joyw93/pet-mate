import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SanchaekItem from "../Sanchaek/SanchaekItem";
import {
  SearchContainer,
  NoResult,
  NoResultImg,
  ListContainer,
  SearchResultComment,
  SearchKeyword,
  ResultLength,
  SanchaekList,
} from "./styled";

import { searchActions } from "../../store/reducers/search";
import { sanchaekActions } from "../../store/reducers/sanchaek";
import { communityActions } from "../../store/reducers/community";
import { useDispatch, useSelector } from "react-redux";

const SearchAll = () => {
  const searchPosts = useSelector((state) => state.search.searchPosts);
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(communityActions.loadPostDetailReset());
    dispatch(sanchaekActions.sanchaekLoadPostDetailReset());
  }, []);

  useEffect(() => {
    if (router.isReady) {
      dispatch(searchActions.loadSearchPostsRequest(keyword));
    }
  }, [router.isReady, keyword]);

  return (
    <SearchContainer>
      <SearchResultComment>
        <SearchKeyword>{keyword}</SearchKeyword>에 대한 산책메이트 검색결과
        <ResultLength>
          {searchPosts && `(${searchPosts.sanchaekPosts.length}개)`}
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
              <SanchaekList>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  {searchPosts.sanchaekPosts && (
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                      {searchPosts.sanchaekPosts.map((item) => (
                        <SanchaekItem key={item.id} {...item} />
                      ))}
                    </Grid>
                  )}
                </Box>
              </SanchaekList>
            </ListContainer>
          )}
        </>
      )}
    </SearchContainer>
  );
};

export default SearchAll;
