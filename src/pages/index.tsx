import BoardgameCard from "@components/BoardgameCard";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: library, isLoading } = trpc.useQuery(["library.getAll"]);

  return (
    <>
      <Head>
        <title>Meeplr</title>
        <meta name="description" content="Organise Boardgame games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        {isLoading && <p>...Loading</p>}
        {library && (
          <div className="flex w-full flex-row flex-wrap gap-2">
            {library.map((bg) => (
              <BoardgameCard
                key={bg.id}
                style={{ maxWidth: "150px" }}
                className="grow basis-44"
                boardgame={bg}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
