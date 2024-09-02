'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '../../../components/templates/mainLayout';
import ProductForm from '../../../components/molecules/productForm';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import Loader from '@/app/components/atoms/loader';
import ErrorMessage from '@/app/components/atoms/errorMessage';
import { getProductFromLocalStorage, updateProductInLocalStorage } from '../../../utils/localStorageUtils';

const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<{ id: string; name: string; price: number; category: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const foundProduct = getProductFromLocalStorage(id as string);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setError('Product not found.');
    }
  }, [id]);

  const handleEditProduct = (data: { name: string; price: number; category: string }) => {
    if (!id) return;

    try {
      const updatedProduct = { id: id as string, ...data };
      updateProductInLocalStorage(updatedProduct);
      router.push('/');
    } catch (error) {
      setError('Failed to update the product.');
    }
  };

  if (!product && !error) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>Edit {product?.name || 'Product'} - E-commerce Platform</title>
        <meta name="description" content={`Edit details of ${product?.name || 'the product'}.`} />
      </Head>
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      {error && <ErrorMessage message={error} />}
      {product && <ProductForm initialData={product} onSubmit={handleEditProduct} />}
    </MainLayout>
  );
};

export default EditProductPage;
