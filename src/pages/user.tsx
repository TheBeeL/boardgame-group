import {
  Avatar,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/joy";
import getInitials from "@utils/getInitials";
import { trpc } from "@utils/trpc";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

const UserPage: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => router.push("/"),
  });
  const { data: user } = trpc.useQuery(["user.get"]);
  const { mutate: syncCollection, isLoading: isSyncing } = trpc.useMutation([
    "collection.syncCollection",
  ]);

  if (!session || !user) return <div>...Loading</div>;

  return (
    <>
      <Head>
        <title>User Page</title>
      </Head>

      <main className="container mx-auto">
        <div className="mx-auto mt-5 flex max-w-lg flex-col rounded-lg border border-stone-500 p-3">
          <div className="flex gap-5 p-3">
            <Avatar src={user.image || undefined}>
              {getInitials(user.name || undefined)}
            </Avatar>
            <Typography level="h2">{user.name}</Typography>
          </div>
          <hr className="my-5 border-stone-500" />
          <div className="flex items-end justify-between gap-2">
            <TextField
              label="Boardgame Geek Username"
              placeholder="Inserire qui..."
              defaultValue={user.bggUsername || undefined}
            />
            <Button
              className="bg-blue-500"
              onClick={() => syncCollection()}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <>
                  <CircularProgress />
                  Loading
                </>
              ) : (
                <>Sync</>
              )}
            </Button>
          </div>
          {/* <hr className="my-5 border-stone-500" />
          <Button className="self-end bg-blue-500">Save</Button> */}
        </div>
      </main>
    </>
  );
};

export default UserPage;
