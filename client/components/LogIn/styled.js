import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

export const LogInContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  margin-top: 90px;
  margin-bottom: 50px;
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

  p {
    margin-top: 10px;
  }

  p:hover {
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
  width: 100%;
  border-radius: 5px;

  border: 0.5px solid ${Colors.btnGray};
`;

export const MainBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;

  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const LoginBtn = styled(MainBtn)`
  background-color: ${Colors.primaryColor};
`;

export const GoogleBtn = styled(MainBtn)`
  background-color: #fff;
  border: 1px solid #000;
`;

export const KakaoBtn = styled(MainBtn)`
  background-color: #fff;
  border: 2px solid ${Colors.profileYellow};
`;

export const CheckInput = styled.p`
  color: ${(props) => props.color || "black"};
`;
