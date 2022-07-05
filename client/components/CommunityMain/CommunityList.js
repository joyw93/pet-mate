//import { useSelector } from "react-redux";
import CommunityItem from "./CommunityItem";

const DUMMY_POSTS = [
  {
    id: 1,
    title: "못할 희망의 모래뿐일 몸이 미묘한 가진 그들은 보라.",
    content:
      "대중을 착목한는 이상이 곳으로 이상을 아름답고 살았으며, 설레는 아름다우냐? 피어나기 옷을 이상, 있는 것이다.보라, 위하여 보는 어디 보이는 봄바람이다.대중을 착목한는 이상이 곳으로 이상을 아름답고 살았으며, 설레는 아름다우냐? 피어나기 옷을 이상, 있는 것이다.보라, 위하여 보는 어디 보이는 봄바람이다.대중을 착목한는 이상이 곳으로 이상을 아름답고 살았으며, 설레는 아름다우냐? 피어나기 옷을 이상, 있는 것이다.보라, 위하여 보는 어디 보이는 봄바람이다.",
    author_id: 1,
    image_src: "../img/pet1.jpg",
    created_date: new Date().getTime(),
    author: "댕댕이네",
    keyword: ["사료", "어쩌구", "저쩌구"],
  },
  {
    id: 2,
    title: "실현에 우리의 너의 곳으로 목숨이 위하여, 봄바람이다. ",
    content: "못할 희망의 모래뿐일 몸이 미묘한 가진 그들은 보라.",
    author_id: 2,
    image_src: "",
    created_date: new Date().getTime(),
    author: "야옹이네",
    keyword: ["사료", "어쩌구", "저쩌구"],
  },
  {
    id: 3,
    title: "못할 희망의 모래뿐일 몸이 미묘한 가진 그들은 보라.",
    content:
      "대중을 착목한는 이상이 곳으로 이상을 아름답고 살았으며, 설레는 아름다우냐? 피어나기 옷을 이상, 있는 것이다.보라, 위하여 보는 어디 보이는 봄바람이다.",
    author_id: 1,
    image_src: "../img/pet2.jpg",
    created_date: new Date().getTime(),
    author: "댕댕이네",
    keyword: ["사료", "어쩌구", "저쩌구"],
  },
  {
    id: 4,
    title: "실현에 우리의 너의 곳으로 목숨이 위하여, 봄바람이다. ",
    content:
      "얼마나 우는 인생의 아름답고 아니한 반짝이는 것이다. 얼음에 너의 인간의 같이, 동력은 아니다.",
    author_id: 4,
    image_src: "../img/pet1.jpg",
    created_date: new Date().getTime(),
    author: "용원이네",
    keyword: ["사료", "어쩌구", "저쩌구"],
  },
  {
    id: 5,
    title: "못할 희망의 모래뿐일 몸이 미묘한 가진 그들은 보라.",
    content:
      "대중을 착목한는 이상이 곳으로 이상을 아름답고 살았으며, 설레는 아름다우냐? 피어나기 옷을 이상, 있는 것이다.보라, 위하여 보는 어디 보이는 봄바람이다.",
    author_id: 3,
    image_src: "../img/pet1.jpg",
    created_date: new Date().getTime(),
    author: "용원이네",
    keyword: ["사료", "어쩌구", "저쩌구"],
  },
  {
    id: 6,
    title: "실현에 우리의 너의 곳으로 목숨이 위하여, 봄바람이다. ",
    content: "대중을 착목한는 이상이 곳으로 이상을 아름답고 살았으며,",
    author_id: 2,
    image_src: "../img/pet2.jpg",
    created_date: new Date().getTime(),
    author: "댕댕이네",
    keyword: ["사료", "어쩌구", "저쩌구"],
  },
  {
    id: 7,
    title: "못할 희망의 모래뿐일 몸이 미묘한 가진 그들은 보라.",
    content:
      "대중을 착목한는 이상이 곳으로 이상을 아름답고 살았으며, 설레는 아름다우냐? 피어나기 옷을 이상, 있는 것이다.보라, 위하여 보는 어디 보이는 봄바람이다.",
    author_id: 1,
    image_src: "../img/pet1.jpg",
    created_date: new Date().getTime(),
    author: "용원이네",
    keyword: ["사료", "어쩌구", "저쩌구"],
  },
  {
    id: 8,
    title: "실현에 우리의 너의 곳으로 목숨이 위하여, 봄바람이다. ",
    content:
      "얼마나 우는 인생의 아름답고 아니한 반짝이는 것이다. 얼음에 너의 인간의 같이, 동력은 아니다.",
    author_id: 4,
    image_src: "../img/pet2.jpg",
    created_date: new Date().getTime(),
    author: "댕댕이네",
    keyword: ["사료", "어쩌구", "저쩌구"],
  },
  {
    id: 9,
    title: "못할 희망의 모래뿐일 몸이 미묘한 가진 그들은 보라.",
    content:
      "대중을 착목한는 이상이 곳으로 이상을 아름답고 살았으며, 설레는 아름다우냐? 피어나기 옷을 이상, 있는 것이다.보라, 위하여 보는 어디 보이는 봄바람이다.",
    author_id: 3,
    image_src: "../img/pet1.jpg",
    created_date: new Date().getTime(),
    author: "댕댕이네",
    keyword: ["사료", "어쩌구", "저쩌구"],
  },
  {
    id: 10,
    title: "실현에 우리의 너의 곳으로 목숨이 위하여, 봄바람이다. ",
    content:
      "설레는 아름다우냐? 피어나기 옷을 이상, 있는 것이다.보라, 위하여 보는 어디 보이는 봄바람이다.",
    author_id: 8,
    image_src: "../img/pet1.jpg",
    created_date: new Date().getTime(),
    author: "용원이네",
    keyword: ["사료", "어쩌구", "저쩌구"],
  },
];

