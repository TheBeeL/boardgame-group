import BoardgameGrid from "@components/BoardgameGrid";
import Head from "next/head";
import { prisma } from "./../server/db/client";

const Home = async () => {
  const library = await prisma.boardgame.findMany({
    where: { users: { some: {} } },
    orderBy: [{ name: "asc" }],
  });

  return (
    <>
      <Head>
        <title>Meeplr</title>
        <meta name="description" content="Organise Boardgame games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        {library && <BoardgameGrid list={library} className="w-full" />}
      </main>
    </>
  );
};

export default Home;
