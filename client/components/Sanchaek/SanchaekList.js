import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SanchaekItem from "./SanchaekItem";
import { SanchaekContent, BtnContainer, BtnLine, MoreBtn } from "./styled";
import { sanchaekActions } from "../../store/reducers/sanchaek";

const SanchaekList = () => {
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
    dispatch(sanchaekActions.sanchaekLoadPostsRequest());
    moreSanchaekPostsRef.current = 1;
  }, []);

  useEffect(() => {
    dispatch(sanchaekActions.sanchaekLoadPostDetailReset());
  }, []);

  useEffect(() => {
    if (sanchaekLoadPostsDone) {
      dispatch(sanchaekActions.sanchaekLoadMoreReset());
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
    dispatch(sanchaekActions.sanchaekLoadMoreRequest(data));
    moreSanchaekPostsRef.current++;
  };

  console.log(sanchaekPosts);
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

export default SanchaekList;
