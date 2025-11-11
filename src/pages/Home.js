import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { banners, collections, products } from '../mock/mockData';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { Input } from '../components/ui/input';

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showPromoModal, setShowPromoModal] = useState(true);
  const [email, setEmail] = useState('');

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    setShowPromoModal(false);
  };

  const bestSellers = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <div className="min-h-screen bg-white">
      {/* Promo Modal */}
      <Dialog open={showPromoModal} onOpenChange={setShowPromoModal}>
        <DialogContent className="sm:max-w-[500px]">
          <button
            onClick={() => setShowPromoModal(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <span className="text-2xl">&times;</span>
          </button>
          
          <div className="grid md:grid-cols-2 gap-4 p-6">
            <div className="relative h-full">
              <img
                src="https://images.unsplash.com/photo-1512099053734-e6767b535838?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxnbGFzc2VzfGVufDB8fHx8MTc2MjQzMTI2N3ww&ixlib=rb-4.1.0&q=85"
                alt="Promo"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded">
                <p className="text-lg font-bold">Show off your vision</p>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-2">20% Off First Order</h2>
              <p className="text-gray-600 mb-6">Join us to get the latest inspiration and trends.</p>
              
              <form onSubmit={handlePromoSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
                <Button type="submit" className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white h-12">
                  Join Now
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 mb-2">or sign in with</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Google</Button>
                  <Button variant="outline" className="flex-1">Facebook</Button>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <span>✓ 30 Days Return Warranty</span>
                <span>✓ 365 Days Quality Warranty</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Banner Carousel */}
      <div className="relative h-[500px] bg-gray-900 overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full h-full relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-6xl font-bold mb-4">{banner.title}</h2>
                  <p className="text-2xl mb-8">{banner.subtitle}</p>
                  <Link to="/products">
                    <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white px-8 py-6 text-lg">
                      {banner.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentBanner ? 'bg-white w-8' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Collections Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">Shop by Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Link key={collection.id} to="/products">
              <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{collection.name}</h3>
                    <p className="text-sm">{collection.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Best Sellers</h2>
          <Link to="/products" className="flex items-center text-[#FF5722] hover:text-[#E64A19] font-medium">
            View All <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
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
      </section>

      {/* New Arrivals */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
          <Link to="/products" className="flex items-center text-[#FF5722] hover:text-[#E64A19] font-medium">
            View All <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 bg-[#FF5722] text-white px-2 py-1 text-xs font-bold rounded">NEW</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
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
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">↩️</div>
              <h3 className="font-bold text-lg mb-2">30-Day Returns</h3>
              <p className="text-gray-600">Easy return policy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-bold text-lg mb-2">1-Year Warranty</h3>
              <p className="text-gray-600">Quality guaranteed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
