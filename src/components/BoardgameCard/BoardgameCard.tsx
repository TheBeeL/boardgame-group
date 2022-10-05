import HoverEffect from "@components/BoardgameCard/HoverEffect";
import { Box, Card, CardContent, CardCover } from "@mui/joy";
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
        <a>
          <Card
            className={`h-full cursor-pointer rounded-none bg-stone-800 p-0`}
          >
            <CardCover>
              <Image
                src={boardgame.thumbnail}
                layout="fill"
                objectFit="contain"
              />
            </CardCover>
            <CardContent className="w-full justify-end bg-gradient-to-t from-black via-transparent pb-2">
              <Box>
                <BoardgameTitle title={boardgame.name} />
              </Box>
            </CardContent>
          </Card>
        </a>
      </Link>
    </HoverEffect>
  );
};

export default BoardgameCard;
