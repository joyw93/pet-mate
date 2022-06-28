import styled from "styled-components";

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
    background-image: url("img/logo_pet.png");
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
`;

export const Input = styled.input`
border-radius: 15px;
border: 1px solid #fb9b03;
height: 30px;
width: 200px;
opacity: 0.7;
text-indent: 12px;

`

export const Tab = styled.div`
  margin-left: 20px;
  font-weight: bold;
  font-size: 15px;
  &:hover {
    color: #fb9b03;
  }
`;

export const Login = styled.div`
  margin-left: 20px;
  font-weight: bold;
  font-size: 15px;
  &:hover {
    color: #fb9b03;
  }
`;

export const Signup = styled.div`
  margin-left: 20px;
  font-weight: bold;
  font-size: 15px;
  &:hover {
    color: #fb9b03;
  }
`;
