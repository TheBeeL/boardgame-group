import HoverEffect from "@components/BoardgameCard/HoverEffect";
import { Boardgame } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import BoardgameTitle from "./BoardgameTitle";

interface BoardgameCardProps {
  boardgame: Boardgame;
  className?: string;
  style?: CSSProperties;
}

const BoardgameCard = ({
  boardgame,
  className = "",
  style,
}: BoardgameCardProps) => {
  return (
    <HoverEffect className={`${className}`}>
      <Link href={`/boardgame/${boardgame.id}`}>
        <a className="card h-full bg-base-300">
          <figure>
            <Image
              src={boardgame.thumbnail}
              layout="fill"
              objectFit="contain"
            />
          </figure>
          <div className="card-body z-10 justify-end bg-gradient-to-t from-black via-transparent p-3">
            <div className="card-title justify-center">
              <BoardgameTitle title={boardgame.name} />
            </div>
          </div>
        </a>
      </Link>
    </HoverEffect>
  );
};

export default BoardgameCard;
