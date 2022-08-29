import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import MyProfile from "../../components/MyProfile/MyProfile";

const ProfilePage = () => {
  return (
    <>
      <head>
        <title>프로필 | 펫메이트</title>
      </head>
      <AppLayout>
        <MyProfile />
      </AppLayout>
    </>
  );
};
export default ProfilePage;
