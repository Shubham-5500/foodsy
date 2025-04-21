import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { categories } from '@/data/mockData';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const SearchBar = ({ onSearch, onCategoryChange, selectedCategory }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-1">
      <div className="relative flex items-center w-full gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for food..."
            className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-full focus:ring-foodsy-orange focus:border-foodsy-orange shadow-inner bg-white/80 text-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search food"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-foodsy-orange hover:bg-foodsy-orange/90 text-white rounded-full px-6 py-3 font-semibold shadow-md"
        >
          Search
        </Button>
        <Button
          variant="ghost"
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Filter categories"
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Filter className="h-5 w-5 text-gray-700" />
        </Button>
      </div>
      {/* Filter Categories */}
      {showFilters && (
        <div className="mt-4 animate-fade-in">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => onCategoryChange(category.name)}
                variant={selectedCategory === category.name ? "default" : "outline"}
                className={`rounded-full px-4 py-2 shadow-sm transition-all ${
                  selectedCategory === category.name 
                    ? "bg-foodsy-orange text-white" 
                    : "bg-white hover:bg-foodsy-orange/10"
                }`}
                aria-pressed={selectedCategory === category.name}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
