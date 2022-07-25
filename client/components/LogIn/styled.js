import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

export const LogInContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    padding-top: 50px;
    padding-bottom: 5px;
    border-bottom: 3px solid #fb9b03;
    display: inline-block;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 30px;
  }
`;

export const GotoSignup = styled.div`
  margin-top: 12px;
  text-align: center;
  a {
    font-size: 0.8rem;
  }

  &:hover span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const FormWrapper = styled.div`
  width: 280px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 30px;
  width: 100%;

  label {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const UserInput = styled.input`
  height: 40px;
  line-height: 40px;
  width: 100%;
  border-radius: 5px;
  padding-left: 10px;
  border: 0.5px solid ${Colors.btnGray};
`;

export const MainBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const LoginBtn = styled(MainBtn)`
  background-color: ${Colors.primaryColor};
  font-size: 0.8rem;
  color: #fff;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    transition: all 0.2s;
  }
`;

export const SnsLogin = styled.p`
  font-size: 0.6rem;
  text-align: center;
  margin: 30px 0 15px;
  color: #666;
`;

export const SnsLoginBtns = styled.div`
  display: flex;
  justify-content: center;
`;

export const GoogleBtn = styled.button`
  background-color: #fff;
  width: 48px;
  height: 48px;
  border: 2px solid #ddd;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 20px;
  img {
    width: 60%;
    height: 60%;
    text-align: center;
  }
  &:hover {
    opacity: 0.6;
    transition: all 0.2s;
  }
`;
export const KakaoBtn = styled.button`
  background-color: #ffda00;
  width: 48px;
  height: 48px;
  border: 2px solid #ffda00;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  cursor: pointer;
  img {
    width: 60%;
    height: 60%;
    text-align: center;
  }
  &:hover {
    opacity: 0.6;
    transition: all 0.2s;
  }
`;

export const CheckInput = styled.p`
  color: ${(props) => props.color || "black"};
`;

export const SnackBarContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 50px;
  background-color: #2f3438;
  color: white;
  border-radius: 7px;
  font-size: 14px;
  opacity: 0.5;
`;
