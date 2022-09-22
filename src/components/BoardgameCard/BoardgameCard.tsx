import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardCover,
  CardOverflow,
} from "@mui/joy";
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
  const [{ rotateX, rotateY, rotateZ, scale, zIndex }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zIndex: 0,
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
          scale: 1.2,
          zIndex: 10,
        });
      },
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1, zIndex: 0 }),
    },
    { target: ref, eventOptions: { passive: false } },
  );

  return (
    <animated.div
      ref={ref}
      className={`${className} overflow-hidden rounded-md hover:shadow-2xl`}
      style={{
        transform: "perspective(600px)",
        scale,
        rotateX,
        rotateY,
        rotateZ,
        zIndex: to([zIndex], (z) => Math.floor(z)),
      }}
    >
      <AspectRatio ratio={1}>
        <Card className={`h-full bg-stone-800`}>
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
      </AspectRatio>
    </animated.div>
  );
};

export default BoardgameCard;
