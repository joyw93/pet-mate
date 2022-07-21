import Link from "next/link";
import Router from "next/router";
import React, { useCallback, useEffect, useState, useLayoutEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../../reducers/user";
import {
  NavContainer,
  Tab,
  Input,
  AuthTab,
  LinkWrapper,
  ToggleMenuWrapper,
  SanchaekWrapper,
  CommunityWrapper,
  InputWrapper,
} from "./styled";

import { useRouter } from "next/router";

const Header = () => {
  const canUseDOM = typeof window !== "undefined";
  const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;
  const router = useRouter();
  const currentPath = router.pathname;
  const [pathCheck, setPathCheck] = useState(currentPath);
  const [inputVal, setInputVal] = useState("");
  const [visible, setVisible] = useState(false);
  const [toggleVisible, setToggleVisible] = useState("none");

  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const inputRef = useRef();
  const toggleInputRef = useRef();

  useIsomorphicLayoutEffect(() => {
    if (pathCheck.includes("sanchaek")) {
      setPathCheck("sanchaek");
    } else if (pathCheck.includes("community")) {
      setPathCheck("community");
    }
  }, [pathCheck]);

  const logOut = useCallback(() => {
    dispatch(logoutRequestAction());
    Router.replace("/");
    alert("로그아웃되었습니다!");
  }, []);

  const handleValChange = useCallback((event) => {
    if (event.target.value !== "") {
      setVisible(true);
    } else {
      setVisible(false);
    }
    setInputVal(event.target.value);
  }, []);

  const clearInputVal = useCallback((e) => {
    e.preventDefault();
    setInputVal("");
    setVisible(false);
  }, []);

  const handleToggleVisible = useCallback(() => {
    if (toggleVisible === "none") {
      setToggleVisible("block");
    } else {
      setToggleVisible("none");
    }
  }, [toggleVisible]);

  const keyUp = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        if (!e.target.value.trim()) {
          return alert("내용을 입력하세요");
        }
        setInputVal("");
        setVisible(false);
        inputRef.current.blur();
        toggleInputRef.current.blur();
      }
    },
    [inputVal]
  );

  return (
    <>
      <NavContainer>
        <div id="menu_left">
          <div id="logo_wrapper">
            <Link href="/" passHref>
              <a>
                <div id="logo"></div>
              </a>
            </Link>
          </div>
          <ul id="lnb">
            <li>
              <Tab>
                <Link href="/sanchaek" passHref>
                  <SanchaekWrapper path={pathCheck}>산책메이트</SanchaekWrapper>
                </Link>
              </Tab>
            </li>
            <li>
              <Tab>
                <Link href="/community" passHref>
                  <CommunityWrapper path={pathCheck}>커뮤니티</CommunityWrapper>
                </Link>
              </Tab>
            </li>
          </ul>
        </div>
        <div id="menu_right">
          <InputWrapper>
            <Input
              onKeyUp={keyUp}
              placeholder="검색어를 입력하세요"
              onChange={handleValChange}
              value={inputVal}
              ref={inputRef}
              maxLength="10"
            />
            {visible && (
              <button className="cancel_btn" onClick={clearInputVal}>
                <img src="../img/cancel-btn.png" />
              </button>
            )}
          </InputWrapper>
          <ul id="gnb">
            {me ? (
              <>
                <AuthTab>
                  <Link href="/profile" passHref>
                    <LinkWrapper>프로필</LinkWrapper>
                  </Link>
                </AuthTab>
                <AuthTab>
                  <span onClick={logOut}>로그아웃</span>
                </AuthTab>
              </>
            ) : (
              <>
                <AuthTab>
                  <Link href="/login" passHref>
                    <LinkWrapper>로그인</LinkWrapper>
                  </Link>
                </AuthTab>
                <AuthTab>
                  <Link href="/signup" passHref>
                    <LinkWrapper>회원가입</LinkWrapper>
                  </Link>
                </AuthTab>
              </>
            )}
          </ul>
        </div>

        {/* toggle menu */}
        <ToggleMenuWrapper display={toggleVisible}>
          <div id="toggle_btn" onClick={handleToggleVisible}>
            <img src="../../img/toggle-menu-btn.png" alt="메뉴" />
          </div>
          <div id="toggle_menu">
            <div id="close_btn" onClick={handleToggleVisible}>
              <img src="../../img/close-btn.png" alt="메뉴" />
            </div>
            <InputWrapper id="search_input">
              <Input
                onKeyUp={keyUp}
                placeholder="검색어를 입력하세요"
                onChange={handleValChange}
                value={inputVal}
                ref={toggleInputRef}
                maxLength="10"
              />
              {visible && (
                <button className="toggle_cancel_btn" onClick={clearInputVal}>
                  <img src="../img/cancel-btn.png" />
                </button>
              )}
            </InputWrapper>
            <div id="menu_list">
              <ul>
                <li>
                  <Tab>
                    <Link href="/sanchaek" passHref>
                      <SanchaekWrapper>산책메이트</SanchaekWrapper>
                    </Link>
                  </Tab>
                </li>
                <li>
                  <Tab>
                    <Link href="/community" passHref>
                      <CommunityWrapper>커뮤니티</CommunityWrapper>
                    </Link>
                  </Tab>
                </li>
                {me ? (
                  <>
                    <AuthTab>
                      <Link href="/profile" passHref>
                        <LinkWrapper>프로필</LinkWrapper>
                      </Link>
                    </AuthTab>
                    <AuthTab>
                      <span onClick={logOut}>로그아웃</span>
                    </AuthTab>
                  </>
                ) : (
                  <>
                    <AuthTab>
                      <Link href="/login" passHref>
                        <LinkWrapper>로그인</LinkWrapper>
                      </Link>
                    </AuthTab>
                    <AuthTab>
                      <Link href="/signup" passHref>
                        <LinkWrapper>회원가입</LinkWrapper>
                      </Link>
                    </AuthTab>
                  </>
                )}
              </ul>
            </div>
          </div>
        </ToggleMenuWrapper>
      </NavContainer>
    </>
  );
};

export default Header;
