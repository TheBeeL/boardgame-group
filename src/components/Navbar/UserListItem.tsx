import { UserIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface UserListItemProps {
  className?: string;
}

const UserListItem = ({ className = "" }: UserListItemProps) => {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="avatar btn btn-ghost btn-circle">
        <div className="w-10 rounded-full">
          <UserIcon className="h-10 w-10 text-stone-200" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 bg-base-300 p-2 shadow"
      >
        <li className="mb-2 border-b border-base-content/50 pb-2">
          <Link href="/user">
            <a className="justify-between gap-6">
              <div className="avatar overflow-hidden rounded-full">
                <div className="w-10">
                  {session?.user?.image && (
                    <Image src={session.user.image} layout="fill" />
                  )}
                </div>
              </div>
              <span className="whitespace-nowrap">{session?.user?.name}</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/collection">
            <a>My Collection</a>
          </Link>
        </li>
        <li>
          <a onClick={() => signOut()}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default UserListItem;
