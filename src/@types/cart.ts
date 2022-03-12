import { Products } from "./product";

export type CartContextType = {
  products?: Products | null;
  updateCart: (products: Products) => void;
};