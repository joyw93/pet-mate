import AppLayout from "../components/AppLayout";

const NotFound = () => {
  return (
    <AppLayout>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", flexDirection: "column" }}>
        <img style={{ width: "400px" }} src="../img/404.png" alt="" />
        <h1>요청하신 페이지를 찾을 수 없습니다!</h1>
      </div>
    </AppLayout>
  );
};
export default NotFound;
