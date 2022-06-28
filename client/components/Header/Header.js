import Link from "next/link";
import { NavContainer, Tab, Login, Signup, Input } from "./styled";



const Header = () => {
  return (
    <>
      <NavContainer>
        <div id="menu_left">
          <Link href="/">
            <div id="logo"></div>
          </Link>

          <ul id="lnb">
            <li>
              <Tab>
                <Link href="/running-mate">산책메이트</Link>
              </Tab>
            </li>
            <li>
              <Tab>
                <Link href="/community">커뮤니티</Link>
              </Tab>
            </li>
          </ul>
        </div>
        <div id="menu_right">
          <form>
            <Input placeholder="검색어를 입력하세요"/>
          </form>
          <ul id="gnb">
            <li>
              <Login>
                <Link href="/">로그인</Link>
              </Login>
            </li>
            <li>
              <Signup>
                <Link href="/">회원가입</Link>
              </Signup>
            </li>
          </ul>
        </div>
      </NavContainer>
    </>
  );
};

export default Header;
