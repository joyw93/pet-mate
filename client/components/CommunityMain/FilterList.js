import { Selection } from "./styled";

const SelectOptions = [
  { id: "latest", name: "최신순" },
  { id: "oldest", name: "오래된 순" },
  { id: "view", name: "조회 순" },
  { id: "like", name: "좋아요 순" },
];

const FilterList = ({ onChange }) => {

  return (
    <Selection onChange={onChange}>
      {SelectOptions.map((item) => (
        <option key={item.id}>{item.name}</option>
      ))}
    </Selection>
  );
};

export default FilterList;