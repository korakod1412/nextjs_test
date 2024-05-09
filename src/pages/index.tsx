import test from 'node:test';
import {useState,useEffect} from 'react';
import {v1,v2,multiply} from "~/components/post_1";
import multiply2 from "~/components/post_2";


import { api } from "~/utils/api";

interface propInfo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const INFO = {id:1,user:"Earth"};
  const [count, setCount] = useState(0);
  const [data,setData] = useState<propInfo[]>([]);

  const incress =() =>  {
    setCount(count+1);
  };

  const decress =() =>  {
    setCount(count-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },

        //  body: JSON.stringify({ data: "xxxx" }),
      });
      const data = await res.json();
      //สามารถแก้ไขค่าข้างในได้เลยตัวอย่าง body 
      //setData({ ...data , body: "testt"});
      setData(data);
    };
     
    let item = data.map((inferno) => {
      return {
        ...inferno,
        test : "5555"
      }
    });
    
    fetchData();
  }, []);

  console.log("v1:" ,v1);
  //const filteredData = data.filter((item) => item.userId === 1);

  return (
      <>
        <p>Hellow={count}</p>
        <p>v1={v1}</p>
        <p>v2={v2}</p> 
        <p>multiply={multiply(6,7)}</p> 
        <p>multiply={multiply2(6,7)}</p>
        <button onClick={incress}>incress</button>&nbsp;
        <button onClick={decress}>decress</button>
        {data.map((posts) => (
        <div key={posts.id}>
          <p>User ID: {posts.userId}</p>
          <p>Title: {posts.title}</p>
          <p>Body: {posts.body}</p>
        </div>
      ))}
      </>
  );
}


