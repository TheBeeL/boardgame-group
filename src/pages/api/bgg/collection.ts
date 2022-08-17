import type { NextApiRequest, NextApiResponse } from "next";
import { BggClient } from "boardgamegeekclient";

const bgg = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = BggClient.Create();
  const collections = await client.collection.query({ username: "BeeL" });
  res.status(200).json(collections);
};

export default bgg;
