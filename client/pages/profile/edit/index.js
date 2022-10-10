import MyProfileEdit from "../../../components/MyProfile/MyProfileEdit";
import AppLayout from "../../../components/AppLayout";
import Head from 'next/head';

const ProfileEditPage = () => {
  return (
    <>
      <Head>
        <title>프로필 수정 | 펫메이트</title>
      </Head>
      <AppLayout>
        <MyProfileEdit />
      </AppLayout>
    </>
  );
};
export default ProfileEditPage;
