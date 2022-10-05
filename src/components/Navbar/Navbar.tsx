import UserListItem from "@components/Navbar/UserListItem";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className = "" }: NavbarProps) => {
  const { data: session } = useSession();

  return (
    <nav className="navbar mb-3 rounded-2xl bg-base-300">
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost font-brand text-3xl font-normal normal-case text-cyan-500">
            Meeplr
          </a>
        </Link>
      </div>
      <div className="flex-none gap-2">
        {session ? (
          <UserListItem />
        ) : (
          <button className="btn btn-primary" onClick={() => signIn("google")}>
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
