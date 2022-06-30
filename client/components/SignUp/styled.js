import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

export const BoxContainer = styled.div``;
export const SignUpContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  margin-top: 90px;
  background-color: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 3px solid ${Colors.primaryColor};
    display: inline-block;
    margin-bottom: 50px;
  }

  form {
    width: 250px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 30px;
  width: 100%;

  label {
    font-size: 16px;
    margin-bottom: 10px;
  }

  input {
    height: 40px;
    width: 250px;
  }
`;
