import styled from "styled-components";
import { Colors } from "../../styles/ColorVariable";

export const ProfileContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const BackgroundArea = styled.div`
  width: 100%;
  height: 598px;
  background-color: ${Colors.profileYellow};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

export const ContentArea = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  padding-top: 60px;
`;
export const UserContent = styled.div`
  max-width: 1200px;
  min-height: 600px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
`;

export const ProfileInfo = styled.div`
  width: 280px;
  height: 480px;
  padding: 60px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImg = styled.div`
  width: 160px;
  height: 160px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    /* border: 1px solid ${Colors.primaryColor}; */
    box-shadow: 0 0 7px ${Colors.primaryColor};
  }
`;
export const UserInfo = styled.div`
  h2 {
    text-align: center;
    margin: 14px 0;
    font-size: 1.4rem;
    font-weight: bold;
  }
  p {
    text-align: center;
    margin: 14px 0;
  }
`;
export const UserFeed = styled.div`
  width: 77%;
  margin-top: 20px;

  .list_wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    p {
      font-size: 1rem;
      margin: 14px 0;
      span {
        margin-right: 5px;
      }
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 80%;
  button {
    margin-top: 15px;
    display: block;
    padding: 7px 0;
    width: 100%;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    background-color: #eee;
    &:hover {
      background-color: #ccc;
      transition: ease-in 0.2s;
    }
  }
`;

export const TabWrapper = styled.div`
  width: 100%;
  padding-top: 30px;
`;

export const TabList = styled.ul`
  display: flex;

  li {
    font-size: 1.1rem;
    font-weight: bold;
    margin-right: 15px;
    padding-bottom: 5px;
    cursor: pointer;
  }
  li.is_active {
    color: ${Colors.primaryColor};
    border-bottom: 2.5px solid ${Colors.primaryColor};
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 28px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const MyPostItem = styled.div`
  width: 210px;
  height: 300px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-right: 20px;
  &:hover {
    opacity: 0.6;
    transition: all 0.1s;
  }
  img {
    width: 210px;
    height: 210px;
    object-fit: cover;
    border-radius: 5px;
  }
  h1 {
    font-size: 1rem;
    margin-top: 5px;
  }
`;

export const ProfileEditContent = styled.div`
  max-width: 520px;
  margin: 0 auto 100px;
  display: flex;
  background-color: #fff;
  padding: 0 20px;
`;

export const ProfileEditArea = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .react-datepicker__day--selected {
    background-color: ${Colors.primaryColor};
    color: #2b2b2b;
  }
  .react-datepicker {
    font-size: 0.8rem;
    padding: 12px;
    border: 1px solid #ddd;
  }
  .react-datepicker__current-month {
    font-size: 13px;
    margin: 5px 0;
  }
  .react-datepicker__day-names {
    margin-top: 18px;
  }

  .react-datepicker__navigation {
    margin-top: 10px;
  }
  .react-datepicker__navigation-icon {
    width: 12px;
    height: 12px;
  }
  .react-datepicker__navigation-icon::before {
    width: 7px;
    height: 7px;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: ${Colors.primaryColor};
    color: #fff;
  }

  .react-datepicker__day--outside-month {
    color: #ccc;
  }

  .react-datepicker__header {
    background-color: #fff;
    padding-top: 10px;
    border: none;
  }
`;

export const Input = styled.input`
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  line-height: 40px;
  height: 40px;
  text-indent: 12px;
  flex-grow: 1;
  width: 100%;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #bdbdbd;
  }
  &:focus {
    border: 1px solid ${Colors.primaryColor};
    box-shadow: 0 0 5px ${Colors.primaryColor};
  }
`;

export const ConfirmButton = styled.button`
  /* margin: 0 auto; */
  width: 100%;
  height: 50px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  color: white;
  background-color: ${Colors.primaryColor};
  border: none;
  opacity: 0.8;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transition: all 0.2s;
  }
`;
export const DeleteAccountButton = styled.button`
  width: 80px;
  height: 28px;
  line-height: 28px;
  text-align: right;
  position: absolute;
  right: 0;
  top: -32px;
  font-weight: bold;
  font-size: 0.9rem;
  color: #999;
  background-color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    color: #555;
    transition: all 0.2s;
  }
`;
export const NicknameValidWrapper = styled.div`
  font-size: 0.9rem;
  position: absolute;
  right: 0;
  bottom: -20px;
`;
export const ValidMessage = styled.div`
  /* color: ${(props) => props.ValidMessage === ""} */
  color: green;
`;

export const InvalidMessage = styled.div`
  color: red;
`;

export const ImageEditWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  position: relative;
  span {
    font-size: 1rem;
    display: block;
    width: 150px;
  }
`;

export const ImageInputArea = styled.label`
  display: block;
  width: 240px;
  height: 240px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transition: all 0.2s;
  }
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ImageHolder = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;
export const ImageDeleteBtn = styled.button`
  width: 28px;
  height: 28px;
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;
  svg {
    fill: #fff;
    line-height: 22px;
    text-align: center;
  }
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50px;
`;
export const GoogleLogin = styled.div`
  width: 500px;
  margin: 0 auto;
`;
export const NicknameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const PasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const PasswordCheckWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 70px;
`;

export const BirthDateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
export const BioWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
export const InputTitle = styled.div`
  span {
    font-size: 1rem;
    display: block;
    width: 200px;
  }
  span:last-child {
    font-size: 0.8rem;
    margin-top: 7px;
    color: #777;
  }
`;

export const AdditionalInfo = styled.h2`
margin-bottom: 50px;`