import React from "react";
import { navigate } from "gatsby";
import { Navbar, Button, Text, Avatar, Row } from "@nextui-org/react";

import { NextCart } from "./NextCart";

import { useAuthValue } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import ThemeSwitch from "./ThemeSwitch"

const NavItems = [
  {
    displayName: "Home",
    url: "/",
    key: "home",
  },
  {
    displayName: "Shop",
    url: "/shop/",
    key: "shop",
  },
];

function handleSignOut() {
  signOut(auth);
}

// @ts-ignore
const Nav = () => {
  const isBrowser = typeof window !== "undefined"
  let url: string = ""

  if (isBrowser) {
    url = window.location.pathname ? window.location.pathname : "";
  } else {
    url = ""
  }

  const { currentUser } = useAuthValue();

  let details;

  if (!currentUser) {
    details = (
      <Row>
        <Navbar.Item>
          <Button
            size="sm"
            flat
            css={{ margin: "0 0.5rem" }}
            onPress={() => navigate("/register/")}
          >
            Register
          </Button>
        </Navbar.Item>
        <Navbar.Item>
          <Button
            size="sm"
            flat
            css={{ margin: "0 0.5rem" }}
            onClick={() => navigate("/login/")}
          >
            Sign In
          </Button>
        </Navbar.Item>
      </Row>
    );
  } else {
    details = (
      <Row>
        <Avatar color="primary" bordered css={{ margin: '0 1rem' }} text={currentUser.displayName!} />
        <Button auto flat onClick={handleSignOut}>
          Log Out
        </Button>
      </Row>
    );
  }

  return (
    <div>
      <Navbar variant="static">
        <Navbar.Brand>
          <Text
            color="inherit"
            hideIn="xs"
            css={{ fontSize: "2rem", margin: "auto auto" }}
          >
            Mr.Cigars
          </Text>
        </Navbar.Brand>
        <Navbar.Content variant="highlight" hideIn="xs">
          {NavItems.map((navItem) => {
            return (
              <Navbar.Link
                isActive={navItem.url == url ? true : false}
                key={navItem.key}
                onClick={() => {
                  navigate(navItem.url);
                }}
              >
                {navItem.displayName}
              </Navbar.Link>
            );
          })}
          <NextCart />
        </Navbar.Content>

        {/* user account area */}
        <Navbar.Content activeColor={"primary"}>{details}</Navbar.Content>
        <ThemeSwitch />
      </Navbar>
    </div>
  );
};

export default Nav;
