import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
const useAuthenticatedSession = async () => {
  const { data: select, isLoading } = await api.crud.select.useQuery({
    name: "",
  });
  console.log(JSON.stringify(select));
  return select;
};

export default useAuthenticatedSession;
