import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { BggClient } from "boardgamegeekclient";
import { BggThingDto } from "boardgamegeekclient/dist/esm/dto";
import { link } from "fs";
import { decode } from "html-entities";

const bggClient = BggClient.Create();

export const getUserCollection = async (username: string) => {
  const collection_query = await bggClient.collection.query({
    subtype: "boardgame",
    own: 1,
    username,
  });
  if (!collection_query[0]) return null;
  const id_list = collection_query[0].items.map((i) => i.objectid);

  return (await bggClient.thing.query({ id: id_list, stats: 1 }))
    .filter((dto) => dto.type === "boardgame")
    .map(parseBggDTO);
};

function parseBggDTO(dto: BggThingDto): Prisma.BoardgameCreateInput {
  return {
    id: dto.id,
    name: decode(dto.name),
    year: dto.yearpublished,
    image: dto.image,
    thumbnail: dto.thumbnail,
    description: decode(dto.description),
    weight: new Decimal(dto.statistics.ratings.averageweight),
    minPlaytime: dto.minplaytime,
    maxPlaytime: dto.maxplaytime,
    minPlayerCount: dto.minplayers,
    maxPlayerCount: dto.maxplayers,
    labels: {
      connectOrCreate: parseLabels(dto).map((label) => ({
        where: { id: label.id },
        create: label,
      })),
    },
  };
}

function parseLabels(dto: BggThingDto): Prisma.LabelCreateInput[] {
  return dto.links
    .filter(
      (link) =>
        link.type === "boardgamecategory" || link.type === "boardgamemechanic",
    )
    .map((link) => ({
      id: link.id,
      name: link.value,
      type: link.type,
    }));
}
