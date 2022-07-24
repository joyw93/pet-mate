import { useEffect } from "react";
import { useState } from "react";
import AppLayout from "../../../components/AppLayout";
import SanchaekPost from "../../../components/SanchaekPost/SanchaekPost";

const SanchaekEditPage = () => {
  const [editState, setEditState] = useState(false);
  useEffect(() => {
    setEditState(true);
  }, []);
  return (
    <AppLayout>
      <SanchaekPost editState={editState} />
    </AppLayout>
  );
};

export default SanchaekEditPage;
