import { Card } from '@/components/ui/card';
import { Recipe } from '@/lib/types';

interface RecipeInstructionsProps {
  recipe: Recipe;
}

export function RecipeInstructions({ recipe }: RecipeInstructionsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
      {recipe.analyzedInstructions?.[0]?.steps ? (
        <ol className="space-y-4">
          {recipe.analyzedInstructions[0].steps.map((step) => (
            <li key={step.number} className="flex gap-4">
              <span className="font-bold text-muted-foreground min-w-[2rem]">
                {step.number}.
              </span>
              <p>{step.step}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-muted-foreground">No instructions available.</p>
      )}
    </Card>
  );
}