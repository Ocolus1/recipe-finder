'use client';

import { Recipe } from '@/lib/types';
import { RecipeDetails } from './recipe-details';

interface RecipeDetailsClientProps {
  recipe: Recipe;
}

export function RecipeDetailsClient({ recipe }: RecipeDetailsClientProps) {
  return <RecipeDetails recipe={recipe} />;
}