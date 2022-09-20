import { AspectRatio, Box, Card, CardOverflow } from "@mui/joy";
import { Boardgame } from "@prisma/client";
import { useGesture } from "@use-gesture/react";
import Image from "next/image";
import { CSSProperties, useRef } from "react";
import { useSpring, animated, to } from "react-spring";
import BoardgameTitle from "./BoardgameTitle";

const calcX = (y: number, ly: number) =>
  -(y - ly - window.innerHeight / 2) / 20;
const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 20;

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
  const ref = useRef<HTMLDivElement>(null);
  const [{ rotateX, rotateY, rotateZ, scale, zoom }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zoom: 0,
    config: {
      mass: 5,
      tension: 350,
      friction: 40,
    },
  }));

  useGesture(
    {
      onMove: ({ event: { clientX, clientY } }) => {
        if (!ref.current) return;
        const { top, left, height, width } =
          ref.current.getBoundingClientRect();

        api({
          rotateX: -(clientY - (top + height / 2)) / 15,
          rotateY: (clientX - (left + width / 2)) / 15,
          scale: 1.1,
        });
      },
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { target: ref, eventOptions: { passive: false } },
  );

  return (
    <animated.div
      ref={ref}
      className={`${className} hover:z-10 hover:shadow`}
      style={{
        transform: "perspective(600px)",
        scale: to([scale, zoom], (s, z) => s + z),
        rotateX,
        rotateY,
        rotateZ,
      }}
    >
      <Card className={`bg-stone-800 h-full`}>
        <CardOverflow>
          <AspectRatio minHeight="120px" maxHeight="200px">
            <Image
              src={boardgame.thumbnail}
              layout="fill"
              objectFit="contain"
            />
          </AspectRatio>
        </CardOverflow>
        <Box>
          <BoardgameTitle title={boardgame.name} />
        </Box>
      </Card>
    </animated.div>
  );
};

export default BoardgameCard;
