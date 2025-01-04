import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Recipe } from '@/lib/types';

interface RecipeIngredientsProps {
  recipe: Recipe;
}

export function RecipeIngredients({ recipe }: RecipeIngredientsProps) {
  return (
    <Card className="p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ul className="space-y-2">
            {recipe.extendedIngredients?.map((ingredient) => (
              <li key={ingredient.id} className="flex items-center gap-2">
                <span className="w-20 text-sm text-muted-foreground">
                  {ingredient.amount} {ingredient.unit}
                </span>
                <span>{ingredient.name}</span>
              </li>
            ))}
          </ul>
        </div>
        {recipe.image && (
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </Card>
  );
}