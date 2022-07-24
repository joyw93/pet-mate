import AppLayout from "../../components/AppLayout";
import GoogleProfile from "../../components/MyProfile/GoogleProfile";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { loadProfileRequestAction, loadUserInfoRequestAction } from "../../reducers/user";
import { useEffect } from "react";

const Google = () => {
  const dispatch = useDispatch();
  const { userInfo, setProfileError, setProfileDone } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(loadUserInfoRequestAction());
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.active) {
      dispatch(loadProfileRequestAction())
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
