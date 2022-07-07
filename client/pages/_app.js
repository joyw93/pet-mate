import Head from "next/head";
// import styled, { createGlobalStyle } from "styled-components";
// import GlobalStyles from "../styles/GlobalStyles";
import "../pages/GlobalStyles.css";
import wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>펫메이트</title>
        <link rel="icon" href="../img/footprint.png" />
      </Head>
      <Component />
    </>
  );
};

export default wrapper.withRedux(App);
