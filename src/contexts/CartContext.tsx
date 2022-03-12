import * as React from 'react';
import { CartContextType } from '../@types/cart';

export const ThemeContext = React.createContext<CartContextType | null>(null);

export default ThemeContext;