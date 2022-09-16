import styled from 'styled-components';
import { Colors } from "../../styles/ColorVariable";

export const TempWrapper = styled.div`
  position: absolute;
  right:0;
  top:40px;
  width: 250px;
  /* background-color: #fffae5; */
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    /* border: ${Colors.btnGray} 1px solid; */
  padding: 10px 20px;
  background-color: white;
`;

export const TempHead = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 5px auto;
`;

export const TempTitle = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
  
`;

export const DeleteBtn = styled.button`
  border:none;
  background-color: transparent;
  color: ${Colors.btnGray};
  font-weight: bold;
  cursor: pointer;
`;

export const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 5px;
`;

export const TempPostTitle = styled.span`
  font-size: 0.8rem;
  cursor: pointer;
`