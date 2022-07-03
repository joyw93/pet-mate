import Link from "next/link";
import { useState } from "react";
import { NavContainer, Tab, Login, Signup, Input } from "./styled";

const Header = () => {
  const [inputVal, setInputVal] = useState("");
  const [visibile, setVisibile] = useState(false);

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
            <Input
              placeholder="검색어를 입력하세요"
              onChange={handleValChange}
              value={inputVal}
            />
            {visibile && (
              <button id="cancel_btn" onClick={clearInputVal}>
                <img src="img/cancelbtn.png" />
              </button>
            )}
          </form>
          <ul id="gnb">
            <li>
              <Login>
                <Link href="/login">
                  <a>로그인</a>
                </Link>
              </Login>
            </li>
            <li>
              <Signup>
                <Link href="/signup">
                  <a>회원가입</a>
                </Link>
              </Signup>
            </li>
          </ul>
        </div>
      </NavContainer>
    </>
  );
};

export default Header;
