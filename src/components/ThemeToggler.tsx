import React from "react";
import { ThemeContextType, Theme } from "../@types/theme";
import { ThemeContext } from "../contexts/themeContext";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const ThemeToggler: React.FC = ({ children }) => {
  const { theme, changeTheme } = React.useContext(
    ThemeContext
  ) as ThemeContextType;
  const handleThemeChange = () => {
    if (theme == "light") {
      changeTheme("dark");
    } else {
      changeTheme("light");
    }
  };

  return (
    <span>
      <BootstrapSwitchButton
        checked={theme == 'light' ? true : false }
        onChange={handleThemeChange}
        onlabel='Light'
        offlabel='Dark'
        width={80}
        onstyle="light"
        offstyle="dark"
      >
        Theme
      </BootstrapSwitchButton>
    </span>
  );
};
export default ThemeToggler;
