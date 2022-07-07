import AppLayout from "../components/AppLayout";
import { useState, useRef } from "react";
import axios from "axios";

const Test = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    axios
      .post(
        "http://127.0.0.1:3000/users/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const sessionCheck = () => {
    axios
      .get("http://api.petmate.kr", { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <AppLayout>
      이메일
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      비밀번호
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submit}>테스트</button>
      <button onClick={sessionCheck}>세션확인</button>
    </AppLayout>
  );
};

export default Test;
