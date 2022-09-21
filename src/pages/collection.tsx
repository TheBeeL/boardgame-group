import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import BoardgameCard from "../components/BoardgameCard";
import { trpc } from "../utils/trpc";

const Games: NextPage = () => {
  const boardgames = trpc.useQuery(["boardgame.getCollection"]);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session && status === "unauthenticated") {
    router.push("/");
  }

  if (!session) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <Head>
        <title>Game List</title>
      </Head>

      <main className="container mx-auto">
        {boardgames.isLoading && <p>...Loading</p>}
        {boardgames.data && (
          <div className="flex w-full flex-row flex-wrap gap-2">
            {boardgames.data.map((bg) => (
              <BoardgameCard
                style={{ maxWidth: "150px" }}
                key={bg.id}
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

export default Games;
