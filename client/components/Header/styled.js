import styled from 'styled-components';
import { Colors } from '../../styles/ColorVariable';

export const NavContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  #logo {
    width: 156px;
    height: 56px;
    background-image: url('../img/logo_pet.png');
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
  #menu_right form {
    position: relative;
  }
  #cancel_btn {
    background: none;
    border: none;
    position: absolute;
    right: 5px;
    top: 6px;
    cursor: pointer;
  }
  #cancel_btn > img {
    width: 15px;
    height: 15px;
  }
`;

export const Input = styled.input`
  border-radius: 15px;
  border: 1px solid ${Colors.primaryColor};
  height: 30px;
  width: 200px;
  opacity: 0.7;
  text-indent: 12px;
`;

export const Tab = styled.div`
  margin-left: 20px;
  font-weight: bold;
  font-size: 15px;
  &:hover {
    color: ${Colors.primaryColor};
    transition: 0.2s all;
  }
`;

export const AuthTab = styled.li`
  margin-left: 20px;
  font-weight: bold;
  font-size: 15px;
  &:hover {
    cursor: pointer;
    color: ${Colors.primaryColor};
    transition: 0.2s all;
  }


`;
