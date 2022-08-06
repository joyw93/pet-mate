import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import SanchaekItem from "./SanchaekItem";
import { SanchaekContent, BtnContainer, BtnLine, MoreBtn } from "./styled";

import {
  sanchaekLoadPostsRequestAction,
  sanchaekLoadPostDetailResetAction,
  sanchaekLoadMoreResetAction,
  sanchaekLoadMorePostsAction,
} from "../../store/reducers/sanchaek";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

const ContentList = () => {
  const [noMoreList, setNoMoreList] = useState(false);
  const {
    sanchaekPosts,
    sanchaekLoadPostsDone,
    sanchaekLoadMoreDone,
    sanchaekMorePosts,
  } = useSelector((state) => state.sanchaek);
  const dispatch = useDispatch();
  const moreSanchaekPostsRef = useRef(1);

  useEffect(() => {
    dispatch(sanchaekLoadPostsRequestAction());
    moreSanchaekPostsRef.current = 1;
  }, []);

  useEffect(() => {
    dispatch(sanchaekLoadPostDetailResetAction());
  }, []);

  useEffect(() => {
    if (sanchaekLoadPostsDone) {
      dispatch(sanchaekLoadMoreResetAction());
    }
    if (
      sanchaekLoadMoreDone &&
      moreSanchaekPostsRef.current !== 1 &&
      sanchaekMorePosts.length === 0
    ) {
      console.log(sanchaekMorePosts.length);
      setNoMoreList(true);
    }
  }, [sanchaekPosts]);

  useEffect(() => {
    setNoMoreList(false);
  }, []);

  const handleMorePosts = () => {
    const data = {
      offset: 12 * moreSanchaekPostsRef.current,
    };
    dispatch(sanchaekLoadMorePostsAction(data));
    moreSanchaekPostsRef.current++;
  };

  return (
    <SanchaekContent>
      <Box sx={{ width: "100%" }}>
        {sanchaekPosts && (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          >
            {sanchaekPosts.map((item) => (
              <SanchaekItem key={item.id} {...item} />
            ))}
          </Grid>
        )}
      </Box>
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
          {sanchaekPosts.length >= 10 ? (
            <MoreBtn onClick={handleMorePosts}>더보기</MoreBtn>
          ) : null}
        </BtnContainer>
      )}
    </SanchaekContent>
  );
};

export default ContentList;
