import { PostCardContainer, Title, RunningMate, Community } from './styled';
import Grid from '@mui/material/Grid';

const PostCards = () => {
  return (
    <>
      <PostCardContainer>
        {/* <Title>인기 게시글</Title>
        <RunningMate>
          <span>산책 메이트</span>
        </RunningMate>
        <Community></Community> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            111
          </Grid>
          <Grid item xs={12} md={4}>
            222
          </Grid>
          <Grid item xs={12} md={4}>
            333
          </Grid>
        </Grid>
      </PostCardContainer>
    </>
  );
};

export default PostCards;
