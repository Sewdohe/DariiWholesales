export interface ProductsData {
  edges: Products;
}

export interface Products extends Array<Product> {}

export interface Product {
  node: {
    description: string;
    name: string;
    price: number;
    id: string;
    sku: number;
    images: [{ src: string }];
  };
}
