import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data for order history
const mockOrders = [
  {
    id: "ORD-3847",
    date: "2025-04-22T14:30:00",
    status: "delivered",
    total: 854.75,
    items: [
      { name: "Butter Chicken", quantity: 1, price: 399.00 },
      { name: "Garlic Naan", quantity: 2, price: 79.00 },
      { name: "Gulab Jamun", quantity: 2, price: 129.00 }
    ],
    restaurant: "Punjab Grill",
    deliveryAddress: "42 Koramangala Main Road, Bangalore"
  },
  {
    id: "ORD-3742",
    date: "2025-04-18T19:45:00",
    status: "delivered",
    total: 655.50,
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 349.00 },
      { name: "Garlic Bread", quantity: 1, price: 179.00 },
      { name: "Coca Cola", quantity: 1, price: 79.00 }
    ],
    restaurant: "Pizza Paradise",
    deliveryAddress: "42 Koramangala Main Road, Bangalore"
  },
  {
    id: "ORD-3567",
    date: "2025-04-15T13:20:00",
    status: "delivered",
    total: 478.00,
    items: [
      { name: "Chicken Biryani", quantity: 1, price: 349.00 },
      { name: "Raita", quantity: 1, price: 79.00 }
    ],
    restaurant: "Biryani House",
    deliveryAddress: "42 Koramangala Main Road, Bangalore"
  }
];

// Mock data for current orders
const mockCurrentOrders = [
  {
    id: "ORD-3921",
    date: "2025-04-25T13:10:00",
    status: "preparing",
    estimatedDelivery: "2025-04-25T13:55:00",
    total: 725.50,
    items: [
      { name: "Paneer Tikka Masala", quantity: 1, price: 379.00 },
      { name: "Butter Naan", quantity: 2, price: 69.00 },
      { name: "Mango Lassi", quantity: 2, price: 99.00 }
    ],
    restaurant: "Spice Garden",
    deliveryAddress: "42 Koramangala Main Road, Bangalore",
    deliveryPerson: "Rahul",
    deliveryContact: "+91 98765 43210"
  }
];

// Helper functions for formatting
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

const getStatusColor = (status) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'preparing':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'out-for-delivery':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const OrderCard = ({ order, showDetails = false, current = false }) => {
  const [isOpen, setIsOpen] = useState(showDetails);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-medium">{order.restaurant}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatDate(order.date)} at {formatTime(order.date)}
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex justify-between sm:block">
          <p className="font-semibold">{formatCurrency(order.total)}</p>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm text-foodsy-orange hover:underline focus:outline-none"
          >
            {isOpen ? 'Hide details' : 'View details'}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 text-sm">
          <div className="mb-4">
            <h4 className="font-medium mb-2">Order Items</h4>
            <ul className="space-y-2">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="text-gray-600 dark:text-gray-400">{formatCurrency(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-1">Delivered to</h4>
            <p className="text-gray-600 dark:text-gray-400">{order.deliveryAddress}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-1">Order ID</h4>
            <p className="text-gray-600 dark:text-gray-400">{order.id}</p>
          </div>
          
          {current && order.status === 'preparing' && (
            <div className="mb-4">
              <h4 className="font-medium mb-1">Estimated Delivery</h4>
              <p className="text-gray-600 dark:text-gray-400">
                {formatTime(order.estimatedDelivery)}
              </p>
            </div>
          )}
          
          {current && order.deliveryPerson && (
            <div className="mb-4">
              <h4 className="font-medium mb-1">Delivery Person</h4>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>{order.deliveryPerson[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p>{order.deliveryPerson}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{order.deliveryContact}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            {current ? (
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            ) : (
              <Button variant="outline" size="sm">
                Reorder
              </Button>
            )}
            
            {order.status === 'delivered' && (
              <Button variant="ghost" size="sm">
                Rate Order
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ProfilePage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
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
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="bg-foodsy-orange text-white text-xl">
                  {getInitials(user?.name || 'User')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name || 'User'}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || ''}</p>
            </div>
            
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 dark:text-gray-300"
                onClick={() => setIsEditing(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Edit Profile
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 dark:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Saved Addresses
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 dark:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Payment Methods
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 dark:text-red-400"
                onClick={handleLogout}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="current-orders" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="current-orders">Current Orders</TabsTrigger>
                <TabsTrigger value="order-history">Order History</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
              
              <TabsContent value="current-orders">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Current Orders</h2>
                {mockCurrentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {mockCurrentOrders.map(order => (
                      <OrderCard key={order.id} order={order} showDetails={true} current={true} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No active orders</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">You don't have any orders in progress at the moment.</p>
                    <Link to="/" className="inline-block bg-foodsy-orange hover:bg-foodsy-orange/90 text-white font-semibold py-2 px-6 rounded-full">
                      Order Now
                    </Link>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="order-history">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Order History</h2>
                {mockOrders.length > 0 ? (
                  <div className="space-y-4">
                    {mockOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No order history yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">You haven't placed any orders yet. Start ordering delicious meals!</p>
                    <Link to="/" className="inline-block bg-foodsy-orange hover:bg-foodsy-orange/90 text-white font-semibold py-2 px-6 rounded-full">
                      Browse Menu
                    </Link>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="favorites">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Your Favorites</h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No favorites yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">You haven't added any items to your favorites yet.</p>
                  <Link to="/" className="inline-block bg-foodsy-orange hover:bg-foodsy-orange/90 text-white font-semibold py-2 px-6 rounded-full">
                    Explore Menu
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal information below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProfileUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;