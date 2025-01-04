'use client';

import { useFavorites } from '@/lib/hooks/use-favorites';
import { RecipeCard } from '@/components/ui/recipe-card';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Favorite Recipes</h1>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onFavoriteToggle={toggleFavorite}
              isFavorited={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          No favorite recipes yet. Start by adding some recipes to your favorites!
        </div>
      )}
    </main>
  );
}