import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <h1 className="text-lg font-bold">
        <Link href="/">
          <span>E-commerce Platform</span>
        </Link>
      </h1>
      <div>
      <Link href="/product/new">
  <span className="bg-white text-blue-500 px-3 py-2 rounded">Add Product</span>
</Link>

      </div>
    </nav>
  );
};

export default Navbar;
