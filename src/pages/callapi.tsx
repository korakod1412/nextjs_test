import React from "react";
import { useState, useEffect } from "react";

function callApi() {
  interface Cart {
    message: string;
  }
  const [item, setItem] = useState<Cart[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      //  const res = await fetch("/api/mainApi", {
      const res = await fetch("/api/mainAPI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: "xxxx" }),
      });
      const data = await res.json();
      setItem(data);
      //   alert(JSON.stringify(data));
      // console.log(JSON.stringify(data));
    };

    fetchData();
  }, []);

  return (
    <>
    <div>
    {item.map((posts,index) => { 
          return <p key={index}>{posts.message}</p>
        })}
    </div>
     
    </>
  );
}

export default callApi;
