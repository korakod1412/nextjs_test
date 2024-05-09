import { api } from "~/utils/api"; 
import { useEffect } from "react";

function inserttest(){
    const update = api.post.update.useMutation();



useEffect(() =>{
    const insertData = async () =>{
    update.mutate({
        nameEdit: "Korakod"
    });
    };
    insertData();
},[]);
};
export default inserttest;