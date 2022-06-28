import Link from 'next/link';
import { NavContainer } from './styled';
import { Input, Space } from 'antd';
// import 'antd/dist/antd.css';

const { Search } = Input;

const Header = () => {
  return (
    <>
      <NavContainer>
        <div id='menu_left'>
          <Link href='/'>
            <div id='logo'></div>
          </Link>

          <ul id='lnb'>
            <li>
              <Link href='/user'>산책 메이트</Link>
            </li>
            <li>
              <Link href='/'>커뮤니티</Link>
            </li>
          </ul>
        </div>
        <div id='menu_right'>
          <form>
            <Input
              id='search_input'
              placeholder='검색어를 입력하세요.'
              allowClear
              style={{
                width: 200,
                borderRadius: '20px',
                border: '1px solid #FB9B03',
              }}
            />
          </form>
          <ul id='gnb'>
            <li>
              <Link href='/user'>로그인</Link>
            </li>
            <li>
              <Link href='/'>회원가입</Link>
            </li>
          </ul>
        </div>
      </NavContainer>
    </>
  );
};

export default Header;
