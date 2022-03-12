import * as React from 'react';
import { ThemeContextType } from '../@types/theme';

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export default ThemeContext;