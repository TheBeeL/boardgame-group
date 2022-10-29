import BoardgameGrid from "@components/BoardgameGrid";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: library, isLoading } = trpc.useQuery(["boardgame.getAll"]);

  return (
    <>
      <Head>
        <title>Meeplr</title>
        <meta name="description" content="Organise Boardgame games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        {isLoading && <p>...Loading</p>}
        {library && <BoardgameGrid list={library} className="w-full" />}
      </main>
    </>
  );
};

export default Home;
