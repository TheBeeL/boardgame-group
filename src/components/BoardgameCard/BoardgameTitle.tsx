import { useMemo } from "react";

const maxChar = 39;

interface BoardgameTitleProps {
  title: string;
  className?: string;
}

const BoardgameTitle = ({ title, className }: BoardgameTitleProps) => {
  const [main, subtitle, edition] = useMemo(() => {
    let main = title;
    let subtitle: string | undefined;
    let edition: string | undefined;

    if (title.includes("(")) {
      const split = title.split("(");
      main = split[0]!.trim();
      edition = split[1]!.trim().slice(0, -1);
    }

    if (main.includes(":")) {
      const split = main.split(":");
      main = split[0]!.trim();
      subtitle = split[1]?.trim();
    }
    return [main, subtitle, edition];
  }, [title]);

  return (
    <div className={`${className} flex flex-col items-center text-center`}>
      <h3 className="text-lg">
        {main.length > maxChar ? `${main.substring(0, maxChar - 3)}...` : main}
      </h3>
      {subtitle && <span className="text-stone-400 text-sm">{subtitle}</span>}
    </div>
  );
};
export default BoardgameTitle;
