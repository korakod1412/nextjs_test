import { api } from "~/utils/api"; 
import { useEffect } from "react";

function inserttest(){
    const { data: select, isLoading } = api.post.select.useQuery({
        name: "samphao@gmail.com",
      });



/*useEffect(() =>{
    const insertData = async () =>{
        select.useQuery({
        nameEdit: "Korakod"
    });
    };
    insertData();
},[]);*/

if (isLoading) return <div>Loading...</div>;
if (!select || select.length === 0) {
  return <div>No announcement found.</div>;
}

return (
  <div className="">
    {select.map((item, id) => (
      <p key={id}>{item.name}xx</p>
    ))}
  </div>
);
};
export default inserttest;