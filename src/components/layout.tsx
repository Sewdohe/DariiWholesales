import React from "react";
import Navigation from "./navigation";
import { ThemeContextType, Theme } from '../@types/theme';
import { ThemeContext } from '../contexts/themeContext';

const Layout: React.FC = ({ children }) => {

  return (
    <ThemeContext.Consumer>
      { themeContext => (
        <>
          <Navigation theme={themeContext?.theme}></Navigation>
          {children}
        </>
        )
      }
    </ThemeContext.Consumer>
  );
};

export default Layout;