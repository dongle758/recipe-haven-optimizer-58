
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useRecipes } from '@/hooks/useRecipes';
import { shoppingList as initialShoppingList } from '@/lib/data';
import { ShoppingItem } from '@/lib/types';
import { Check, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(initialShoppingList);
  const [newItemName, setNewItemName] = useState('');
  const { getRecipeById } = useRecipes();
  
  const toggleItem = (id: string) => {
    setShoppingList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };
  
  const addNewItem = () => {
    if (newItemName.trim() === '') return;
    
    const newItem: ShoppingItem = {
      id: `new-${Date.now()}`,
      ingredientId: `new-${Date.now()}`,
      name: newItemName,
      quantity: 1,
      unit: '',
      checked: false,
      recipeId: ''
    };
    
    setShoppingList(prev => [newItem, ...prev]);
    setNewItemName('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addNewItem();
    }
  };
  
  // Group items by recipe
  const itemsByRecipe = shoppingList.reduce<Record<string, ShoppingItem[]>>(
    (acc, item) => {
      const key = item.recipeId || 'custom';
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {}
  );
  
  return (
    <Layout>
      <div className="pt-16 pb-10">
        <div className="max-w-3xl mx-auto text-center mb-10 pt-6 animate-slide-in">
          <h1 className="text-4xl font-serif mb-3">Shopping List</h1>
          <p className="text-muted-foreground">
            Keep track of ingredients you need for your planned recipes
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex">
              <input
                type="text"
                placeholder="Add new item..."
                className="flex-1 p-2 border border-input rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={addNewItem}
                disabled={newItemName.trim() === ''}
                className="bg-primary text-primary-foreground px-4 rounded-r-lg disabled:opacity-50"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="divide-y">
            {Object.entries(itemsByRecipe).map(([recipeId, items]) => {
              const recipe = recipeId !== 'custom' ? getRecipeById(recipeId) : null;
              
              return (
                <div key={recipeId} className="p-4">
                  {recipe && (
                    <h3 className="text-sm font-medium mb-2">
                      From: {recipe.title}
                    </h3>
                  )}
                  
                  <ul className="space-y-2">
                    {items.map(item => (
                      <li key={item.id} className="flex items-center group">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center mr-3 flex-shrink-0",
                            item.checked
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-input"
                          )}
                        >
                          {item.checked && <Check className="w-3 h-3" />}
                        </button>
                        
                        <span className={cn(
                          "flex-1",
                          item.checked && "line-through text-muted-foreground"
                        )}>
                          {item.quantity > 0 && (
                            <span className="font-medium mr-1">
                              {item.quantity} {item.unit}
                            </span>
                          )}
                          {item.name}
                        </span>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            
            {shoppingList.length === 0 && (
              <div className="py-10 text-center text-muted-foreground">
                <p>Your shopping list is empty</p>
                <p className="text-sm mt-1">Add items or select recipes to generate a list</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShoppingList;
