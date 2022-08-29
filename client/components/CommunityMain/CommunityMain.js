import {
  CommunityCon,
  Title,
  PostBtn,
  HeadWrapper
} from "./styled";
import { useSelector, useDispatch } from "react-redux";
import CommunityList from "./CommunityList";
import Router from "next/router";
import { useEffect, useState } from "react";
import { communityActions } from '../../store/reducers/community';
import FilterList from './FilterList';
import CommunityNotice from './CommunityNotice';


const CommunityMain = ({ hotPosts }) => {
  const [filterCond, setFilterCond] = useState("new");
  const { me } = useSelector((state) => state.user);
  const { addPostDone } = useSelector((state) => state.community);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addPostDone) {
      dispatch(communityActions.addPostReset());
    }
  }, [addPostDone]);

  const goToNew = () => {
    if (!me) {
      Router.replace("/login");
    } else {
      Router.replace("/community/new");
    }
  };

  const handleListSelect = (e) => {
    const selectedCond = e.target.value;
    if (selectedCond === "최신순") {
      setFilterCond("new");
    } else if (selectedCond === "오래된 순") {
      setFilterCond("old");
    } else if (selectedCond === "조회 순") {
      setFilterCond("views");
    } else {
      setFilterCond("like");
    }
    console.log(e.target.value);
  };


  return (
    <CommunityCon>
      <Title>커뮤니티</Title>
      <HeadWrapper>
        <FilterList onChange={handleListSelect} />
        {me ? (
          <PostBtn onClick={goToNew}>
            <span>글쓰기</span>
          </PostBtn>
        ) : null}
      </HeadWrapper>
      <CommunityNotice hotPosts={hotPosts} />
      <CommunityList filterCond={filterCond} />
    </CommunityCon>
  );
};

export default CommunityMain;
