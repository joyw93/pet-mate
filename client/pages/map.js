import AppLayout from "../components/AppLayout";
import { useState } from "react";
import { useEffect } from "react";
import Kakaomap from "../components/Kakaomap/Kakaomap";

const MyMap = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const handleSubmit = () => {
    setPlace(inputText);
  };

  return (
    <AppLayout>
      <div className="inputForm">
        <input
          placeholder="검색어를 입력하세요"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        <button onClick={handleSubmit}>검색</button>
      </div>

      <Kakaomap place={place} />
    </AppLayout>
  );
};
export default MyMap;
