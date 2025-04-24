import { useState, useEffect } from 'react';
import { IndianRupee } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const formatRupees = (amount: number) =>
  '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2 });

const Cart = ({
  items,
  isOpen,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
}: CartProps) => {
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(total);
  }, [items]);

  const gst = parseFloat((subtotal * 0.18).toFixed(2));
  const deliveryFee = 40;
  const total = parseFloat((subtotal + gst + deliveryFee).toFixed(2));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-foodsy-darkGray h-full shadow-2xl animate-slide-in overflow-y-auto rounded-l-2xl border-l-4 border-foodsy-orange/80 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white z-30 border-b border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold flex items-center gap-2">
            Cart
            <span className="ml-2 bg-foodsy-orange text-white rounded-full w-7 h-7 flex items-center justify-center text-base font-bold select-none shadow">
              {items.length}
            </span>
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-gray-100"
            aria-label="Close Cart"
          >
            <span className="sr-only">Close</span>
            <svg width="22" height="22" viewBox="0 0 20 20" strokeWidth={2.2} stroke="currentColor" fill="none" className="text-gray-700"><line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/></svg>
          </Button>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          {/* EMPTY CART */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center space-y-4 text-gray-500">
              <IndianRupee size={70} className="text-gray-300 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Your cart is empty</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                Add some mouth-watering items to your cart!
              </p>
              <Button
                onClick={onClose}
                className="bg-foodsy-orange hover:bg-foodsy-orange/90 text-white px-8 py-3 rounded-full mt-2 font-semibold shadow-xl transition"
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b border-gray-100 pb-4 last:border-0 group gap-3 hover:bg-foodsy-orange/5 dark:hover:bg-foodsy-orange/20 transition rounded-lg px-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0 shadow-lg border border-gray-200"
                      loading="lazy"
                    />
                    <div className="ml-3 flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="text-base font-semibold truncate mb-0.5 text-gray-900 dark:text-gray-100">{item.name}</h3>
                        <p className="text-sm text-gray-500 font-medium">{formatRupees(item.price)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-0 bg-gray-100 dark:bg-foodsy-darkGray/70 rounded-full px-1 py-1.5 shadow-inner select-none border border-gray-200">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-600 bg-white dark:bg-foodsy-darkGray hover:text-white hover:bg-foodsy-orange/90 rounded-full shadow transition-all ring-1 ring-foodsy-orange/10"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><line x1="4" y1="9" x2="14" y2="9" /></svg>
                          </Button>
                          <span className="px-4 min-w-[30px] text-sm font-semibold text-gray-800 dark:text-gray-200 select-text">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-600 bg-white dark:bg-foodsy-darkGray hover:text-white hover:bg-foodsy-orange/90 rounded-full shadow transition-all ring-1 ring-foodsy-orange/10"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><line x1="9" y1="4" x2="9" y2="14"/><line x1="4" y1="9" x2="14" y2="9" /></svg>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" strokeWidth={2.2} stroke="currentColor" fill="none"><line x1="4" y1="4" x2="14" y2="14"/><line x1="14" y1="4" x2="4" y2="14"/></svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary & Checkout */}
              <div className="border-t border-gray-200 pt-4 space-y-2 bg-gray-50 rounded-lg p-4 shadow-inner">
                <div className="flex justify-between text-base font-medium text-gray-700">
                  <span>Subtotal</span>
                  <span>{formatRupees(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span>{formatRupees(gst)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>{formatRupees(deliveryFee)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200 font-extrabold text-lg text-foodsy-orange">
                  <span>Total</span>
                  <span>{formatRupees(total)}</span>
                </div>
              </div>
              <Button
                className="w-full mt-6 bg-foodsy-orange hover:from-foodsy-green hover:bg-foodsy-green text-white py-3 text-lg rounded-xl font-bold shadow-lg transition"
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
              >
                Proceed to Checkout
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
