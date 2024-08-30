import React from 'react';
import Card from '../atoms/card';
import Button from '../atoms/button';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, onDelete, onEdit }) => {
  return (
    <Card className="flex flex-col justify-between ">
      <Image src="/iphone.jpg" alt={name} width={200} height={200} className="rounded-lg w-full" />
      <div className="mt-4">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-600 mt-2">₦{price.toFixed(2)}</p>
      </div>
      <div className="flex space-x-2  mt-4">
        <Button onClick={() => onEdit(id)} className="flex-1 bg-yellow-500">
          Edit
        </Button>
        <Button onClick={() => onDelete(id)} className="flex-1 bg-red-500">
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
