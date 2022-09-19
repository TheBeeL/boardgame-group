import { AspectRatio, Box, Card, CardOverflow } from "@mui/joy";
import { Boardgame } from "@prisma/client";
import Image from "next/image";
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
    <Card className={`${className} bg-stone-800`}>
      <CardOverflow>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <Image
            src={boardgame.thumbnail}
            layout="fill"
            objectFit="contain"
            width="100%"
            height="100%"
          />
        </AspectRatio>
      </CardOverflow>
      <Box>
        <BoardgameTitle title={boardgame.name} />
      </Box>
    </Card>
  );
};

export default BoardgameCard;
