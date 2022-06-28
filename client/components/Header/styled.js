import styled from 'styled-components';

export const NavContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  #logo {
    width: 156px;
    height: 56px;
    background-image: url('img/logo_pet.png');
    background-size: cover;
    cursor: pointer;
  }

  #menu_left,
  #lnb,
  #gnb,
  #menu_right {
    display: flex;
    align-items: center;
  }

  #lnb li {
    line-height: 64px;
  }
  #search_input:focus {
    outline: none;
  }
`;
