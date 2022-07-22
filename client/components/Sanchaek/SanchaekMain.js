import Link from "next/link";
import { SanchaekContainer, SanchaekBanner } from "./styled";
import ContentList from "./ContentList";
import { useSelector } from "react-redux";
import Router from "next/router";

const SanchaekMain = () => {
  const { me } = useSelector((state) => state.user);

  const goToNew = () => {
    if (!me) {
      Router.replace("/login");
    } else {
      if (window.confirm("글 작성하러 가시겠습니까?")) {
        Router.replace("/sanchaek/new");
      }
    }
  };

  return (
    <SanchaekContainer>
      <SanchaekBanner onClick={goToNew}>
        <img src="../img/sanchaekbanner.png" />
      </SanchaekBanner>
      <ContentList />
    </SanchaekContainer>
  );
};

export default SanchaekMain;
