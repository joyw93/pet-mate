import AppLayout from "../components/AppLayout";
import { useState, useRef } from "react";
import axios from "axios";

const Test = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [FileImages, setFileImages] = useState([]);
  const [images, setImages] = useState([]);

  const serverUrl = "http://api.petmate.kr";

  const sessionCheck = () => {
    axios
      .get(`${serverUrl}/user/session`, { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleAddImages = (e) => {
    const imagesFile = e.target.files[0];
    const temp = [...images];
    temp.push(imagesFile);
    setImages(temp);
  };

  const post = async (e) => {
    const body = new FormData();
    body.append("title", title);
    body.append("content", content);
    body.append("hashtags", "cc");
    body.append("hashtags", "d");
    [].forEach.call(images, (img) => {
      body.append("images", img);
    });

    await axios
      .post(`${serverUrl}/community`, body, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <AppLayout>
      <button onClick={sessionCheck}>세션확인</button>
      <div>
        <h1>로그인</h1>
        <span>이메일</span>
        <input
          type="email"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span>비밀번호</span>
        <input
          type="password"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        제목
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        내용
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <input type="file" onChange={handleAddImages} />
      <button onClick={post}>제출</button>
    </AppLayout>
  );
};

export default Test;
