export type Product = {
  code: string;
  description: string;
  price: number;
  components: Components[];
  nextPage: boolean;
  totalComponents: number;
};

type Components = {
  amount: number;
  code: string;
  description: string;
  components?: Components[];
  details?: string;
  price?: number;
};
