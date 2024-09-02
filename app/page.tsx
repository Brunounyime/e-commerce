'use client';

import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import MainLayout from './components/templates/mainLayout';
import ProductGrid from './components/organisms/productGrid';
import SearchBar from './components/molecules/searchBar';
import Loader from './components/atoms/loader';
import {
  loadProductsFromLocalStorage,
  deleteProductFromLocalStorage,
} from './utils/localStorageUtils'; // Import utility functions

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        const products = loadProductsFromLocalStorage(); // Fetch products from LocalStorage
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = (id: string) => {
    try {
      deleteProductFromLocalStorage(id); // Delete product from LocalStorage
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
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
        <meta
          name="description"
          content="Welcome to our e-commerce platform. Discover and buy the best products online."
        />
        <meta property="og:title" content="Home - E-commerce Platform" />
        <meta property="og:description" content="Discover and buy the best products online." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://e-commerceplatforms.netlify.app/" />
        <meta property="og:image" content="https://e-commerceplatforms.netlify.app/images/logo.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {loading ? (
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
