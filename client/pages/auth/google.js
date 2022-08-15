import AppLayout from "../../components/AppLayout";
import GoogleProfile from "../../components/MyProfile/GoogleProfile";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { useEffect } from "react";
import { userActions } from '../../store/reducers/user';

const Google = () => {
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
        <GoogleProfile />
      </AppLayout>
    </>
  );
};

export default Google;
