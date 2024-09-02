'use client';

import React, { useState } from 'react';
import MainLayout from '../../components/templates/mainLayout';
import ProductForm from '../../components/molecules/productForm';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import ErrorMessage from '../../components/atoms/errorMessage';
import { addProductToLocalStorage } from '../../utils/localStorageUtils';

const NewProductPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleAddProduct = (data: { name: string; price: number; category: string }) => {
    try {
      const newProduct = { id: Date.now().toString(), ...data };
      addProductToLocalStorage(newProduct);
      router.push('/');
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
      {error && <ErrorMessage message={error} />}
      <ProductForm onSubmit={handleAddProduct} />
    </MainLayout>
  );
};

export default NewProductPage;
