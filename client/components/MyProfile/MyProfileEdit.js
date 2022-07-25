import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  ProfileContainer,
  ContentArea,
  ProfileEditContent,
  TabWrapper,
  TabList,
} from "./styled";
import { useCallback } from "react";
import ProfileTab from "./ProfileTab";
import AccountTab from "./AccountTab";

const MyProfile = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  return (
    <>
      <ProfileContainer>
        <ContentArea>
          <ProfileEditContent>
            <TabWrapper>
              <TabList>
                <li
                  className={activeIndex === 0 ? "is_active" : ""}
                  onClick={() => tabClickHandler(0)}
                >
                  프로필 설정
                </li>
                <li
                  className={activeIndex === 1 ? "is_active" : ""}
                  onClick={() => tabClickHandler(1)}
                >
                  계정 설정
                </li>
              </TabList>
              {activeIndex === 0 ? <ProfileTab /> : null}
              {activeIndex === 1 ? <AccountTab /> : null}
            </TabWrapper>
          </ProfileEditContent>
        </ContentArea>
      </ProfileContainer>
    </>
  );
};

export default MyProfile;
