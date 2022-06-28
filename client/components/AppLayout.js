import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
