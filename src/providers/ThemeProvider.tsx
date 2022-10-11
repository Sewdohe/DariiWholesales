import * as React from 'react';
import ThemeContext from '../contexts/themeContext';
import { Theme } from '../@types/theme';

const ThemeProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [themeMode, changeTheme] = React.useState<Theme>('light');
  return (
    <ThemeContext.Provider value={{ theme: themeMode, changeTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider