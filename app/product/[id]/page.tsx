'use client'
import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/templates/mainLayout';
import { useParams } from 'next/navigation';
import Loader from '@/app/components/atoms/loader';
import Head from 'next/head';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<{ id: string; name: string; price: number; description: string } | null>(null);

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

  if (!product) {
    return <MainLayout><Loader/></MainLayout>;
  }

  return (
    <MainLayout>
       <Head>
        <title>{product.name} - Buy Now for ${product.price}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://yourwebsite.com/product/${product.id}`} />
        <meta property="og:image" content={`https://yourwebsite.com/images/${product.id}.jpg`} />
      </Head>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl text-gray-700 mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-600">{product.description}</p>
      </div>
    </MainLayout>
  );
};



export default ProductDetailPage;
