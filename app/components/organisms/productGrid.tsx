import React from 'react';
import ProductCard from './productCard';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductGridProps {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-2  md:grid-cols-4  xl:grid-cols-6 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
