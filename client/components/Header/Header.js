import Link from "next/link";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../../reducers/user";
import { NavContainer, Tab, Input, AuthTab, ToggleMenuWrapper } from "./styled";

const Header = () => {
  const [inputVal, setInputVal] = useState("");
  const [visibile, setVisibile] = useState(false);
  const [toggleVisible, setToggleVisible] = useState(false);

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

  const handleToggleVisible = () => {
    setToggleVisible(!toggleVisible);
  };

  return (
    <>
      <NavContainer>
        <div id="menu_left">
          <div id="logo_wrapper">
            <Link href="/">
              <div id="logo"></div>
            </Link>
          </div>
          <ul id="lnb">
            <li>
              <Tab>
                <Link href="/sanchaek">
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
              <button className="cancel_btn" onClick={clearInputVal}>
                <img src="../img/cancel-btn.png" />
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

        {/* toggle menu */}
        <ToggleMenuWrapper>
          <div id="toggle_btn" onClick={handleToggleVisible}>
            <img src="../img/toggle-menu-btn.png" alt="메뉴" />
          </div>
          {toggleVisible ? (
            <div id="toggle_menu">
              <div id="close_btn">
                <img src="../img/close-btn.png" alt="메뉴" />
              </div>
              <form id="search_input">
                <Input placeholder="검색어를 입력하세요" onChange={handleValChange} value={inputVal} />
                {visibile && (
                  <button className="toggle_cancel_btn" onClick={clearInputVal}>
                    <img src="../img/cancel-btn.png" />
                  </button>
                )}
              </form>
              <div id="menu_list">
                <ul>
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
            </div>
          ) : null}
        </ToggleMenuWrapper>
      </NavContainer>
    </>
  );
};

export default Header;
