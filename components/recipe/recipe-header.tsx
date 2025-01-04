'use client';

import { ArrowLeft } from 'lucide-react';
// import { ArrowLeft, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/lib/types';
// import { generatePDF } from '@/lib/pdf-utils';

interface RecipeHeaderProps {
  recipe: Recipe;
}

export function RecipeHeader({ recipe }: RecipeHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        className="mr-4"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-4xl font-bold flex-1">{recipe.title}</h1>
      {/* <Button
        variant="outline"
        onClick={() => generatePDF(recipe)}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Download PDF
      </Button> */}
    </div>
  );
}