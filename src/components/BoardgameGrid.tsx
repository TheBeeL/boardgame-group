import BoardgameCard from "@components/BoardgameCard";
import { Boardgame } from "@prisma/client";

interface BoardgameGridProps {
  className?: string;
  list: Boardgame[];
}

const BoardgameGrid = ({ className = "", list }: BoardgameGridProps) => {
  return (
    <div
      className={`${className} grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8`}
    >
      {list.map((item) => (
        <BoardgameCard key={item.id} boardgame={item} />
      ))}
    </div>
  );
};

export default BoardgameGrid;
