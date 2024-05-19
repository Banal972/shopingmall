export interface ProductType {
    sale: number;
    detail: string;
    cate: string;
    description: string;
    name: string;
    size: number[];
    hit: number;
    price: number;
    src: string;
    tag: string[];
    only: boolean;
  }
  
  export interface DetailType {
    sale?: number;
    detail: string;
    cate: string;
    description: string;
    name: string;
    size: number[];
    hit: number;
    price: number;
    src: string;
    tag: string[];
    only?: boolean;
    id : string;
  }
  
  export interface CardType {
    price: number;
    description: string;
    name: string;
    src: string;
    tag: string[];
    id : string;
  }