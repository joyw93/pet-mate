import { useEffect, useState } from "react";
import {
  ProfileContainer,
  BackgroundArea,
  ContentArea,
  UserContent,
  ProfileInfo,
  ProfileImg,
  UserInfo,
  UserFeed,
  TabWrapper,
  ButtonWrapper,
} from "./styled";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { useCallback } from "react";
import { useRouter } from "next/router";
import {
  signOutRequestAction,
  signOutResetAction,
  loadMyPostsAction,
  loadMyCommentsAction,
  loadMyLikedAction,
  loadProfileRequestAction,
} from "../../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { user } = useSelector((state) => state.user);

  //   useEffect(() => {
  //     if (router.isReady) {
  //       dispatch(loadProfileRequestAction(id));
  //     }
  //   }, [router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      console.log("asdf");
      dispatch(loadProfileRequestAction(id));
    }
  }, [router.isReady]);

  useEffect(() => {
    console.log("asdf");
    console.log(user);
  }, [user]);

  return (
    <>
      <ProfileContainer>
        <BackgroundArea />
        <ContentArea>
          <UserContent>
            <ProfileInfo>
              <ProfileImg>
                {user?.profile?.imageUrl ? (
                  <img src={user.profile.imageUrl} alt="프로필이미지" />
                ) : (
                  <img src="../img/defaultimgGrey.png" alt="프로필이미지" />
                )}
              </ProfileImg>
              <UserInfo>
                <h2>{user?.nickname}</h2>
                <p>{user?.comment}</p>
              </UserInfo>
              <UserFeed></UserFeed>
              <ButtonWrapper></ButtonWrapper>
            </ProfileInfo>
            <TabWrapper></TabWrapper>
          </UserContent>
        </ContentArea>
      </ProfileContainer>
    </>
  );
};

export default UserProfile;
