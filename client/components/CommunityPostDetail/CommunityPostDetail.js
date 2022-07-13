import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  PostDetailContainer,
  Images,
  Title,
  PostInfo,
  KeywordWrapper,
  CommentWrapper,
  Button,
} from "./styled";
import { getElapsedTime } from "../../utils";


const CommunityPostDetail = () => {
  const [cmtContent, setCmtContent] = useState("");
  const [cmtContentArr, setCmtContentArr] = useState([]);
  const [like, setLike] = useState("../img/heart2.png");

  const postItem = {
    id: "1",
    title: "울집 댕댕이랑 산책하실 분 구함",
    author: "댕댕이네",
    created_time: '2022-07-10T00:33:58.241Z',
    src: ["../img/pet1.jpg", "../img/pet2.jpg", "../img/pet3.jpg"],
    content: `아니글쎄 우리 댕댕이가~~어쩌구 저쩌구~~~~~~~ 
    보이는 역사를 이상의 듣기만 봄바람을 능히 고동을 평화스러운 있으랴? 구하지 보배를 있는 사막이다. 보이는 역사를 이상의 듣기만 봄바람을 능히 고동을 평화스러운 있으랴? 구하지 보배를 있는 사막이다.보이는 역사를 이상의 듣기만 봄바람을 능히 고동을 평화스러운 있으랴? 구하지 보배를 있는 사막이다. 보이는 역사를 이상의 듣기만 봄바람을 능히 고동을 평화스러운 있으랴? 구하지 보배를 있는 사막이다.보이는 역사를 이상의 듣기만 봄바람을 능히 고동을 평화스러운 있으랴? 구하지 보배를 있는 사막이다. 보이는 역사를 이상의 듣기만 봄바람을 능히 고동을 평화스러운 있으랴? 구하지 보배를 있는 사막이다. `,
    map: {
      lat: 37.5207,
      lng: 127.012304,
    },
    comments: [...cmtContentArr],
    hashtag: [
      {
        id: "111",
        keyword: "사료",
      },
      {
        id: "222",
        keyword: "어쩌고",
      },
      {
        id: "333",
        keyword: "무엇이든 물어보세요",
      },
    ],
  };

  //carousel
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleCmtContent = useCallback(() => {
    if (cmtContent) {
      setCmtContentArr([
        ...cmtContentArr,
        {
          id: new Date().getTime(),
          author: "멍멍아 야옹해봐",
          content: cmtContent,
        },
      ]);
    }
    setCmtContent("");
  }, [cmtContent]);

  // const handleDeleteCmt = (id) => {
  //   setCmtContentArr(cmtContentArr.filter((it) => it.id !== id));
  // };

  const keyUp = useCallback(
    (e) => {
      if (e.keyCode === 13 && e.target.value.trim() !== "") {
        if (cmtContent) {
          setCmtContentArr([
            ...cmtContentArr,
            {
              id: new Date().getTime(),
              author: "멍멍아 야옹해봐",
              content: cmtContent,
            },
          ]);
        }
        setCmtContent("");
      }
    },
    [cmtContent]
  );

  useEffect(() => {
    console.log(cmtContentArr);
  }, [cmtContentArr]);

  const handleLike = useCallback(() => {
    if (like === "../img/heart2.png") {
      setLike("../img/filled_heart2.png");
    } else if (like === "../img/filled_heart2.png") {
      setLike("../img/heart2.png");
    }
  }, [like]);

  return (
    <PostDetailContainer>
      <h1>커뮤니티</h1>
      <Title>
        <h2>{postItem.title}</h2>
        <div>
          <Link href={"/walking-mate/post"}>
            <Button>수정</Button>
          </Link>
          <Button>삭제</Button>
        </div>
      </Title>
      <PostInfo>
        <div>
          <span id="post_author">{postItem.author}</span>
          <span id="post_created_time">{getElapsedTime(postItem.created_time)}</span>
        </div>
        <button onClick={handleLike}>
          <img src={like} alt="좋아요" />
        </button>
      </PostInfo>
      <div id="content">
        <Images>
          <Slider {...settings}>
            {postItem.src.map((image, index) => (
              <div key={index}>
                <img src={image} alt="이미지" />
              </div>
            ))}
          </Slider>
        </Images>
        <div id="content_text">
          <p>{postItem.content}</p>
        </div>
        <KeywordWrapper>
          <div id="keyword_area">
            <button className="keyword_item">
              <span>사료</span>
            </button>
            <button className="keyword_item">
              <span>어쩌고</span>
            </button>
            <button className="keyword_item">
              <span>무엇이든 물어보세요</span>
            </button>
          </div>
        </KeywordWrapper>
        <CommentWrapper>
          <h2>
            댓글 <span>{postItem.comments.length}</span>
          </h2>
          <div id="cmt_input">
            <input
              onKeyUp={keyUp}
              onChange={(e) => setCmtContent(e.target.value)}
              value={cmtContent}
              type="text"
              placeholder="댓글을 남겨보세요."
            />
            <Button onClick={handleCmtContent}>입력</Button>
          </div>
          <div id="cmts_area">
            {postItem.comments.reverse().map((comment, index) => (
              <div key={index} className="cmts">
                <h3>{comment.author}</h3>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </CommentWrapper>
      </div>
    </PostDetailContainer>
  );
};

export default CommunityPostDetail;
