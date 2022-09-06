import { Boardgame } from "@prisma/client";
import Image from "next/image";
import { CSSProperties } from "react";
import BoardgameTitle from "./BoardgameTitle";

interface BoardgameCardProps {
  boardgame: Boardgame;
  className?: string;
  style?: CSSProperties;
}

const BoardgameCard = ({ boardgame, className, style }: BoardgameCardProps) => {
  return (
    <div
      className={`${className} rounded-md flex flex-col overflow-hidden bg-stone-800`}
      style={{ ...style }}
    >
      <div className="relative w-full aspect-square bg-stone-500 overflow-hidden">
        <Image
          src={boardgame.thumbnail}
          layout="fill"
          objectFit="contain"
          width="100%"
          height="100%"
        />
      </div>
      <div className="p-1 border border-stone-500 rounded-b-md border-t-0 grow">
        <BoardgameTitle title={boardgame.name} />
      </div>
    </div>
  );
};

export default BoardgameCard;
