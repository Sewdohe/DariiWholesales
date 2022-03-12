import ThemeProvider from './src/providers/ThemeProvider';
import React from "react";

// export const wrapRootElement = ThemeProvider;

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)