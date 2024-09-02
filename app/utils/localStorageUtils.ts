

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}


export const loadProductsFromLocalStorage = (): Product[] => {
  const storedProducts = localStorage.getItem('products');
  return storedProducts ? JSON.parse(storedProducts) : [];
};


export const saveProductsToLocalStorage = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};


export const addProductToLocalStorage = (product: Product) => {
  const products = loadProductsFromLocalStorage();
  products.push(product);
  saveProductsToLocalStorage(products);
};


export const updateProductInLocalStorage = (updatedProduct: Product) => {
  let products = loadProductsFromLocalStorage();
  products = products.map(p => (p.id === updatedProduct.id ? updatedProduct : p));
  saveProductsToLocalStorage(products);
};


export const getProductFromLocalStorage = (id: string): Product | undefined => {
  const products = loadProductsFromLocalStorage();
  return products.find(product => product.id === id);
};


export const deleteProductFromLocalStorage = (id: string) => {
  let products = loadProductsFromLocalStorage();
  products = products.filter(product => product.id !== id);
  saveProductsToLocalStorage(products);
};
