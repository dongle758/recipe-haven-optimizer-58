
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Users, ChefHat, Heart, ArrowLeft, Calendar, ShoppingCart } from 'lucide-react';
import Layout from '@/components/Layout';
import { useRecipes } from '@/hooks/useRecipes';
import { cn } from '@/lib/utils';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, toggleFavorite, getCategoryById } = useRecipes();
  const [recipe, setRecipe] = useState(id ? getRecipeById(id) : undefined);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!recipe) {
      // Recipe not found, redirect to home
      navigate('/');
    }
  }, [recipe, navigate]);

  if (!recipe) return null;

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Layout>
      <div className="pt-16 pb-10">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to recipes
        </Link>
        
        <div className="bg-card rounded-xl overflow-hidden shadow-sm">
          <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className={cn(
                "w-full h-full object-cover transition-all duration-700",
                imageLoaded ? "image-loaded" : "image-blur-loading"
              )}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-serif mb-2">{recipe.title}</h1>
              <p className="max-w-2xl text-white/90">{recipe.description}</p>
            </div>
            
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-sm transition-transform hover:scale-110"
              onClick={() => toggleFavorite(recipe.id)}
              aria-label={recipe.favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={cn(
                "w-5 h-5 transition-colors",
                recipe.favorite ? "fill-destructive text-destructive" : "text-muted-foreground"
              )} />
            </button>
          </div>
          
          <div className="px-6 py-8">
            <div className="flex flex-wrap gap-3 mb-8">
              {recipe.categories.map(categoryId => {
                const category = getCategoryById(categoryId);
                return category ? (
                  <span 
                    key={categoryId}
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.name}
                  </span>
                ) : null;
              })}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <div className="flex justify-between mb-8">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{totalTime} min</div>
                        <div className="text-xs text-muted-foreground">Total Time</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{recipe.servings}</div>
                        <div className="text-xs text-muted-foreground">Servings</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <ChefHat className="w-5 h-5 mr-2 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{recipe.difficulty}</div>
                        <div className="text-xs text-muted-foreground">Difficulty</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-serif mb-4">Ingredients</h2>
                  <ul className="space-y-2">
                    {recipe.ingredients.map(ingredient => (
                      <li key={ingredient.id} className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></div>
                        <span>
                          {ingredient.quantity} {ingredient.unit} {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex items-center justify-center px-4 py-2 bg-muted rounded-lg text-sm font-medium text-foreground hover:bg-muted/70 transition-colors">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Meal Plan
                  </button>
                  
                  <button className="flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Shopping List
                  </button>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-serif mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-xs font-medium mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
                
                {recipe.notes && (
                  <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
                    <h3 className="font-medium mb-2">Notes</h3>
                    <p className="text-muted-foreground">{recipe.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecipeDetail;
