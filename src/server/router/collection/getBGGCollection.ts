import { Prisma, User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { BggClient } from "boardgamegeekclient";
import { BggThingDto } from "boardgamegeekclient/dist/esm/dto";
import { BggPollDto } from "boardgamegeekclient/dist/esm/dto/concrete/subdto";

const bggClient = BggClient.Create();

const getLabels = (game: BggThingDto): Prisma.LabelCreateInput[] =>
  game.links
    .filter(
      (link) =>
        link.type === "boardgamecategory" || link.type === "boardgamemechanic",
    )
    .map((link) => ({
      id: link.id,
      name: link.value,
      type: link.type,
    }));

const decodeHTMLEntities = (rawStr: string) => {
  return rawStr.replace(
    /&#(\d+);/g,
    (match, dec) => `${String.fromCharCode(dec)}`,
  );
};

const getBGGCollection = async (
  user: User,
): Promise<Prisma.BoardgameCreateInput[] | null> => {
  if (!user.bggUsername) return null;

  const collections = await bggClient.collection.query({
    username: user.bggUsername,
    subtype: "boardgame",
    own: 1,
  });
  if (!collections[0]) return null;

  // TODO: Boardgame expansions
  return (
    await bggClient.thing.query({
      id: collections[0].items.map((i) => i.objectid),
      stats: 1,
    })
  )
    .filter((game) => game.type === "boardgame")
    .map((game) => ({
      id: game.id,
      name: decodeHTMLEntities(game.name),
      year: game.yearpublished,
      image: game.image,
      thumbnail: game.thumbnail,
      description: game.description,
      weight: new Decimal(game.statistics.ratings.averageweight),
      minPlaytime: game.minplaytime,
      maxPlaytime: game.maxplaytime,
      minPlayerCount: game.minplayers,
      maxPlayerCount: game.maxplayers,
      users: { connect: [{ id: user.id }] },
      labels: {
        connectOrCreate: getLabels(game).map((label) => ({
          where: { id: label.id },
          create: label,
        })),
      },
    }));
};

export default getBGGCollection;