import React from "react";
import Navigation from "./navigation";
import { ThemeContext } from "../contexts/themeContext";
import styled from "styled-components";

const SiteContainer = styled.div`
display: flex;
flex-direction: column;
box-sizing: border-box;
padding: 0;
margin: 1rem auto;
width: 80%;
justify-content: center;
align-items: center;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <ThemeContext.Consumer>
      {(themeContext) => (
        <>
          <Navigation theme={themeContext?.theme}></Navigation>
          <SiteContainer>
            {children}
          </SiteContainer>
        </>
      )}
    </ThemeContext.Consumer>
  );
};

export default Layout;
