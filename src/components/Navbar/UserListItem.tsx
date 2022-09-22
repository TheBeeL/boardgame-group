import { ArrowLeftOnRectangleIcon, UserIcon } from "@heroicons/react/24/solid";
import { PopperUnstyled, ClickAwayListener } from "@mui/base";
import { Avatar, List, ListDivider, ListItem, ListItemButton } from "@mui/joy";
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
  const router = useRouter();
  const open = !!anchorEl;
  const id = open ? "user-popper" : undefined;

  useEffect(() => {
    setAnchorEl(null);
  }, [router.route]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <UserIcon className="h-6 w-6 text-stone-200" />
      </ListItemButton>

      <PopperUnstyled
        open={open}
        id={id}
        anchorEl={anchorEl}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <List className="z-50 mt-2 rounded-md border border-stone-500 bg-stone-800">
            <ListItem>
              <Link href="/user" passHref>
                <ListItemButton className="justify-between gap-2">
                  <Avatar src={session?.user?.image || undefined}>
                    {getInitials(session?.user?.name || undefined)}
                  </Avatar>
                  {session?.user?.name}
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => signOut()}
                className="justify-between gap-2"
              >
                <ArrowLeftOnRectangleIcon className="ml-3 h-6 w-6 text-stone-300" />
                Sign Out
              </ListItemButton>
            </ListItem>
            <ListDivider className="bg-stone-500" />
            <ListItem>
              <Link href="/collection" passHref>
                <ListItemButton className="justify-end">
                  My Collection
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </ClickAwayListener>
      </PopperUnstyled>
    </>
  );
};

export default UserListItem;
