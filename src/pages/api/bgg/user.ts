import type { NextApiRequest, NextApiResponse } from "next";
import { BggClient } from "boardgamegeekclient";

const bgg = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = BggClient.Create();
  const users = await client.user.query({ name: "BeeL" });
  res.status(200).json(users);
};

export default bgg;
