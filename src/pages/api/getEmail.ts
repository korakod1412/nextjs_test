import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const users = await prisma.user.findMany({
    where: {
      email: req.body.email,
    },
  });
  if (users.length !== 0) {
    res.json({ status: false }); //duplicate data
  } else {
    res.json({ status: true }); //not duplicate data
  }
}
