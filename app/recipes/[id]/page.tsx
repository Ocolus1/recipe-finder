import { Metadata } from 'next';
import { getRecipeDetails } from '@/lib/api';
import { RecipeDetailsClient } from '@/components/recipe-details-client';

export const dynamic = "force-dynamic";

async function getRecipe(id: string) {
  try {
    return await getRecipeDetails(id);
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const recipe = await getRecipe(params.id);
  
  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    };
  }

  return {
    title: recipe.title,
    description: recipe.summary.replace(/<[^>]*>/g, '').slice(0, 160),
  };
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id);

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-destructive">Recipe not found</h1>
      </div>
    );
  }

  return <RecipeDetailsClient recipe={recipe} />;
}