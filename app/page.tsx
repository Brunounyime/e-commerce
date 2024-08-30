'use client'

import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import MainLayout from './components/templates/mainLayout';
import ProductGrid from './components/organisms/productGrid';
import SearchBar from './components/molecules/searchBar';
import Loader from './components/atoms/loader'; // Import the Loader component

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const products: Product[] = await response.json();
        setProducts(products);
        setFilteredProducts(products); // Display all products initially
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    fetchProducts();
  }, []);

  // const handleSearch = (query: string) => {
  //   const lowercasedQuery = query.toLowerCase();
  //   const filtered = products.filter((product) =>
  //     product.name.toLowerCase().includes(lowercasedQuery)
  //   );
  //   setFilteredProducts(filtered);
  // };

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowercasedQuery)
    );
    
    console.log('Search Query:', lowercasedQuery); // Debugging log
    console.log('Filtered Products:', filtered); // Debugging log
  
    setFilteredProducts(filtered);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      } else {
        console.error('Failed to delete the product');
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleEdit = (id: string) => {
    window.location.href = `/product/edit/${id}`;
  };

  return (
    <MainLayout>
      <Head>
        <title>Home - E-commerce Platform</title>
        <meta name="description" content="Welcome to our e-commerce platform. Discover and buy the best products online." />
        <meta property="og:title" content="Home - E-commerce Platform" />
        <meta property="og:description" content="Discover and buy the best products online." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta property="og:image" content="https://yourwebsite.com/images/logo.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {loading ? ( // Conditionally render the loader or the product list
        <Loader />
      ) : (
        <>
          <div className="mb-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          <ProductGrid products={filteredProducts} onDelete={handleDelete} onEdit={handleEdit} />
        </>
      )}
    </MainLayout>
  );
};

export default HomePage;
