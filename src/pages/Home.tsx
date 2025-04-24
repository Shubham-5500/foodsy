import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import FoodCard from '@/components/FoodCard';
import OffersCarousel from '@/components/OffersCarousel';
import Cart from '@/components/Cart';
import { foodItems } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(foodItems);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let result = [...foodItems];
    
    if (searchQuery) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    setFilteredItems(result);
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (item: typeof foodItems[0]) => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to your cart.",
        action: (
          <Link to="/login" className="bg-foodsy-orange text-white px-3 py-1 rounded-md text-xs">
            Sign in
          </Link>
        ),
      });
      return;
    }
    
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prev, {
          id: item.id,
          name: item.name,
          price: item.discount > 0 ? item.price - (item.price * item.discount / 100) : item.price,
          quantity: 1,
          image: item.image
        }];
      }
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-foodsy-orange/5 to-foodsy-green/10 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar 
        cartCount={totalCartItems} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      <section className="bg-gradient-to-r from-foodsy-orange/20 to-foodsy-green/10 dark:from-foodsy-orange/10 dark:to-gray-800 py-16 md:py-20 px-2 md:px-4">
        <div className="container mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 drop-shadow">
            Delicious Food, <span className="text-foodsy-orange">Delivered Fast</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Order your favorite meals from the best restaurants in town and get them delivered to your door.
          </p>
          <div className="flex justify-center">
            <SearchBar 
              onSearch={setSearchQuery} 
              onCategoryChange={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </section>
      <section id="offers" className="py-8 md:py-12 px-2 md:px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">Hot Offers</h2>
          <OffersCarousel />
        </div>
      </section>
      <section id="menu" className="py-8 md:py-12 px-2 md:px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            {selectedCategory !== 'All' 
              ? `${selectedCategory} Menu`
              : 'Our Menu'}
            {searchQuery && ` – Results for "${searchQuery}"`}
          </h2>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-500 dark:text-gray-400">No items found</h3>
              <p className="text-gray-400 dark:text-gray-500 mt-2">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredItems.map(item => {
                const foundInCart = cartItems.find(cartItem => cartItem.id === item.id);
                return (
                  <FoodCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    category={item.category}
                    rating={item.rating}
                    prepTime={item.prepTime}
                    discount={item.discount}
                    onAddToCart={() => handleAddToCart(item)}
                    onRemoveFromCart={foundInCart ? () => handleRemoveFromCart(item.id) : undefined}
                    quantity={foundInCart?.quantity || 0}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Cart 
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={id => setCartItems(prev => prev.filter(item => item.id !== id))}
        onUpdateQuantity={handleUpdateQuantity}
      />
      
      <Footer />
    </div>
  );
};

export default Home;
