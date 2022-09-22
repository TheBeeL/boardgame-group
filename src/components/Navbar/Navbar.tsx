import UserListItem from "@components/Navbar/UserListItem";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Typography,
} from "@mui/joy";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className = "" }: NavbarProps) => {
  const { data: session } = useSession();

  return (
    <Sheet component="nav" className={`${className} grow rounded-md`}>
      <List row sx={{ pl: 0 }}>
        <ListItem sx={{ pl: 0 }}>
          <Link href="/" passHref>
            <ListItemButton className="cursor-pointer rounded-md" component="a">
              <Typography
                className="select-none"
                level="h1"
                fontSize="2.5rem"
                fontWeight="400"
                fontFamily="'Oleo Script'"
                color="primary"
              >
                Meeplr
              </Typography>
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem sx={{ marginLeft: "auto" }}>
          {session ? (
            <UserListItem />
          ) : (
            <ListItemButton onClick={() => signIn("google")}>
              Sign in
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Sheet>
  );
};

export default Navbar;
