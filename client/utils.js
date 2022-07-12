import axios from "axios";

export const getElapsedTime = (createdAt) => {
  const ParsedTime = Date.parse(createdAt);
  const currentTime = new Date().getTime();
  const diffTime = currentTime - ParsedTime;

  const second = parseInt(diffTime / 1000);
  const minute = parseInt(second / 60);
  const hour = parseInt(minute / 60);
  const day = parseInt(hour / 24);
  const month = parseInt(day / 30);
  const year = parseInt(month / 12);

  if (year >= 1) {
    return `${year}년 전`;
  } else if (month >= 1) {
    return `${month}달 전`;
  } else if (day >= 1) {
    return `${day}일 전`;
  } else if (hour >= 1) {
    return `${hour}시간 전`;
  } else if (minute >= 1) {
    return `${minute}분 전`;
  } else {
    return "방금";
  }
};
