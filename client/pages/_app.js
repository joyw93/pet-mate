import Head from "next/head";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>PET-MATE</title>
      </Head>
      <Component />
    </>
  );
};

export default App;