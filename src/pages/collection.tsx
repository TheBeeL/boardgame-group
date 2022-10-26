import BoardgameGrid from "@components/BoardgameGrid";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

const Games: NextPage = () => {
  const boardgames = trpc.useQuery(["user.getCollection"]);
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
          <BoardgameGrid list={boardgames.data} className="w-full" />
        )}
      </main>
    </>
  );
};

export default Games;
