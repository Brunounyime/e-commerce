

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

// Load products from LocalStorage
export const loadProductsFromLocalStorage = (): Product[] => {
  const storedProducts = localStorage.getItem('products');
  return storedProducts ? JSON.parse(storedProducts) : [];
};

// Save products to LocalStorage
export const saveProductsToLocalStorage = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};

// Add a new product to LocalStorage
export const addProductToLocalStorage = (product: Product) => {
  const products = loadProductsFromLocalStorage();
  products.push(product);
  saveProductsToLocalStorage(products);
};

// Update an existing product in LocalStorage
export const updateProductInLocalStorage = (updatedProduct: Product) => {
  let products = loadProductsFromLocalStorage();
  products = products.map(p => (p.id === updatedProduct.id ? updatedProduct : p));
  saveProductsToLocalStorage(products);
};

// Get a product by ID from LocalStorage
export const getProductFromLocalStorage = (id: string): Product | undefined => {
  const products = loadProductsFromLocalStorage();
  return products.find(product => product.id === id);
};

// Delete a product from LocalStorage
export const deleteProductFromLocalStorage = (id: string) => {
  let products = loadProductsFromLocalStorage();
  products = products.filter(product => product.id !== id);
  saveProductsToLocalStorage(products);
};
