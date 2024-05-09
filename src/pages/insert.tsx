import { api } from "~/utils/api";
import { useEffect } from "react";

function inserttest() {
    const insert = api.post.create.useMutation();



    useEffect(() => {
        const insertData = async () => {
            insert.mutate({ name: "Korakod", email: "korakod1@gmail.com" });
        };
        insertData();
    }, []);
};
export default inserttest;