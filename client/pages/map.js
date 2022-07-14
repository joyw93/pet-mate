import AppLayout from "../components/AppLayout";
import Kakaomap from "../components/Kakaomap/Kakaomap";
import { useState } from "react";

const MyMap = () => {
  // const mapKey = process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY;

  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    setPlace(inputText);
    setInputText("");
  };

  return (
    <AppLayout>
      <div>어쩌구</div>
      {/* <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form> */}
      <div className="inputForm">
        <input
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          value={inputText}
        />
        <button onClick={handleSubmit}>검색</button>
      </div>
      <Kakaomap place={place} />
    </AppLayout>
  );
};
export default MyMap;
