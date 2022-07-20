import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";

import CommunityItem from "../CommunityMain/CommunityItem";
import { SearchContainer, NoResultImg, ListContainer, BtnContainer } from "./styled";

import { loadHashtagPostsRequestAction } from "../../reducers/search";
import { useDispatch, useSelector } from "react-redux";

const SearchResult = () => {
  const [list, setList] = useState([]);
  const searchPosts = useSelector((state) => state.search.searchPosts);
  const loadHashtagPostsDone = useSelector((state) => state.search);
  const router = useRouter();
  const { keyword } = router.query;
  const dispatch = useDispatch();

  console.log(keyword);

  useLayoutEffect(() => {
    if (router.isReady) {
      dispatch(loadHashtagPostsRequestAction(keyword));
    }
  }, [router.isReady]);

  return (
    <SearchContainer>
      <h3>{`'${keyword}'의 검색 결과 입니다.`}</h3>
      {searchPosts && searchPosts.length === 0 ? (
        <>
          <p>검색 결과가 없습니다. 다른 검색어를 입력하세요.</p>
          <NoResultImg src="../img/no-search-result.png" />
        </>
      ) : (
        <>
          {searchPosts && (
            <ListContainer>
              {searchPosts && searchPosts.map((item) => <CommunityItem key={item.id} {...item} />)}
              {/* <BtnContainer>
                <span></span>
                <button onClick={handleMorePosts}>더보기</button>
              </BtnContainer> */}
            </ListContainer>
          )}
        </>
      )}
    </SearchContainer>
  );
};

export default SearchResult;
