import { ArrowLeftOnRectangleIcon, UserIcon } from "@heroicons/react/24/solid";
import { Avatar, ListDivider, ListItemButton, Menu, MenuItem } from "@mui/joy";
import getInitials from "@utils/getInitials";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";

interface UserListItemProps {
  className?: string;
}

const UserListItem = ({ className = "" }: UserListItemProps) => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const router = useRouter();
  useEffect(() => {
    setAnchorEl(null);
  }, [router.route]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} className="rounded-full">
        <UserIcon className="h-6 w-6 text-stone-200" />
      </ListItemButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        placement="bottom-end"
        className="z-50 rounded-md border border-stone-500"
      >
        <MenuItem>
          <Link href="/user">
            <a className="flex w-full items-center justify-between gap-2">
              <Avatar src={session?.user?.image || undefined}>
                {getInitials(session?.user?.name || undefined)}
              </Avatar>
              <span className="ml-2 whitespace-nowrap">
                {session?.user?.name}
              </span>
            </a>
          </Link>
        </MenuItem>
        <MenuItem onClick={() => signOut()} className="justify-between gap-2">
          <ArrowLeftOnRectangleIcon className="ml-3 h-6 w-6 text-stone-300" />
          Sign out
        </MenuItem>
        <ListDivider className="bg-stone-500" />
        <MenuItem className="justify-end">
          <Link href="/collection">
            <a>My Collection</a>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserListItem;
