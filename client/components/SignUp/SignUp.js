import { SignUpContainer, InputWrapper } from "./styled";

const SignUp = () => {
  return (
    <SignUpContainer>
      <h1>로그인</h1>
      <form>
        <InputWrapper>
          <label>이메일</label>
          <input type="email" required></input>
        </InputWrapper>
        <InputWrapper>
          <label>비밀번호</label>
          <input type="password" required></input>
        </InputWrapper>
        <button>로그인</button>
      </form>
    </SignUpContainer>
  );
};

export default SignUp;
