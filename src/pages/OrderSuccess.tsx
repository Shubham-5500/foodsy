import { IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-foodsy-orange/20 to-foodsy-green/10 flex items-center justify-center px-3">
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <IndianRupee className="text-foodsy-orange" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed!
        </h2>
        <p className="text-base text-gray-700 mb-6">
          Thank you for your order. Your delicious food is being prepared and will be delivered soon.
        </p>
        <Button
          className="bg-foodsy-green hover:bg-foodsy-orange text-white text-base py-2 px-8 rounded-full font-semibold shadow transition"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
