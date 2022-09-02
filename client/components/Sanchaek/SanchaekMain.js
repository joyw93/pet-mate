import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
<<<<<<< HEAD
import ContentList from "./ContentList";
import { SanchaekContainer, SanchaekBanner, LocationSearch } from "./styled";
=======
import SanchaekList from "./SanchaekList";
import { SanchaekContainer, SanchaekBanner } from "./styled";
>>>>>>> c0f8e9f7fd6d26d7df9ee78ea3c63f14119f90a7
import { sanchaekActions } from "../../store/reducers/sanchaek";

const SanchaekMain = () => {
  const { me } = useSelector((state) => state.user);
  const { sanchaekAddPostDone } = useSelector((state) => state.sanchaek);
  const [inputVal, setInputVal] = useState("");
  const [visible, setVisible] = useState(false);

  const inputRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (sanchaekAddPostDone) {
      dispatch(sanchaekActions.sanchaekAddPostReset());
    }
  }, [sanchaekAddPostDone]);

  const goToNew = () => {
    if (!me) {
      Router.push("/login");
    } else {
      if (window.confirm("글 작성하러 가시겠습니까?")) {
        Router.push("/sanchaek/new");
      }
    }
  };

  const handleValChange = useCallback((event) => {
    if (event.target.value !== "") {
      setVisible(true);
    } else {
      setVisible(false);
    }
    setInputVal(event.target.value);
  }, []);

  const clearInputVal = useCallback((e) => {
    setInputVal("");
    setVisible(false);
  }, []);

  const goToSearchResult = (val) => {
    Router.push(`/search/sanchaek?keyword=${val}`);
  };

  const keyUp = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        if (!e.target.value.trim()) {
          return alert("내용을 입력하세요");
        }
        goToSearchResult(inputVal);
        setInputVal("");
        setVisible(false);
        inputRef.current.blur();
      }
    },
    [inputVal]
  );
  return (
    <SanchaekContainer>
      <SanchaekBanner onClick={goToNew}></SanchaekBanner>
<<<<<<< HEAD
      <LocationSearch>
        <div>
          <input
            onKeyUp={keyUp}
            placeholder="위치를 검색하세요"
            onChange={handleValChange}
            value={inputVal}
            ref={inputRef}
            maxLength="20"
          />
          {visible && (
            <button className="cancel_btn" onClick={clearInputVal}>
              <img src="../img/cancel-btn.png" />
            </button>
          )}
        </div>
      </LocationSearch>
      <ContentList />
=======
      <SanchaekList />
>>>>>>> c0f8e9f7fd6d26d7df9ee78ea3c63f14119f90a7
    </SanchaekContainer>
  );
};

export default SanchaekMain;
