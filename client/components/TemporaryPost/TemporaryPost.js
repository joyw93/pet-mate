import React from 'react';
import { TempWrapper, TempHead, DeleteBtn, ListWrapper, TempTitle, TempPostTitle } from './styled';

const TempList = [
  { id: 0, title: '임시저장 1' },
  { id: 0, title: '임시저장 2' },
  { id: 0, title: '임시저장 3' },
]

const TemporaryPost = () => {

  const handleLoadTemp = () => {
    // 선택한 저장 글에 맞는 임시저장 글 불러오기
  }

  return (
    <TempWrapper>
      <TempHead>
        <TempTitle>총 {TempList.length}개의 임시저장 글</TempTitle>
        <DeleteBtn>전체 삭제</DeleteBtn>
      </TempHead>
      <ul>
        {TempList?.map((list) => (
          <ListWrapper key={list.id} onClick={handleLoadTemp}>
            <TempPostTitle >
              {list.title}</TempPostTitle>
            <DeleteBtn>X</DeleteBtn>
          </ListWrapper>
        ))}
      </ul>
    </TempWrapper>
  )
}

export default TemporaryPost