
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import RecipeCard from '@/components/RecipeCard';
import CategoryFilter from '@/components/CategoryFilter';
import { useRecipes } from '@/hooks/useRecipes';

const Index = () => {
  const {
    filteredRecipes,
    categories,
    selectedCategories,
    searchQuery,
    favorites,
    setSearchQuery,
    toggleFavorite,
    toggleCategoryFilter,
    clearFilters,
    setFavorites
  } = useRecipes();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for a smooth UI experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="pt-16">
        <div className="max-w-3xl mx-auto text-center mb-10 pt-6 animate-slide-in">
          <h1 className="text-4xl font-serif mb-3">Your Recipe Collection</h1>
          <p className="text-muted-foreground">
            Explore your personal collection of recipes, organized and ready to inspire your next meal.
          </p>
        </div>

        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            searchQuery={searchQuery}
            favorites={favorites}
            onSearchChange={setSearchQuery}
            onCategoryToggle={toggleCategoryFilter}
            onFavoritesToggle={() => setFavorites(!favorites)}
            onClearFilters={clearFilters}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 bg-muted animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="transform transition-all duration-300 hover:-translate-y-1">
                <RecipeCard
                  recipe={recipe}
                  categories={categories}
                  onFavoriteToggle={toggleFavorite}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">No recipes found matching your filters.</p>
            <button 
              onClick={clearFilters}
              className="mt-2 text-primary underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
