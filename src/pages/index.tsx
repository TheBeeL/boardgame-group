import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Meeplr</title>
        <meta name="description" content="Organise Boardgame games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto"></main>
    </>
  );
};

export default Home;
