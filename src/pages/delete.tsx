import { api } from "~/utils/api";
import { useEffect } from "react";

function inserttest() {
  const deleteTaskMutation = api.post.delete.useMutation();
  const handleDeleteTask = (id: number) => {
    deleteTaskMutation.mutate(
      { id: id },
      {
        onSuccess: () => {
          // handle success
        },
      },
    );
  };



  useEffect(() => {
    const insertData = async () => {
      deleteTaskMutation.mutate({
        nameEdit: "korakod"
      });
    };
    handleDeleteTask(1);
    insertData();
  }, []);
};
export default inserttest;