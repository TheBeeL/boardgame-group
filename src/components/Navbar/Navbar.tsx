import UserListItem from "@components/Navbar/UserListItem";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
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
    <Box component="nav" className={`${className} grow`}>
      <List row>
        <ListItem>
          <Link href="/" passHref>
            <ListItemContent className="cursor-pointer">
              <Typography
                className="select-none"
                level="h3"
                fontFamily="'Oleo Script'"
              >
                Meeplr
              </Typography>
            </ListItemContent>
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
    </Box>
  );
};

export default Navbar;
