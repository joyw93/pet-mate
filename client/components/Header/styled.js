import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

export const NavContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 46px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  #logo {
    width: 156px;
    height: 56px;
    background-image: url("../img/logo_pet.png");
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
  @media (max-width: 1200px) {
    #logo {
      margin-left: 20px;
    }
    #menu_right {
      margin-right: 20px;
    }
  }

  #lnb li {
    line-height: 64px;
  }
  #menu_right form {
    position: relative;
  }
  .cancel_btn {
    background: none;
    border: none;
    position: absolute;
    right: 7px;
    top: 7px;
    cursor: pointer;
  }
  .cancel_btn > img {
    width: 18px;
    height: 18px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    #logo {
      width: 109px;
      height: 39px;
    }
  }
  @media (max-width: 767px) {
    #logo {
      width: 78px;
      height: 28px;
    }
  }

  @media (max-width: 699px) {
    #lnb,
    #menu_right {
      display: none;
    }
  }
`;

export const ToggleMenuWrapper = styled.div`
  height: 46px;
  position: relative;
  #toggle_btn,
  #close_btn {
    width: 28px;
    height: 28px;
    position: absolute;
    right: 15px;
    top: 9px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  #toggle_menu {
    width: 45%;
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 99;
    background-color: #fff;
    padding-top: 60px;
    display: flex;
    flex-direction: column;

    #menu_list {
      width: 90%;
      margin: 0 auto;
      font-size: 1em;
      li {
        margin-top: 20px;
      }
    }
    #search_input {
      width: 80%;
      margin: 0 auto;
      & input {
        width: 100%;
      }
      .toggle_cancel_btn {
        background: none;
        border: none;
        position: absolute;
        right: 12%;
        top: 67px;
        cursor: pointer;
      }
      .toggle_cancel_btn > img {
        width: 18px;
        height: 18px;
      }
    }
  }
  @media (min-width: 699px) {
    display: none;
  }
  @media (max-width: 699px) {
    display: block;
    #toggle_menu {
      display: ${(props) => props.display};
    }
    #toggle_btn {
      display: block;
    }
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
  font-size: 1.2em;
  &:hover {
    color: ${Colors.primaryColor};
    transition: 0.2s all;
  }
`;

export const AuthTab = styled.li`
  margin-left: 20px;
  font-weight: bold;
  font-size: 1.2em;
  &:hover {
    cursor: pointer;
    color: ${Colors.primaryColor};
    transition: 0.2s all;
  }
`;
