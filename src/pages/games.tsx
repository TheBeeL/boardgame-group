import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import BoardgameCard from "../components/Boardgame";
import LoginButton from "../components/LoginButton";
import { trpc } from "../utils/trpc";

const Games: NextPage = () => {
  const [username, setUsername] = useState<string>();
  const boardgames = trpc.useQuery(["boardgame.getAll"]);
  const loadCollection = trpc.useMutation(["bgg.loadCollection"]);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleClick = () => {
    if (username) {
      loadCollection.mutate({ username });
    }
  };

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
        <LoginButton />
        <div>
          <input
            defaultValue={username}
            className="bg-stone-800"
            onChange={handleChange}
          />
          <button onClick={() => handleClick()}>Load</button>
        </div>
        {loadCollection.isLoading && <p>Loading</p>}
        {loadCollection.isSuccess && <p>Success</p>}
        {loadCollection.isError && <p>Error: {loadCollection.error.message}</p>}
        {boardgames.isLoading && <p>...Loading</p>}
        {boardgames.data && (
          <div className="flex flex-row flex-wrap w-full p-2 gap-2">
            {boardgames.data.map((bg) => (
              <BoardgameCard className="basis-1/12" boardgame={bg} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Games;
