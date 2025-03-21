
import { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import { useRecipes } from '@/hooks/useRecipes';
import { MealPlan } from '@/lib/types';
import { mealPlans as initialMealPlans } from '@/lib/data';
import { cn } from '@/lib/utils';

const MealPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealPlans, setMealPlans] = useState<MealPlan[]>(initialMealPlans);
  const { getRecipeById } = useRecipes();
  
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  const weekDays = [...Array(7)].map((_, index) => {
    return addDays(startOfCurrentWeek, index);
  });
  
  const navigateToPreviousWeek = () => {
    setCurrentDate(addDays(startOfCurrentWeek, -7));
  };
  
  const navigateToNextWeek = () => {
    setCurrentDate(addDays(startOfCurrentWeek, 7));
  };
  
  const getMealsForDay = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return mealPlans.filter(plan => plan.date === formattedDate);
  };
  
  return (
    <Layout>
      <div className="pt-16 pb-10">
        <div className="max-w-3xl mx-auto text-center mb-10 pt-6 animate-slide-in">
          <h1 className="text-4xl font-serif mb-3">Meal Planner</h1>
          <p className="text-muted-foreground">
            Plan your meals for the week and never wonder what's for dinner
          </p>
        </div>
        
        <div className="bg-card rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <button
              onClick={navigateToPreviousWeek}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Previous week"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <h2 className="text-lg font-medium">
              {format(startOfCurrentWeek, 'MMMM d')} - {format(addDays(startOfCurrentWeek, 6), 'MMMM d, yyyy')}
            </h2>
            
            <button
              onClick={navigateToNextWeek}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Next week"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 border-b">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "p-3 text-center border-r last:border-r-0",
                  isSameDay(day, new Date()) && "bg-accent"
                )}
              >
                <div className="text-sm font-medium">{format(day, 'EEE')}</div>
                <div className={cn(
                  "w-8 h-8 mx-auto flex items-center justify-center rounded-full",
                  isSameDay(day, new Date()) && "bg-primary text-primary-foreground"
                )}>
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 divide-x min-h-[500px]">
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className="flex flex-col divide-y">
                {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                  const meal = getMealsForDay(day).find(m => m.mealType === mealType);
                  const recipe = meal ? getRecipeById(meal.recipeId) : null;
                  
                  return (
                    <div key={mealType} className="p-2 h-40 flex flex-col">
                      <div className="text-xs font-medium uppercase text-muted-foreground mb-1">
                        {mealType}
                      </div>
                      
                      {recipe ? (
                        <div className="flex flex-col flex-1 group relative bg-muted/40 rounded-lg p-2 text-sm hover:bg-muted transition-colors">
                          <div className="font-medium line-clamp-2">{recipe.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {recipe.prepTime + recipe.cookTime} min
                          </div>
                          <div className="mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-xs text-primary hover:underline">
                              Edit
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button className="flex items-center justify-center flex-1 rounded-lg border border-dashed border-muted-foreground/30 text-muted-foreground hover:bg-muted/50 transition-colors">
                          <Plus className="w-4 h-4 mr-1" />
                          <span className="text-xs">Add meal</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MealPlanner;
