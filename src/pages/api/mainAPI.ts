import type { NextApiRequest, NextApiResponse } from "next";
interface Cart {
  message: string;
}
//export default async (
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Cart[]>,
) {

    const item : Cart[] = [];
  const data = req.body;
  console.log(data);
  for (let i = 0; i < 50; i++) {
    item.push({ message: `zzz_"${i}` });
  }

  console.log("show data");
  console.log(item);
  if (req.method === "POST") {
    res.json(item);
  } else if (req.method === "GET") {
    res.json(item);
  } else {
  //  res.json({ message: "no" });
  }

}
