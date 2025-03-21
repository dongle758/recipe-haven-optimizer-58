
import { Recipe, Category, MealPlan, ShoppingItem } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Breakfast', color: '#FFD699' },
  { id: '2', name: 'Lunch', color: '#BBDEFB' },
  { id: '3', name: 'Dinner', color: '#C8E6C9' },
  { id: '4', name: 'Dessert', color: '#F8BBD0' },
  { id: '5', name: 'Vegetarian', color: '#DCEDC8' },
  { id: '6', name: 'Vegan', color: '#B3E5FC' },
  { id: '7', name: 'Gluten-Free', color: '#E1BEE7' },
  { id: '8', name: 'Quick & Easy', color: '#D7CCC8' },
];

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Avocado Toast',
    description: 'A simple, nutritious breakfast that\'s ready in minutes.',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?q=80&w=1000&auto=format&fit=crop',
    prepTime: 5,
    cookTime: 2,
    servings: 1,
    difficulty: 'Easy',
    categories: ['1', '5', '6', '8'],
    ingredients: [
      { id: '1-1', name: 'Bread', quantity: 1, unit: 'slice' },
      { id: '1-2', name: 'Avocado', quantity: 0.5, unit: 'whole' },
      { id: '1-3', name: 'Salt', quantity: 1, unit: 'pinch' },
      { id: '1-4', name: 'Red pepper flakes', quantity: 1, unit: 'pinch' },
      { id: '1-5', name: 'Lemon juice', quantity: 1, unit: 'tsp' },
    ],
    instructions: [
      'Toast the bread until golden and firm.',
      'Remove the pit from the avocado and scoop the flesh into a bowl.',
      'Add lemon juice, salt, and mash with a fork.',
      'Spread the mashed avocado over the toast.',
      'Sprinkle with red pepper flakes and additional salt to taste.'
    ],
    notes: 'For extra flavor, try adding poached eggs, cherry tomatoes, or feta cheese on top.',
    favorite: true,
    createdAt: '2023-04-12T10:22:33Z'
  },
  {
    id: '2',
    title: 'Mediterranean Quinoa Bowl',
    description: 'A protein-packed, fresh bowl with Mediterranean flavors.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: 'Medium',
    categories: ['2', '5', '7'],
    ingredients: [
      { id: '2-1', name: 'Quinoa', quantity: 1, unit: 'cup' },
      { id: '2-2', name: 'Cucumber', quantity: 1, unit: 'medium' },
      { id: '2-3', name: 'Cherry tomatoes', quantity: 1, unit: 'cup' },
      { id: '2-4', name: 'Red onion', quantity: 0.25, unit: 'medium' },
      { id: '2-5', name: 'Kalamata olives', quantity: 0.5, unit: 'cup' },
      { id: '2-6', name: 'Feta cheese', quantity: 0.5, unit: 'cup' },
      { id: '2-7', name: 'Olive oil', quantity: 2, unit: 'tbsp' },
      { id: '2-8', name: 'Lemon juice', quantity: 2, unit: 'tbsp' },
      { id: '2-9', name: 'Garlic', quantity: 1, unit: 'clove' },
      { id: '2-10', name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { id: '2-11', name: 'Black pepper', quantity: 0.25, unit: 'tsp' },
    ],
    instructions: [
      'Rinse quinoa under cold water. Combine with 2 cups water in a saucepan, bring to a boil.',
      'Reduce heat, cover, and simmer for 15 minutes until water is absorbed.',
      'While quinoa cooks, chop cucumber, halve tomatoes, mince onion, and crumble feta.',
      'In a small bowl, whisk together olive oil, lemon juice, minced garlic, salt, and pepper.',
      'Once quinoa is cooked and slightly cooled, transfer to a large bowl.',
      'Add cucumber, tomatoes, onion, olives, and dressing. Toss to combine.',
      'Top with crumbled feta cheese and serve at room temperature or chilled.'
    ],
    favorite: false,
    createdAt: '2023-03-20T16:45:12Z'
  },
  {
    id: '3',
    title: 'Lemon Garlic Roast Chicken',
    description: 'A classic and flavorful roast chicken that\'s perfect for dinner.',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1000&auto=format&fit=crop',
    prepTime: 15,
    cookTime: 75,
    servings: 4,
    difficulty: 'Medium',
    categories: ['3', '7'],
    ingredients: [
      { id: '3-1', name: 'Whole chicken', quantity: 1, unit: '4-5 lb' },
      { id: '3-2', name: 'Lemons', quantity: 2, unit: 'whole' },
      { id: '3-3', name: 'Garlic head', quantity: 1, unit: 'whole' },
      { id: '3-4', name: 'Fresh rosemary', quantity: 3, unit: 'sprigs' },
      { id: '3-5', name: 'Fresh thyme', quantity: 5, unit: 'sprigs' },
      { id: '3-6', name: 'Olive oil', quantity: 3, unit: 'tbsp' },
      { id: '3-7', name: 'Salt', quantity: 1, unit: 'tbsp' },
      { id: '3-8', name: 'Black pepper', quantity: 1, unit: 'tsp' },
      { id: '3-9', name: 'Butter', quantity: 2, unit: 'tbsp' },
    ],
    instructions: [
      'Preheat oven to 425°F (220°C).',
      'Remove giblets from chicken and pat dry with paper towels inside and out.',
      'Slice one lemon and cut the head of garlic in half crosswise.',
      'Rub the outside of the chicken with olive oil, then season generously with salt and pepper.',
      'Stuff the cavity with the lemon slices, garlic halves, and herbs.',
      'Squeeze the second lemon over the chicken and place the butter under the skin of the breast.',
      'Tie the legs together with kitchen string and tuck the wings under the body.',
      'Place chicken in a roasting pan and roast for 1 hour and 15 minutes or until juices run clear.',
      'Let rest for 15 minutes before carving and serving.'
    ],
    favorite: true,
    createdAt: '2023-05-02T19:10:45Z'
  },
  {
    id: '4',
    title: 'Classic Tiramisu',
    description: 'An elegant and rich Italian dessert with coffee-soaked ladyfingers.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop',
    prepTime: 25,
    cookTime: 0,
    servings: 8,
    difficulty: 'Medium',
    categories: ['4'],
    ingredients: [
      { id: '4-1', name: 'Espresso', quantity: 1.5, unit: 'cups' },
      { id: '4-2', name: 'Mascarpone cheese', quantity: 16, unit: 'oz' },
      { id: '4-3', name: 'Egg yolks', quantity: 6, unit: 'large' },
      { id: '4-4', name: 'Sugar', quantity: 0.75, unit: 'cup' },
      { id: '4-5', name: 'Heavy cream', quantity: 0.75, unit: 'cup' },
      { id: '4-6', name: 'Ladyfinger cookies', quantity: 24, unit: 'count' },
      { id: '4-7', name: 'Unsweetened cocoa powder', quantity: 2, unit: 'tbsp' },
      { id: '4-8', name: 'Vanilla extract', quantity: 1, unit: 'tsp' },
      { id: '4-9', name: 'Salt', quantity: 0.25, unit: 'tsp' },
    ],
    instructions: [
      'Brew espresso and let cool completely.',
      'In a large bowl, whisk egg yolks and sugar until pale yellow and doubled in volume.',
      'Add mascarpone and vanilla, beat until smooth.',
      'In a separate bowl, whip heavy cream and salt to stiff peaks.',
      'Gently fold the whipped cream into the mascarpone mixture.',
      'Dip each ladyfinger briefly into the cooled espresso and arrange in a single layer in a 9x13 inch dish.',
      'Spread half of the mascarpone mixture over the ladyfingers.',
      'Add another layer of espresso-dipped ladyfingers.',
      'Top with the remaining mascarpone mixture and smooth the surface.',
      'Dust with cocoa powder and refrigerate for at least 6 hours or overnight before serving.'
    ],
    favorite: false,
    createdAt: '2023-02-14T12:30:15Z'
  },
  {
    id: '5',
    title: 'Vegan Chili',
    description: 'A hearty, plant-based chili that\'s loaded with veggies and flavor.',
    image: 'https://images.unsplash.com/photo-1598875184988-5e67b1a874b8?q=80&w=1000&auto=format&fit=crop',
    prepTime: 15,
    cookTime: 45,
    servings: 6,
    difficulty: 'Easy',
    categories: ['3', '5', '6', '7'],
    ingredients: [
      { id: '5-1', name: 'Olive oil', quantity: 2, unit: 'tbsp' },
      { id: '5-2', name: 'Onion', quantity: 1, unit: 'large' },
      { id: '5-3', name: 'Bell peppers', quantity: 2, unit: 'medium' },
      { id: '5-4', name: 'Garlic', quantity: 4, unit: 'cloves' },
      { id: '5-5', name: 'Chili powder', quantity: 2, unit: 'tbsp' },
      { id: '5-6', name: 'Cumin', quantity: 1, unit: 'tbsp' },
      { id: '5-7', name: 'Paprika', quantity: 1, unit: 'tsp' },
      { id: '5-8', name: 'Crushed tomatoes', quantity: 28, unit: 'oz can' },
      { id: '5-9', name: 'Black beans', quantity: 15, unit: 'oz can' },
      { id: '5-10', name: 'Kidney beans', quantity: 15, unit: 'oz can' },
      { id: '5-11', name: 'Corn kernels', quantity: 1, unit: 'cup' },
      { id: '5-12', name: 'Vegetable broth', quantity: 2, unit: 'cups' },
      { id: '5-13', name: 'Salt', quantity: 1, unit: 'tsp' },
      { id: '5-14', name: 'Black pepper', quantity: 0.5, unit: 'tsp' },
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat.',
      'Add onion and bell peppers, sauté until softened, about 5 minutes.',
      'Add garlic and cook for 1 minute until fragrant.',
      'Stir in chili powder, cumin, and paprika, cook for 30 seconds.',
      'Add crushed tomatoes, drained and rinsed beans, corn, and vegetable broth.',
      'Season with salt and pepper, then bring to a simmer.',
      'Reduce heat to low, cover, and cook for 30-40 minutes, stirring occasionally.',
      'Taste and adjust seasoning as needed.',
      'Serve hot with optional toppings like avocado, cilantro, or vegan cheese.'
    ],
    favorite: true,
    createdAt: '2023-01-08T14:22:18Z'
  },
];

