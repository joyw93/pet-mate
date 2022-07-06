import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  Item,
  SanchaekContainer,
  ItemImage,
  SanchaekBanner,
  SanchaekContent,
  BtnContainer,
} from "./styled";
import Link from "next/link";

const DUMMY_LISTS = [
  {
    id: 1,
    title: "울집 댕댕이랑 산책하실 분 구함",
    content:
      "안녕하세욤 어쩌구 저쩌구 산책하실 분 구해욤 근데 저는 강아지가 없어요......나도 강아지...갱얼지...",
    image: "../img/pet1.jpg",
  },
  {
    id: 2,
    title: "울집 댕댕이랑 산책하실 분 구함2222",
    content:
      "안녕하세욤 어쩌구 저쩌구 산책하실 분 구해욤 근데 저는 강아지가 없어요......나도 강아지...갱얼지...",
    image: "../img/pet2.jpg",
  },
  {
    id: 3,
    title: "울집 댕댕이랑 산책하실 분 구함",
    content:
      "안녕하세욤 어쩌구 저쩌구 산책하실 분 구해욤 근데 저는 강아지가 없어요......나도 강아지...갱얼지...",
    image: "../img/pet3.jpg",
  },
  {
    id: 4,
    title: "울집 댕댕이랑 산책하실 분 구함2222",
    content:
      "안녕하세욤 어쩌구 저쩌구 산책하실 분 구해욤 근데 저는 강아지가 없어요......나도 강아지...갱얼지...",
    image: "../img/pet1.jpg",
  },
  {
    id: 5,
    title: "울집 댕댕이랑 산책하실 분 구함",
    content:
      "안녕하세욤 어쩌구 저쩌구 산책하실 분 구해욤 근데 저는 강아지가 없어요......나도 강아지...갱얼지...",
    image: "../img/pet1.jpg",
  },
  {
    id: 6,
    title: "울집 댕댕이랑 산책하실 분 구함2222",
    content:
      "안녕하세욤 어쩌구 저쩌구 산책하실 분 구해욤 근데 저는 강아지가 없어요......나도 강아지...갱얼지...",
    image: "../img/pet2.jpg",
  },
  {
    id: 7,
    title: "울집 댕댕이랑 산책하실 분 구함",
    content:
      "안녕하세욤 어쩌구 저쩌구 산책하실 분 구해욤 근데 저는 강아지가 없어요......나도 강아지...갱얼지...",
    image: "../img/pet3.jpg",
  },
  {
    id: 8,
    title: "울집 댕댕이랑 산책하실 분 구함2222",
    content:
      "안녕하세욤 어쩌구 저쩌구 산책하실 분 구해욤 근데 저는 강아지가 없어요......나도 강아지...갱얼지...",
    image: "../img/pet1.jpg",
  },
];

const SanchaekMain = () => {
  return (
    <SanchaekContainer>
      <SanchaekBanner>
        <Link href="/">
          <a>
            <img src="../img/sanchaekbanner.png" />
          </a>
        </Link>
      </SanchaekBanner>
      <SanchaekContent>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          >
            {DUMMY_LISTS.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Item key={item.id}>
                  <ItemImage src={item.image} />
                  <h2>{item.title}</h2>
                  <span>{item.content}</span>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
        <BtnContainer>
          <span></span>
          <button>더보기</button>
        </BtnContainer>
      </SanchaekContent>
    </SanchaekContainer>
  );
};

export default SanchaekMain;
