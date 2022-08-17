import { Boardgame as BoardgameCard } from "@prisma/client";

interface BoardgameCardProps {
  boardgame: BoardgameCard;
  className?: string;
}

const BoardgameCard = ({ boardgame, className }: BoardgameCardProps) => {
  return (
    <div
      className={`${className} border-white border rounded p-1 flex flex-col`}
    >
      <img src={boardgame.thumbnail} />
      <h3 className="text-xl font-bold">{boardgame.name}</h3>
    </div>
  );
};

export default BoardgameCard;
