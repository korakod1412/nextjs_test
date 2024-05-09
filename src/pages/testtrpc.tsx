import React, { useState } from "react";
import { api } from "~/utils/api";
function testtrpc() {
    interface helloarray{
        greeting: string;
    }
    const [item, setItem] = useState<helloarray[]>([]);
    const queryHello = async () => {
        const hello = (await api.post.helloarray.useQuery({
            text: "from tRPC",
        }).data) as helloarray[];
        setItem(hello);
    };
    queryHello();
   // const hello=api.post.hello.useQuery({text : "hello"});
 // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  // const mutation = api.post.create.useMutation();

  return (//<div>{hello.data?.greeting}</div>;
    <div>
        {item?.map((item,index) =>{
            return <p key={index}>{item.greeting}</p>
        })}
    </div>

  );
}

export default testtrpc;