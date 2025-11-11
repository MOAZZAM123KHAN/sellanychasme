import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Check } from 'lucide-react';
import { products } from '../mock/mockData';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from '../hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <span onClick={() => navigate('/')} className="hover:text-gray-700 cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span onClick={() => navigate('/products')} className="hover:text-gray-700 cursor-pointer">Products</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-[#FF5722]' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <span className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice > product.price && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-24">Color:</span>
                <span className="font-semibold">{product.color}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-24">Material:</span>
                <span className="font-semibold">{product.material}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600 w-24">Stock:</span>
                {product.inStock ? (
                  <span className="flex items-center text-green-600 font-semibold">
                    <Check className="w-4 h-4 mr-1" /> In Stock
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#FF5722] hover:bg-[#E64A19] text-white h-12 text-lg"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="h-12 px-4">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            <div className="border-t pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-2">🚚</div>
                  <p className="text-sm font-semibold">Free Shipping</p>
                  <p className="text-xs text-gray-500">Orders over $50</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">↩️</div>
                  <p className="text-sm font-semibold">30-Day Returns</p>
                  <p className="text-xs text-gray-500">Hassle-free</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">✅</div>
                  <p className="text-sm font-semibold">1-Year Warranty</p>
                  <p className="text-xs text-gray-500">Quality assured</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="py-6">
              <div className="space-y-3">
                <div className="flex py-2 border-b">
                  <span className="w-48 text-gray-600">Frame Material</span>
                  <span className="font-semibold">{product.material}</span>
                </div>
                <div className="flex py-2 border-b">
                  <span className="w-48 text-gray-600">Color</span>
                  <span className="font-semibold">{product.color}</span>
                </div>
                <div className="flex py-2 border-b">
                  <span className="w-48 text-gray-600">Category</span>
                  <span className="font-semibold capitalize">{product.category}</span>
                </div>
                <div className="flex py-2 border-b">
                  <span className="w-48 text-gray-600">Weight</span>
                  <span className="font-semibold">25g (approx)</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">John Doe</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">Amazing quality! The frames are lightweight and comfortable. Highly recommend!</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                    SM
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">Sarah Miller</span>
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                        <Star className="w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                    <p className="text-gray-600">Great design and fast shipping. Perfect fit!</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-1">{relatedProduct.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">${relatedProduct.price}</span>
                      {relatedProduct.originalPrice > relatedProduct.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
