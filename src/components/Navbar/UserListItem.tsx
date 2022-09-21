import { ArrowLeftOnRectangleIcon, UserIcon } from "@heroicons/react/24/solid";
import { PopperUnstyled, ClickAwayListener } from "@mui/base";
import { Avatar, List, ListDivider, ListItem, ListItemButton } from "@mui/joy";
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
      <ListItem className={`${className}`}>
        <ListItemButton onClick={handleClick}>
          <UserIcon className="w-6 h-6 text-stone-200" />
        </ListItemButton>
      </ListItem>

      <PopperUnstyled
        open={open}
        id={id}
        anchorEl={anchorEl}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <List className="border z-50 bg-stone-800 border-stone-500 rounded-md mt-2">
            <ListItem className="justify-between gap-2">
              <Link href="/user" passHref>
                <ListItemButton>
                  <Avatar />
                  {session?.user?.name}
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => signOut()}
                className="gap-2 justify-between"
              >
                <ArrowLeftOnRectangleIcon className="ml-3 w-6 h-6 text-stone-300" />
                Sign Out
              </ListItemButton>
            </ListItem>
            <ListDivider />
            <ListItem>
              <Link href="/games" passHref>
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
