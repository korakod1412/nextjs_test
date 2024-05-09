import React from "react";
import { api } from "~/utils/api";
function testtrpc() {
    const { data: test } = api.post.helloarray.useQuery({
      text: "from tRPC",
    });
  return (
    <div>
      {test?.map((item, index) => {
        return <div key={index}>{item.greeting}</div>;
      })}
    </div>
  );
}
export default testtrpc;