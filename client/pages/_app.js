import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	body {
		padding: 0;
		margin: 0;
	}
`;

const App = ({ Component }) => {
  return (
    <>
      <GlobalStyle />
      <Head>
        <meta charSet="utf-8" />
        <title>펫메이트</title>
      </Head>
      <Component />
    </>
  );
};

export default App;
