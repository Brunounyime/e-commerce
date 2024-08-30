'use client'

import React, { useState } from 'react';
import Input from '../atoms/input';
import Label from '../atoms/label';
import Button from '../atoms/button';
import Alert from '../atoms/alert';

interface ProductFormProps {
  initialData?: { name: string; price: number; category: string };
  onSubmit: (data: { name: string; price: number; category: string }) => void;
  successMessage?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData = { name: '', price: 0, category: '' }, onSubmit, successMessage }) => {
  const [name, setName] = useState(initialData.name);
  const [price, setPrice] = useState(initialData.price.toString());
  const [category, setCategory] = useState(initialData.category);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, price: parseFloat(price), category });
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitted && successMessage && <Alert message={successMessage} />}
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mt-1"
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full mt-1"
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select a Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        
        </select>
      </div>
      <Button type="submit" className="w-full">
        Save Product
      </Button>
    </form>
  );
};

export default ProductForm;

