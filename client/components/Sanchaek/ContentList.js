import Grid from "@mui/material/Grid";
import Link from "next/link";
import Box from '@mui/material/Box';

import SanchaekItem from './SanchaekItem';

import { Item, SanchaekContent, BtnContainer, ItemImage } from "./styled";
import {
  sanchaekLoadMorePostsAction,
  sanchaekLoadPostsRequestAction,
  sanchaekLoadPostDetailResetAction,
  sanchaekLoadMoreResetAction,
} from "../../reducers/sanchaek";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
const ContentList = () => {
  const [noMoreList, setNoMoreList] = useState();
  const {
    sanchaekPosts,
    sanchaekLoadPostsDone,
    sanchaekLoadMoreDone,
    sanchaekMorePosts,
  } = useSelector((state) => state.sanchaek);
  const dispatch = useDispatch();
  // const morePostsRef = useRef(1);

  useEffect(() => {
    dispatch(sanchaekLoadPostsRequestAction());
    console.log(sanchaekPosts);
  }, []);

  useEffect(() => {
    dispatch(sanchaekLoadPostDetailResetAction());
  }, []);


  return (

    <SanchaekContent>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 4 }}
        >
          {sanchaekPosts &&
            sanchaekPosts.map((item) => (
              <SanchaekItem key={item.id} {...item} />
            ))}
          {/* {sanchaekPosts &&
            sanchaekPosts.map((item) => (
              <>{item.id}</>
            ))} */}
        </Grid>
      </Box>
      <BtnContainer>
        <span></span>
        <button>더보기</button>
      </BtnContainer>
    </SanchaekContent>

  );
};

export default ContentList;
