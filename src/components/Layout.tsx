import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Nav from "../components/Nav";
import { NextUIProvider } from "@nextui-org/react";
// @ts-ignore
import theme from "../styles/nextUITheme";

const SiteContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0;
  margin: 1rem auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Layout: React.FC = ({ children }) => {
  return (
      <NextUIProvider theme={theme}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Helmet>
      <Nav />
      <SiteContainer>{children}</SiteContainer>
    </NextUIProvider>
  );
};

export default Layout;
