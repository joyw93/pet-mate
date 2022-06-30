import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

export const ProfileContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const BackgroundArea = styled.div`
  width: 100%;
  height: 598px;
  background-color: ${Colors.profileYellow};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

export const ContentArea = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  padding-top: 60px;
`;

export const UserContent = styled.div`
  width: 1200px;
  min-height: 600px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;

  /* profile_info */

  #profile_info {
    width: 280px;
    height: 480px;
    padding: 60px;
  }

  #profile_img {
    width: 160px;
    height: 160px;
    margin: 0 auto;
  }
  #profile_img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid ${Colors.primaryColor};
  }
  #user_info h2,
  #user_info p {
    text-align: center;
    margin: 14px 0;
  }
  #user_info h2 {
    font-size: 1.4rem;
    font-weight: bold;
  }
  #user_feed {
    margin-top: 40px;
  }
  #user_feed p {
    font-size: 1.2rem;
    margin: 18px 0;
  }
  #user_feed span {
    float: right;
  }

  /* tab */

  #tab {
    width: 100%;
    padding-top: 30px;
  }
  #tab_lists {
    display: flex;
  }
  #tab_lists li {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 15px;
    padding-bottom: 5px;
    cursor: pointer;
  }
  #tab_lists li#is_active {
    color: ${Colors.primaryColor};
    border-bottom: 2.5px solid ${Colors.primaryColor};
  }

  #tabConBox {
    width: 100%;
    padding-top: 28px;
    display: flex;
    flex-wrap: wrap;
  }
`;
