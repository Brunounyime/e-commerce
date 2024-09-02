'use client'
import { useEffect, useState } from 'react';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ProductsDB', 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('products')) {
        db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

async function addProduct(product: any): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('products', 'readwrite');
    const store = transaction.objectStore('products');
    store.add(product);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

async function updateProduct(updatedProduct: any): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('products', 'readwrite');
    const store = transaction.objectStore('products');
    store.put(updatedProduct);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

async function deleteProduct(id: number): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('products', 'readwrite');
    const store = transaction.objectStore('products');
    store.delete(id);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

async function getProducts(): Promise<any[]> {
  const db = await openDatabase();
  const transaction = db.transaction('products', 'readonly');
  const store = transaction.objectStore('products');
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}

export default function ProductsManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data as any[]);
    });
  }, []);

  const handleAddProduct = () => {
    const newProduct = { name: 'Product 1', price: 100 };
    addProduct(newProduct).then(() => {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    });
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id).then(() => {
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    });
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      updateProduct(editingProduct).then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === editingProduct.id ? editingProduct : p))
        );
        setEditingProduct(null);
      });
    }
  };

  return (
    <div>
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingProduct && (
        <div>
          <h3>Edit Product</h3>
          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
          />
          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
            }
          />
          <button onClick={handleUpdateProduct}>Update Product</button>
        </div>
      )}
    </div>
  );
}
