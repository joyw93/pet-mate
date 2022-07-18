import { useEffect } from "react";
import { useState } from "react";
import AppLayout from "../../../components/AppLayout";
import CommunityPost from "../../../components/CommunityPost/CommunityPost";

const EditPage = () => {
  const [editState, setEditState] = useState(false);
  useEffect(() => {
    setEditState(true);
  }, []);
  return (
    <AppLayout>
      <CommunityPost editState={editState} />
    </AppLayout>
  );
};

export default EditPage;
