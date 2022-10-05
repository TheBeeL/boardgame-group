import { Typography } from "@mui/joy";
import { trpc } from "@utils/trpc";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const BoardgamePage = () => {
  const { query } = useRouter();
  const id = parseInt(query.id as string);
  const {
    data: boardgame,
    isLoading,
    isError,
    isSuccess,
  } = trpc.useQuery(["boardgame.get", { id }]);

  if (isLoading || !boardgame) return <div>...Loading</div>;

  return (
    <>
      <Head>
        <title>{boardgame.name}</title>
      </Head>

      <main className="container mx-auto mt-6">
        <div className="flex gap-6">
          <div className="relative aspect-square grow overflow-hidden rounded-xl border border-stone-500">
            <Image src={boardgame.image} layout="fill" objectFit="contain" />
          </div>
          <div className="basis-2/3">
            <Typography level="display2" className="-mt-3 mb-3">
              {boardgame.name}
            </Typography>
            <Typography level="body1" className="whitespace-pre-wrap">
              <span
                dangerouslySetInnerHTML={{ __html: boardgame.description }}
              />
            </Typography>
          </div>
        </div>
      </main>
    </>
  );
};

export default BoardgamePage;
