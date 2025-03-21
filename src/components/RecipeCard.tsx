
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock } from 'lucide-react';
import { Recipe, Category } from '@/lib/types';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  categories: Category[];
  onFavoriteToggle: (id: string) => void;
}

const RecipeCard = ({ recipe, categories, onFavoriteToggle }: RecipeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#e2e8f0';
  };

  const totalTime = recipe.prepTime + recipe.cookTime;
  
  return (
    <div className="recipe-card group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
      <Link to={`/recipe/${recipe.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              imageLoaded ? "image-loaded" : "image-blur-loading"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{recipe.title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{recipe.description}</p>
          
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Clock className="w-4 h-4 mr-1" />
            <span>{totalTime} min</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {recipe.categories.slice(0, 3).map(categoryId => (
              <span 
                key={categoryId}
                className="text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: getCategoryColor(categoryId) }}
              >
                {getCategoryName(categoryId)}
              </span>
            ))}
            {recipe.categories.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                +{recipe.categories.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
      
      <button
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-sm transition-transform hover:scale-110"
        onClick={(e) => {
          e.preventDefault();
          onFavoriteToggle(recipe.id);
        }}
        aria-label={recipe.favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={cn(
          "w-4 h-4 transition-colors",
          recipe.favorite ? "fill-destructive text-destructive" : "text-muted-foreground"
        )} />
      </button>
    </div>
  );
};

export default RecipeCard;
