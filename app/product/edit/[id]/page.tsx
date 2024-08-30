'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '../../../components/templates/mainLayout';
import ProductForm from '../../../components/molecules/productForm';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import Loader from '@/app/components/atoms/loader';

const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<{ name: string; price: number; category: string } | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/products');
        const products = await response.json();
        const foundProduct = products.find((p: any) => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleEditProduct = async (data: { name: string; price: number; category: string }) => {
    if (!id) return;

    await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    router.push('/');
  };

  if (!product) {
    return <MainLayout><Loader/></MainLayout>;
  }

  return (
    <MainLayout>
       <Head>
        <title>Edit {product.name} - E-commerce Platform</title>
        <meta name="description" content={`Edit details of ${product.name}.`} />
      </Head>
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <ProductForm initialData={product} onSubmit={handleEditProduct} successMessage="Product updated successfully!" />
    </MainLayout>
  );
};



export default EditProductPage;
