import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

export const SignUpContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 80%;
  }
`;

export const FormWrapper = styled.div`
  width: 280px;
  margin-bottom: 50px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;

  label {
    font-size: 16px;
    margin-bottom: 10px;
  }

  input {
    height: 40px;
    width: 100%;
    border-radius: 5px;
    border: 0.5px solid ${Colors.btnGray};
  }

  div {
    display: flex;
    justify-content: space-between;
  }

  div > input {
    width: 210px;
  }
`;

export const CheckInput = styled.p`
  padding-top: 10px;
  color: ${(props) => props.color || "black"};
`;

export const ValidBtn = styled.button`
  background-color: #000;
  color: #fff;
  border-radius: 10px;
  width: 70px;
  height: 40px;
  margin-left: 5px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
`;

export const SignupBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  background-color: ${Colors.primaryColor};
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
`;

export const CheckContainer = styled.div`
  display: flex;
  flex-direction: column;
  input {
    background-color: white;
    accent-color: ${Colors.primaryColor};
    cursor: pointer;
    margin-bottom: 10px;
  }
  label {
    font-size: 14px;
  }
`;
