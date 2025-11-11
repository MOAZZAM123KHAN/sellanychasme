import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../mock/mockData';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  useEffect(() => {
    let filtered = [...products];

    const category = searchParams.get('category');
    const search = searchParams.get('search');

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchParams, sortBy, selectedCategories, priceRange]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-4">Category</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="eyeglasses"
                    checked={selectedCategories.includes('eyeglasses')}
                    onCheckedChange={() => handleCategoryChange('eyeglasses')}
                  />
                  <label htmlFor="eyeglasses" className="text-sm cursor-pointer">Eyeglasses</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sunglasses"
                    checked={selectedCategories.includes('sunglasses')}
                    onCheckedChange={() => handleCategoryChange('sunglasses')}
                  />
                  <label htmlFor="sunglasses" className="text-sm cursor-pointer">Sunglasses</label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <p className="text-sm text-gray-600">Up to ${priceRange[1]}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Material</h3>
              <div className="space-y-2">
                {['Acetate', 'Metal', 'Titanium', 'Plastic'].map((material) => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox id={material.toLowerCase()} />
                    <label htmlFor={material.toLowerCase()} className="text-sm cursor-pointer">{material}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredProducts.length} Products
              </h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.originalPrice > product.price && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                          SALE
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{product.color} • {product.material}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm ml-1">{product.rating} ({product.reviews})</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