const CommunityList = () => {
  return (
    <>
      {DUMMY_POSTS.map((item) => (
        <CommunityItem key={item.id} {...item} />
      ))}
    </>
  );
};

export default CommunityList;

// {
//   id: 11,
//   title: "못할 희망의 모래뿐일 몸이 미묘한 가진 그들은 보라.",
//   content:
//     "대중을 착목한는 이상이 곳으로 이상을 아름답고 살았으며, 설레는 아름다우냐? 피어나기 옷을 이상, 있는 것이다.보라, 위하여 보는 어디 보이는 봄바람이다.",
//   author_id: 7,
// },
// {
//   id: 12,
//   title: "실현에 우리의 너의 곳으로 목숨이 위하여, 봄바람이다. ",
//   content:
//     "얼마나 우는 인생의 아름답고 아니한 반짝이는 것이다. 얼음에 너의 인간의 같이, 동력은 아니다.",
//   author_id: 6,
// },
// {
//   id: 13,
//   title: "못할 희망의 모래뿐일 몸이 미묘한 가진 그들은 보라.",
//   content:
//     "대중을 착목한는 이상이 곳으로 이상을 아름답고 살았으며, 설레는 아름다우냐? 피어나기 옷을 이상, 있는 것이다.보라, 위하여 보는 어디 보이는 봄바람이다.",
//   author_id: 3,
// },
// {
//   id: 14,
//   title: "실현에 우리의 너의 곳으로 목숨이 위하여, 봄바람이다. ",
//   content:
//     "설레는 아름다우냐? 피어나기 옷을 이상, 있는 것이다.보라, 위하여 보는 어디 보이는 봄바람이다.",
//   author_id: 7,
// },
// {
//   id: 15,
//   title: "못할 희망의 모래뿐일 몸이 미묘한 가진 그들은 보라.",
//   content:
//     "대중을 착목한는 이상이 곳으로 이상을 아름답고 살았으며, 설레는 아름다우냐? 피어나기 옷을 이상, 있는 것이다.보라, 위하여 보는 어디 보이는 봄바람이다.",
//   author_id: 9,
// },
// {
//   id: 16,
//   title: "실현에 우리의 너의 곳으로 목숨이 위하여, 봄바람이다. ",
//   content:
//     "얼마나 우는 인생의 아름답고 아니한 반짝이는 것이다. 얼음에 너의 인간의 같이, 동력은 아니다.",
//   author_id: 4,
// },
