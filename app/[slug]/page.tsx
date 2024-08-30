// app/[slug]/page.tsx
import React from 'react';
import MainLayout from '../components/templates/mainLayout';
import Head from 'next/head';

const ProductDetailPage: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const { slug } = params;
  const product = { name: `Product ${slug}`, description: `Details about Product ${slug}`, price: 100 };

  return (
    <MainLayout>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
      </Head>
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
    </MainLayout>
  );
};

export default ProductDetailPage;
