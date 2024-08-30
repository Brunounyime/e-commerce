'use client'
import React, { useState } from 'react';
import Input from '../atoms/input';
import Button from '../atoms/button';

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="flex-grow"
      />
      <Button onClick={handleSearch} className="flex-shrink-0">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
