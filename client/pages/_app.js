import Head from "next/head";
// import styled, { createGlobalStyle } from "styled-components";
// import GlobalStyles from "../styles/GlobalStyles";
import "../pages/GlobalStyles.css";
import wrapper from "../store/configureStore";
import Script from "next/script";

const App = ({ Component }) => {
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
      <Component />
    </>
  );
};

export default wrapper.withRedux(App);
