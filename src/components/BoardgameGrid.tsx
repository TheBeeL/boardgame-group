import BoardgameCard from "@components/BoardgameCard";
import { Boardgame } from "@prisma/client";

interface BoardgameGridProps {
  className?: string;
  list: Boardgame[];
}

const BoardgameGrid = ({ className = "", list }: BoardgameGridProps) => {
  return (
    <div className={`${className} flex flex-row flex-wrap gap-2`}>
      {list.map((item) => (
        <BoardgameCard
          key={item.id}
          className="grow basis-32"
          boardgame={item}
        />
      ))}
    </div>
  );
};

export default BoardgameGrid;
