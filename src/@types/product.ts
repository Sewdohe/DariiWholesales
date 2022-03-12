export interface ProductsData {
  edges: Products;
}

export interface Products extends Array<Product> {}

export interface Product {
  node: {
    description: string;
    attributes?: [
      {
        name: string;
        options: string[];
        variation: boolean;
      }
    ]
    name: string;
    price: number;
    id: string;
    sku: number;
    images: [{ src: string }];
    product_variations?: {
      attributes?: [
        {
          name: string;
          option: string;
        }
      ];
    }
  };
}
