import Head from "next/head";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import React, {
  useEffect,
  useState,
} from "react";
import "../pages/GlobalStyles.css";
import wrapper from "../store/configureStore";
import { SnackBarContent } from "../components/Header/styled";
import { logoutResetAction } from "../reducers/user";

const App = ({ Component, pageProps }) => {
  const { logOutDone } = useSelector((state) => state.user);
  const [snackBar, setSnackBar] = useState(false);
  const handleClose = () => {
    setSnackBar(false);
  };

  useEffect(() => {
    setSnackBar(logOutDone);
  }, [logOutDone]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>펫메이트</title>
        <link rel="icon" href="../img/footprint.png" />
        {/* <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=74641db2b92f24a8a2f5a57b3451b548&libraries=services,clusterer&autoload=false"
          strategy="beforeInteractive"
        /> */}
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
        <SnackBarContent>로그아웃 되었습니다! 🐾</SnackBarContent>
      </Snackbar>
    </>
  );
};

export default wrapper.withRedux(App);
