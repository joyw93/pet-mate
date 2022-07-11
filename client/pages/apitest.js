import AppLayout from "../components/AppLayout";
import { useState, useRef } from "react";
import axios from "axios";

const Test = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [FileImages, setFileImages] = useState([]);
  const [images, setImages] = useState([]);

  const submit = (e) => {
    axios
      .post(
        "http://127.0.0.1:3000/user/login",
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
      .get("http://127.0.0.1:3000/user/session", { withCredentials: true })
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
      .post("http://127.0.0.1:3000/community", body, {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const postType = {
    id: 1,
    author: "용용원",
    title: "저희집 댕댕이를 보세요",
    like: 0,
    view: 0,
    content: "정말 귀엽쥬? ㅋ",
    createdAt: "2022.03.17",
    images: ["http://image1", "http://image2", "http://image3"],
    tags: ["강아지", "댕댕이", "귀여움"],
    comments: [
      {
        author: "곽곽이",
        content: "댕댕이가 귀엽네요",
        createdAt: "2022.03.18"
      },
      {
        author: "유경손",
        content: "정말 부럽군요",
        createdAt: "2022.03.18"
      }
    ],
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
      <form>
        <input />
      </form>
    </AppLayout>
  );
};

export default Test;
