import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import MyProfile from "../../components/MyProfile/MyProfile";

const ProfilePage = () => {
  return (
    <>
      <Head>
        <title>프로필 | 펫메이트</title>
      </Head>
      <AppLayout>
        <MyProfile />
      </AppLayout>
    </>
  );
};
export default ProfilePage;
