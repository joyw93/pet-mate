import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

export const CustomOverlay = styled.div`
  height: 32px;
  padding: 0 14px;
  border-radius: 5px;
  /* background: rgba(252, 157, 3, 0.7); */
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 5px ${Colors.primaryColor};
  position: relative;
  span {
    font-size: 0.9rem;
    font-weight: bold;
    line-height: 32px;
    color: #000;
    padding-right: 9px;

    img {
      width: 24px;
      height: 18px;
      position: absolute;
      right: 0;
      top: 8px;
      opacity: 0.4;
    }
  }
`;
