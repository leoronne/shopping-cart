interface VouchersProps {
  id?: number;
  code?: string;
  type?: string;
  amount?: number;
  minValue?: number;
}

interface ProductsProps {
  id?: number;
  name?: string;
  price?: number;
  available?: number;
}

interface CartItemsProps {
  id?: number;
  name?: string;
  price?: number;
  available?: number;
}
