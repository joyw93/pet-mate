import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import wrapper from "../store/configureStore";
// const GlobalStyle = createGlobalStyle`
// 	* {
// 		padding: 0;
// 		margin: 0;
//     box-sizing: border-box;
// 	}
//   li {
//     list-style: none;
//   }
//   a {
//     color: #000;
//     text-decoration: none;
//   }
// `;

const App = ({ Component }) => {
  return (
    <>
      <GlobalStyles />
      <Head>
        <meta charSet="utf-8" />
        <title>펫메이트</title>
      </Head>
      <Component />
    </>
  );
};

export default wrapper.withRedux(App);
