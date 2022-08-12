import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import ContentList from "./ContentList";
import { SanchaekContainer, SanchaekBanner } from "./styled";
import { sanchaekActions } from "../../store/reducers/sanchaek";

const SanchaekMain = () => {
  const { me } = useSelector((state) => state.user);
  const { sanchaekAddPostDone } = useSelector((state) => state.sanchaek);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sanchaekAddPostDone) {
      dispatch(sanchaekActions.sanchaekAddPostReset());
    }
  }, [sanchaekAddPostDone]);

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
      <SanchaekBanner onClick={goToNew}></SanchaekBanner>
      <ContentList />
    </SanchaekContainer>
  );
};

export default SanchaekMain;
