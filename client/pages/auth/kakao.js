import AppLayout from "../../components/AppLayout";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { useEffect } from "react";
import KakaoProfile from "../../components/MyProfile/KakaoProfile";
import { userActions } from '../../store/reducers/user';

const Kakao = () => {
  const dispatch = useDispatch();
  const { userInfo, setProfileError, setProfileDone } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(userActions.loadUserInfoRequest());
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.active) {
      dispatch(userActions.loadMyProfileRequest());
    }
  }, [userInfo]);

  return (
    <>
      <AppLayout>
        <KakaoProfile />
      </AppLayout>
    </>
  );
};

export default Kakao;
