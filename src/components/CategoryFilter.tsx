
import { Search, Heart, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '@/lib/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  searchQuery: string;
  favorites: boolean;
  onSearchChange: (query: string) => void;
  onCategoryToggle: (categoryId: string) => void;
  onFavoritesToggle: () => void;
  onClearFilters: () => void;
}

const CategoryFilter = ({
  categories,
  selectedCategories,
  searchQuery,
  favorites,
  onSearchChange,
  onCategoryToggle,
  onFavoritesToggle,
  onClearFilters
}: CategoryFilterProps) => {
  const hasActiveFilters = selectedCategories.length > 0 || searchQuery !== '' || favorites;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onFavoritesToggle}
          className={cn(
            "inline-flex items-center px-3 py-1.5 text-sm rounded-full transition-all",
            favorites
              ? "bg-destructive/10 text-destructive border border-destructive/20"
              : "bg-secondary text-muted-foreground border border-transparent hover:border-border"
          )}
        >
          <Heart className={cn(
            "mr-1 h-3.5 w-3.5",
            favorites ? "fill-destructive" : ""
          )} />
          Favorites
        </button>

        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryToggle(category.id)}
            className={cn(
              "text-sm px-3 py-1.5 rounded-full transition-all border",
              selectedCategories.includes(category.id)
                ? "border-primary/20 bg-primary/5 text-primary"
                : "border-transparent bg-secondary text-muted-foreground hover:border-border"
            )}
            style={selectedCategories.includes(category.id) ? {
              backgroundColor: `${category.color}40`, // Add transparency
              borderColor: category.color,
              color: 'rgba(0,0,0,0.8)'
            } : {}}
          >
            {category.name}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground hover:bg-muted/70 transition-all ml-1"
          >
            <X className="mr-1 h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
