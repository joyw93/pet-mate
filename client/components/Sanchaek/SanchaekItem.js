import {
  ItemContainer,
  ItemWrapper,
  ImageWrapper,
  ContentArea,
  ContentTitle,
  ItemImage,
  ContentInfo,
  LocaImg,
  ItemHeader,
  HeadUser,
  FollowBtn,
  ContentDetail
} from "./styled";
import Grid from "@mui/material/Grid";

import { useRouter } from "next/router";

const SanchaekItem = (post) => {
  const Router = useRouter();
  const itemSelect = () => {
    Router.push(`/sanchaek/${post.id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <ItemHeader>
        <HeadUser>
          {/* <img src="../img/defaultimgGrey.png" style={{ width: '30px' }} />
          <p>{post.user.nickname}</p> */}
          {post?.user?.profile?.imageUrl ? (
            <img src={post.user.profile.imageUrl} />
          ) : (
            <img src={'../img/defaultimgGrey.png'} />
          )}
          <p>{post.user.nickname}</p>
        </HeadUser>
        <FollowBtn>팔로우</FollowBtn>
      </ItemHeader>
      <ItemContainer onClick={itemSelect}>
        <ItemWrapper>
          {post?.images && (
            <ImageWrapper>
              {post?.images?.length === 0 ? (
                <ItemImage src="../img/defaultimgGrey.png" />
              ) : (
                <ItemImage src={post.images[0].url} />
              )}
            </ImageWrapper>
          )}
          <ContentArea>
            <ContentTitle>{post.title.slice(0, 20)}</ContentTitle>
            {post && post.mapInfo && post.mapInfo.location && (
              <ContentInfo>
                <LocaImg src="../../img/locationEmojiBlk.png" />
                <span>{post.mapInfo.location}</span>
              </ContentInfo>
            )}
            <ContentDetail>좋아요 {post.likeCount} · 조회수 {post.views}</ContentDetail>
          </ContentArea>
        </ItemWrapper>
      </ItemContainer>
    </Grid>
  );
};

export default SanchaekItem;
