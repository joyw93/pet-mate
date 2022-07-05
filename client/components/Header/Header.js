import Link from "next/link";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../../reducers/user";
import { NavContainer, Tab, Login, Signup, Input, AuthTab } from "./styled";

const Header = () => {
  const [inputVal, setInputVal] = useState("");
  const [visibile, setVisibile] = useState(false);
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const logOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const handleValChange = (event) => {
    if (event.target.value !== "") {
      setVisibile(true);
    } else {
      setVisibile(false);
    }
    setInputVal(event.target.value);
  };

  const clearInputVal = (e) => {
    e.preventDefault();
    setInputVal("");
    setVisibile(false);
  };

  return (
    <>
      <NavContainer>
        <div id="menu_left">
          <Link href="/">
            <a>
              <div id="logo"></div>
            </a>
          </Link>

          <ul id="lnb">
            <li>
              <Tab>
                <Link href="/walking-mate">
                  <a>산책메이트</a>
                </Link>
              </Tab>
            </li>
            <li>
              <Tab>
                <Link href="/community">
                  <a>커뮤니티</a>
                </Link>
              </Tab>
            </li>
          </ul>
        </div>
        <div id="menu_right">
          <form>
            <Input placeholder="검색어를 입력하세요" onChange={handleValChange} value={inputVal} />
            {visibile && (
              <button id="cancel_btn" onClick={clearInputVal}>
                <img src="../img/cancelBtn.png" />
              </button>
            )}
          </form>
          <ul id="gnb">
            {me ? (
              <>
                <AuthTab>
                  <Link href="/profile">
                    <a>프로필</a>
                  </Link>
                </AuthTab>
                <AuthTab>
                  <span onClick={logOut}>로그아웃</span>
                </AuthTab>
              </>
            ) : (
              <>
                <AuthTab>
                  <Link href="/login">
                    <a>로그인</a>
                  </Link>
                </AuthTab>
                <AuthTab>
                  <Link href="/signup">
                    <a>회원가입</a>
                  </Link>
                </AuthTab>
              </>
            )}
          </ul>
        </div>
      </NavContainer>
    </>
  );
};

export default Header;
