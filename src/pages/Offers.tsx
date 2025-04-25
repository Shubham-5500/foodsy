import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';

const offerData = [
  {
    id: 1,
    title: "50% OFF First Order",
    code: "WELCOME50",
    description: "Get 50% off on your first order with Foodsy. Maximum discount up to ₹200.",
    expiryDate: "2025-05-30",
    image: "/images/offers/first-order.jpg",
    backgroundColor: "from-orange-500 to-red-500",
    terms: [
      "Valid for new users only",
      "Minimum order value ₹400",
      "Not valid with other promotions",
      "Valid until May 30, 2025"
    ]
  },
  {
    id: 2,
    title: "Free Delivery",
    code: "FREEDEL",
    description: "Enjoy free delivery on all orders above ₹500 this weekend.",
    expiryDate: "2025-05-05",
    image: "/images/offers/free-delivery.jpg",
    backgroundColor: "from-blue-500 to-cyan-500",
    terms: [
      "Minimum order value ₹500",
      "Valid on weekends only",
      "Maximum delivery distance 10km",
      "Valid until May 5, 2025"
    ]
  },
  {
    id: 3,
    title: "Buy 1 Get 1 Free",
    code: "B1G1PIZZA",
    description: "Buy any pizza and get one of equal or lesser value free.",
    expiryDate: "2025-05-15",
    image: "/images/offers/pizza-deal.jpg",
    backgroundColor: "from-green-500 to-emerald-500",
    terms: [
      "Valid on selected pizzas only",
      "Not valid with other promotions",
      "Valid for dine-in and takeaway only",
      "Valid until May 15, 2025"
    ]
  },
  {
    id: 4,
    title: "20% OFF on Family Meals",
    code: "FAMILY20",
    description: "Get 20% off on all family meal packages. Perfect for gatherings!",
    expiryDate: "2025-05-20",
    image: "/images/offers/family-meal.jpg",
    backgroundColor: "from-purple-500 to-pink-500",
    terms: [
      "Valid on family meal packages only",
      "Minimum order value ₹800",
      "Maximum discount ₹500",
      "Valid until May 20, 2025"
    ]
  },
  {
    id: 5,
    title: "Healthy Monday: 15% OFF",
    code: "HEALTHY15",
    description: "Start your week right with 15% off on all salads and healthy bowls every Monday.",
    expiryDate: "2025-06-30",
    image: "/images/offers/healthy-food.jpg",
    backgroundColor: "from-lime-500 to-green-500",
    terms: [
      "Valid on Mondays only",
      "Valid on salads and healthy bowls only",
      "Cannot be combined with other offers",
      "Valid until June 30, 2025"
    ]
  },
  {
    id: 6,
    title: "Dessert Special: 25% OFF",
    code: "SWEET25",
    description: "Treat yourself with 25% off on all desserts when you order a main course.",
    expiryDate: "2025-05-10",
    image: "/images/offers/dessert.jpg",
    backgroundColor: "from-amber-500 to-yellow-500",
    terms: [
      "Must order at least one main course",
      "Maximum discount ₹200",
      "Valid on all dessert items",
      "Valid until May 10, 2025"
    ]
  }
];

const OfferCard = ({ offer, onApply }) => {
  const [showTerms, setShowTerms] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <div className={`bg-gradient-to-r ${offer.backgroundColor} h-32 flex items-center justify-center p-4`}>
        <h3 className="text-2xl md:text-3xl font-bold text-white text-center drop-shadow">{offer.title}</h3>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-gray-100 dark:bg-gray-700 text-foodsy-orange font-semibold px-3 py-1 rounded-md">
            {offer.code}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Expires: {new Date(offer.expiryDate).toLocaleDateString()}
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{offer.description}</p>
        <div className="flex flex-col space-y-3">
          <button 
            onClick={toggleTerms}
            className="text-foodsy-orange underline text-sm"
          >
            {showTerms ? 'Hide Terms & Conditions' : 'View Terms & Conditions'}
          </button>
          
          {showTerms && (
            <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc pl-5 pt-2 pb-3">
              {offer.terms.map((term, index) => (
                <li key={index} className="mb-1">{term}</li>
              ))}
            </ul>
          )}
          
          {isAuthenticated ? (
            <button 
              onClick={() => onApply(offer.code)} 
              className="bg-foodsy-orange hover:bg-foodsy-orange/90 text-white font-medium py-2 rounded-lg transition-colors"
            >
              Apply Offer
            </button>
          ) : (
            <Link 
              to="/login" 
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 rounded-lg transition-colors text-center"
            >
              Login to Apply
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Offers() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [filteredOffers, setFilteredOffers] = useState(offerData);
  
  useEffect(() => {
    const today = new Date();
    
    if (activeTab === 'all') {
      setFilteredOffers(offerData);
    } else if (activeTab === 'expiring') {
      const sevenDaysLater = new Date();
      sevenDaysLater.setDate(today.getDate() + 7);
      
      setFilteredOffers(offerData.filter(offer => {
        const expiryDate = new Date(offer.expiryDate);
        return expiryDate <= sevenDaysLater && expiryDate >= today;
      }));
    }
  }, [activeTab]);

  const handleApplyOffer = (code) => {
    console.log(`Offer code ${code} applied!`);
    alert(`Offer code ${code} has been applied! You can now continue shopping.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-foodsy-orange/5 to-foodsy-green/10 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar 
        cartCount={0} 
        onCartClick={() => {
          console.log("Cart clicked");
        }} 
      />
      
      <main className="container mx-auto py-10 px-4 md:px-6">
        <section className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Special Offers & Deals
          </h1>
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Take advantage of these exclusive offers to save on your favorite meals. 
              Apply the promo codes during checkout to redeem these delicious deals!
            </p>
          </div>
        </section>

        <section className="mb-6">
          <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'all'
                  ? 'text-foodsy-orange border-b-2 border-foodsy-orange'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              All Offers
            </button>
            <button
              onClick={() => setActiveTab('expiring')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'expiring'
                  ? 'text-foodsy-orange border-b-2 border-foodsy-orange'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Expiring Soon
            </button>
          </div>
        </section>

        {filteredOffers.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredOffers.map(offer => (
              <OfferCard 
                key={offer.id} 
                offer={offer} 
                onApply={handleApplyOffer} 
              />
            ))}
          </section>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-500 dark:text-gray-400">No active offers in this category</h3>
            <p className="text-gray-400 dark:text-gray-500 mt-2">Check back soon for new deals!</p>
          </div>
        )}

        <section className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How to Redeem Offers</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>Browse through our available offers and click <strong>'Apply Offer'</strong> on the one you'd like to use.</li>
            <li>Continue shopping and add items to your cart.</li>
            <li>The offer will be automatically applied during checkout.</li>
            <li>Complete your order and enjoy your savings!</li>
          </ol>
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              * Please note that some offers have specific terms and conditions. Be sure to check these before redeeming.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}