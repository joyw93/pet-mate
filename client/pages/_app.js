import Head from "next/head";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import "../pages/GlobalStyles.css";
import wrapper from "../store/configureStore";
import { SnackBarContent } from "../components/Header/styled";
import axios from "axios";
import { userActions } from "../store/reducers/user";

const App = ({ Component, pageProps }) => {
  const feedback = [
    {
      id: 1,
      type: "logout",
      message: "로그아웃 되었습니다! 🐾",
    },
    {
      id: 2,
      type: "signup",
      message: "회원가입 되었습니다! 🐾",
    },
  ];
  const { me, logOutDone, signUpDone, userInfo } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [snackBar, setSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const handleClose = () => {
    setSnackBar(false);
  };


  // useEffect(() => {
  //   dispatch(userActions.loadUserInfoRequest());
  // }, []);

  useEffect(() => {
    if (userInfo && userInfo.active) {
      dispatch(userActions.loadMyProfileRequest());
    }
  }, [userInfo]);

  // useEffect(() => {
  //   dispatch(userActions.loadProfileRequest());
  // }, []);

  useEffect(() => {
    if (logOutDone) {
      setSnackBar(logOutDone);
      setSnackBarMessage(feedback[0].message);
    }
  }, [logOutDone]);

  useEffect(() => {
    if (signUpDone) {
      setSnackBar(signUpDone);
      setSnackBarMessage(feedback[1].message);
    }
  }, [signUpDone]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>펫메이트</title>
        <meta
          name="description"
          content="반려동물 온라인 커뮤니티 펫메이트 | 집 근처에서 우리 강아지 동네친구를 찾아보세요! & 이웃 반려인들과 함께 즐거운 반려생활을 공유해보세요!"
        />
        <link rel="icon" href="../img/footprint.png" />
        <script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=74641db2b92f24a8a2f5a57b3451b548&libraries=services,clusterer&autoload=false"
          strategy="beforeInteractive"
        />
      </Head>
      <Component {...pageProps} />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackBar}
        autoHideDuration={2000}
        onClose={handleClose}
        key={"bottomcenter"}
      >
        <SnackBarContent>{snackBarMessage}</SnackBarContent>
      </Snackbar>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("http://api.petmate.kr/user");
  const data = await res.json();

  console.log(data);
  // Pass data to the page via props
  return { props: { data } };
}

export default wrapper.withRedux(App);
