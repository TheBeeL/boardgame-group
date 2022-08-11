import type { NextApiRequest, NextApiResponse } from "next";
import { BggClient } from "boardgamegeekclient";

const bgg = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = BggClient.Create();
  const games = await client.thing.query({ id: 285967, stats: 1, versions: 1 });
  res.status(200).json(games);
};

export default bgg;