export const mealPlans: MealPlan[] = [
  {
    id: '1',
    date: '2023-06-01',
    mealType: 'breakfast',
    recipeId: '1'
  },
  {
    id: '2',
    date: '2023-06-01',
    mealType: 'lunch',
    recipeId: '2'
  },
  {
    id: '3',
    date: '2023-06-01',
    mealType: 'dinner',
    recipeId: '3'
  },
  {
    id: '4',
    date: '2023-06-02',
    mealType: 'breakfast',
    recipeId: '1'
  },
  {
    id: '5',
    date: '2023-06-02',
    mealType: 'dinner',
    recipeId: '5'
  },
];

export const shoppingList: ShoppingItem[] = [
  {
    id: '1',
    ingredientId: '1-2',
    name: 'Avocado',
    quantity: 2,
    unit: 'whole',
    checked: false,
    recipeId: '1'
  },
  {
    id: '2',
    ingredientId: '1-1',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    checked: true,
    recipeId: '1'
  },
  {
    id: '3',
    ingredientId: '2-1',
    name: 'Quinoa',
    quantity: 1,
    unit: 'cup',
    checked: false,
    recipeId: '2'
  },
  {
    id: '4',
    ingredientId: '3-1',
    name: 'Whole chicken',
    quantity: 1,
    unit: '4-5 lb',
    checked: false,
    recipeId: '3'
  },
];
