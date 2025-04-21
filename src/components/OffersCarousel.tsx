import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { offers } from '@/data/mockData';

const OffersCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };

  useEffect(() => {
    let intervalId: number;
    if (isAutoPlaying) {
      intervalId = window.setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, currentSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-[250px] md:h-[400px]">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95'
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div className={`absolute inset-0 ${offer.color} bg-opacity-80 z-0`} />
            <img
              src={offer.image}
              alt={offer.title}
              loading="lazy"
              className="w-full h-full object-cover object-center opacity-60 blur-[1px] scale-110"
              draggable={false}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 text-center z-20">
              <h2 className="text-white text-2xl md:text-4xl font-bold tracking-tight mb-1 drop-shadow-xl">{offer.title}</h2>
              <p className="text-white text-lg md:text-xl mb-6 drop-shadow-md max-w-2xl mx-auto">{offer.description}</p>
              <Button className="bg-white text-foodsy-orange font-semibold rounded-full px-8 py-3 hover:bg-gray-50 shadow-lg transition">Order Now</Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Previous offer"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-foodsy-orange/70 text-foodsy-orange hover:text-white border border-white/80 backdrop-blur z-20 shadow-md"
        onClick={prevSlide}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Next offer"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-foodsy-orange/70 text-foodsy-orange hover:text-white border border-white/80 backdrop-blur z-20 shadow-md"
        onClick={nextSlide}
      >
        <ArrowRight className="h-6 w-6" />
      </Button>
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full shadow-md border-2 ${currentSlide === index ? 'bg-white border-foodsy-orange scale-125' : 'bg-white/60 border-white/80'} transition-all`}
            aria-label={`Go to offer ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OffersCarousel;
