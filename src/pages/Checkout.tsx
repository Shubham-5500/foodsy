
import { IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tl from-foodsy-green/5 to-foodsy-orange/10 flex items-center justify-center px-2">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <IndianRupee className="text-foodsy-orange" size={32} />
          <h2 className="text-2xl font-extrabold text-gray-900">Checkout</h2>
        </div>
        <div className="flex-1">
          {/* In real app, this info would come from store/cart context */}
          <div className="bg-gray-50 rounded-lg p-5 shadow-inner mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-semibold">Total (with GST 18% &amp; Delivery Fee)</span>
              <span className="font-extrabold text-lg text-foodsy-green">₹0.00</span>
            </div>
            <div className="text-xs text-gray-500">
              Cart state management is needed to show amount here. <br />
              Please continue to simulate a completed order.
            </div>
          </div>
          <form>
            <div className="mb-5 grid gap-3">
              <input type="text" className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-foodsy-orange w-full" placeholder="Full Name" />
              <input type="text" className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-foodsy-orange w-full" placeholder="Delivery Address" />
              <input type="text" className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-foodsy-orange w-full" placeholder="Mobile Number" />
            </div>
            <Button
              type="button"
              className="w-full bg-foodsy-orange hover:bg-foodsy-green transition text-white py-3 text-lg rounded-lg font-bold shadow-lg"
              onClick={() => navigate('/order-success')}
            >
              Pay &amp; Place Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
