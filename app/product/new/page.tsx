'use client'


import React, { useState } from 'react';
import MainLayout from '../../components/templates/mainLayout';
import ProductForm from '../../components/molecules/productForm';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const NewProductPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleAddProduct = async (data: { name: string; price: number; category: string }) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Date.now().toString(), ...data }),
      });

      if (response.ok) {
        router.push('/'); 
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add the product.');
      }
    } catch (error) {
      setError('Failed to add the product.');
    }
  };

  return (
    <MainLayout>
       <Head>
        <title>Add New Product - E-commerce Platform</title>
        <meta name="description" content="Add a new product to the e-commerce platform." />
      </Head>
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ProductForm onSubmit={handleAddProduct} successMessage="Product added successfully!" />
    </MainLayout>
  );
};

export default NewProductPage;
