
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  categories: string[];
  ingredients: Ingredient[];
  instructions: string[];
  notes?: string;
  favorite: boolean;
  createdAt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface MealPlan {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipeId: string;
}

export interface ShoppingItem {
  id: string;
  ingredientId: string;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  recipeId: string;
}
