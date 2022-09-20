import { Typography } from "@mui/joy";
import { useMemo } from "react";

const maxChar = 39;

interface BoardgameTitleProps {
  title: string;
  className?: string;
}

const BoardgameTitle = ({ title, className = "" }: BoardgameTitleProps) => {
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
    <div className={`${className} flex flex-col items-center text-center py-1`}>
      <Typography level="h6" className="drop-shadow shadow-black">
        {main.length > maxChar ? `${main.substring(0, maxChar - 3)}...` : main}
      </Typography>
      <Typography level="body1">
        {subtitle && <span className="text-stone-400 text-sm">{subtitle}</span>}
      </Typography>
    </div>
  );
};
export default BoardgameTitle;
