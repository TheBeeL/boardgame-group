import MutationButton from "@components/MutationButton";
import { trpc } from "@utils/trpc";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const UserPage: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => router.push("/"),
  });
  const { data: user } = trpc.useQuery(["user.get"]);
  const syncCollection = trpc.useMutation(["user.syncBGGCollection"]);
  const userUpdateMutation = trpc.useMutation(["user.update"]);
  const [bggUsername, setBggUsername] = useState(user?.bggUsername);

  if (!session || !user) return <div>...Loading</div>;

  return (
    <>
      <Head>
        <title>User Page</title>
      </Head>

      <main className="container mx-auto">
        <div className="mx-auto mt-5 flex max-w-lg flex-col rounded-lg border border-stone-500 p-3">
          <div className="flex gap-5 p-3">
            {user.image && (
              <div className="avatar aspect-square w-10 overflow-hidden rounded-full">
                <Image src={user.image} alt="User avatar" fill sizes="100vw" />
              </div>
            )}
            <h2 className="text-2xl">{user.name}</h2>
          </div>
          <hr className="my-5 border-stone-500" />
          <div className="flex items-end justify-between gap-2">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Boardgame Geek Username</span>
              </label>
              <input
                type="text"
                placeholder="Inserire qui..."
                className="input input-bordered w-full max-w-xs bg-neutral-focus"
                defaultValue={user.bggUsername || undefined}
                onChange={({ target: { value } }) => setBggUsername(value)}
              />
            </div>

            <MutationButton mutation={syncCollection}>Sync</MutationButton>
          </div>
          <hr className="my-5 border-stone-500" />
          <MutationButton
            mutation={userUpdateMutation}
            data={{ bggUsername }}
            className="self-end"
          >
            Save
          </MutationButton>
        </div>
      </main>
    </>
  );
};

export default UserPage;
