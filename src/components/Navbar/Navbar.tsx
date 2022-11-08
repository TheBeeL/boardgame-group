import UserListItem from "@components/Navbar/UserListItem";
import Button from "@components/ui/Button";
import ButtonLink from "@components/ui/ButtonLink";
import { signIn, useSession } from "next-auth/react";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className = "" }: NavbarProps) => {
  const { data: session } = useSession();

  return (
    <nav className="navbar mb-3 rounded-2xl bg-base-300">
      <div className="flex-1">
        <ButtonLink
          ghost
          className="font-brand text-3xl font-normal normal-case text-cyan-500"
        >
          Meeplr
        </ButtonLink>
      </div>
      <div className="flex-none gap-2">
        {session ? (
          <UserListItem />
        ) : (
          <Button onClick={() => signIn("google")}>Sign in</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
