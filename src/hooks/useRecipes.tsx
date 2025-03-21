
import { useState, useEffect, useMemo } from 'react';
import { Recipe, Category } from '@/lib/types';
import { recipes as initialRecipes, categories as initialCategories } from '@/lib/data';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<boolean>(false);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Filter by search query
      const matchesSearch = searchQuery === '' || 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by selected categories
      const matchesCategories = selectedCategories.length === 0 || 
        selectedCategories.some(catId => recipe.categories.includes(catId));
      
      // Filter by favorites
      const matchesFavorites = !favorites || recipe.favorite;
      
      return matchesSearch && matchesCategories && matchesFavorites;
    });
  }, [recipes, selectedCategories, searchQuery, favorites]);

  const toggleFavorite = (recipeId: string) => {
    setRecipes(prev => 
      prev.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, favorite: !recipe.favorite } 
          : recipe
      )
    );
  };

  const toggleCategoryFilter = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setFavorites(false);
  };

  const getCategoryById = (categoryId: string) => {
    return categories.find(category => category.id === categoryId);
  };

  const getRecipeById = (recipeId: string) => {
    return recipes.find(recipe => recipe.id === recipeId);
  };

  return {
    recipes,
    filteredRecipes,
    categories,
    selectedCategories,
    searchQuery,
    favorites,
    setSearchQuery,
    toggleFavorite,
    toggleCategoryFilter,
    clearFilters,
    setFavorites,
    getCategoryById,
    getRecipeById
  };
}
