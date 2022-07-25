import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import SanchaekItem from "./SanchaekItem";

import { SanchaekContent, BtnContainer } from "./styled";
import {
  sanchaekLoadPostsRequestAction,
  sanchaekLoadPostDetailResetAction,
} from "../../reducers/sanchaek";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ContentList = () => {
  const [noMoreList, setNoMoreList] = useState();
  const { sanchaekPosts } = useSelector((state) => state.sanchaek);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sanchaekLoadPostsRequestAction());
  }, []);

  useEffect(() => {
    dispatch(sanchaekLoadPostDetailResetAction());
  }, []);

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
      <BtnContainer>
        <span></span>
        <button>더보기</button>
      </BtnContainer>
    </SanchaekContent>
  );
};

export default ContentList;
