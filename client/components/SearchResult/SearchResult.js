import { useState } from "react";

import ContentList from "../Sanchaek/ContentList";
import { SearchContainer, NoResultImg } from "./styled";

const SearchResult = () => {
  const [result, setResult] = useState([1]);

  return (
    <SearchContainer>
      <h3>'검색어'의 검색 결과 입니다.</h3>
      {result && result.length === 0 ? (
        <>
          <p>검색 결과가 없습니다. 다른 검색어를 입력하세요.</p>
          <NoResultImg src="../img/no-search-result.png" />
        </>
      ) : (
        <ContentList />
      )}
    </SearchContainer>
  );
};

export default SearchResult;
