import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';

interface FoodCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  prepTime: string;
  discount: number;
  onAddToCart: () => void;
  onRemoveFromCart?: () => void;
  quantity?: number;
}

const formatRupees = (amount: number) =>
  '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2 });

const FoodCard = ({
  id,
  name,
  description,
  price,
  image,
  category,
  rating,
  prepTime,
  discount,
  onAddToCart,
  onRemoveFromCart,
  quantity = 0
}: FoodCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const discountedPrice = discount > 0 ? price - (price * discount / 100) : price;

  return (
    <div
      className="bg-white/90 dark:bg-foodsy-darkGray/90 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 animate-fade-in border border-gray-100 group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-44 md:h-52 lg:h-56 overflow-hidden">
        <img 
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          loading="lazy"
          draggable={false}
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-foodsy-red text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            {discount}% OFF
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-2">
          <span className="text-white font-medium text-xs bg-foodsy-orange/90 rounded px-2 py-1">
            {category}
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-lg truncate text-gray-900 dark:text-gray-100">{name}</h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">{rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 min-h-[40px] mb-2">{description}</p>
        <div className="flex items-end justify-between mt-auto pt-2">
          <div className="flex flex-col">
            {discount > 0 ? (
              <>
                <span className="text-gray-400 line-through text-xs">{formatRupees(price)}</span>
                <span className="font-bold text-foodsy-orange text-lg">{formatRupees(discountedPrice)}</span>
              </>
            ) : (
              <span className="font-bold text-foodsy-orange text-lg">{formatRupees(price)}</span>
            )}
            <span className="text-gray-400 text-xs">{prepTime}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              size="sm"
              className={`rounded-full bg-foodsy-orange hover:bg-foodsy-orange/90 text-white transition-all flex items-center shadow-md ${isHovered ? 'scale-110' : 'scale-100'}`}
              aria-label={`Remove ${name} from cart`}
              onClick={onRemoveFromCart}
              disabled={quantity === 0}
              variant="ghost"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-2 text-base min-w-[20px] text-gray-800 dark:text-gray-200">{quantity ? quantity : ''}</span>
            <Button 
              onClick={onAddToCart}
              className={`rounded-full bg-foodsy-orange hover:bg-foodsy-orange/90 text-white transition-all flex gap-2 items-center shadow-md ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              size="sm"
              aria-label={`Add ${name} to cart`}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

