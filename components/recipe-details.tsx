'use client';

import { Recipe } from '@/lib/types';
import { RecipeHeader } from './recipe/recipe-header';
import { RecipeIngredients } from './recipe/recipe-ingredients';
import { RecipeInstructions } from './recipe/recipe-instructions';
import { useFavorites } from '@/lib/hooks/use-favorites';
import { Button } from './ui/button';

interface RecipeDetailsProps {
  recipe: Recipe;
}

export function RecipeDetails({ recipe }: RecipeDetailsProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.some((fav) => fav.id === recipe.id);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <RecipeHeader recipe={recipe} />
        
        <div className="flex justify-end mb-6">
          <Button
            variant="ghost"
            onClick={() => toggleFavorite(recipe)}
            className={isFavorited ? 'text-red-500' : ''}
          >
            {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </div>

        <div className="prose max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        </div>

        <RecipeIngredients recipe={recipe} />
        <RecipeInstructions recipe={recipe} />
      </div>
    </main>
  );
}