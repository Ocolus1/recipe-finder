'use client';

import { useState } from 'react';
import { Recipe, SearchFilters } from '@/lib/types';
import { SearchFiltersComponent } from '@/components/search-filters';
import { RecipeCard } from '@/components/ui/recipe-card';
import { Button } from '@/components/ui/button';
import { useRecipeSearch } from '@/lib/hooks/use-recipe-search';
import { useFavorites } from '@/lib/hooks/use-favorites';

const INITIAL_FILTERS: SearchFilters = {
  query: '',
  cuisine: undefined,
  diet: undefined,
  type: undefined,
};

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>(INITIAL_FILTERS);
  const { results, loading, search } = useRecipeSearch();
  const { favorites, toggleFavorite } = useFavorites();

  const handleLoadMore = () => {
    if (results) {
      search(filters, results.results.length);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Recipe Finder</h1>
      
      <SearchFiltersComponent
        filters={filters}
        onFilterChange={setFilters}
        onSearch={() => search(filters)}
      />

      {loading && results?.results.length === 0 ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[400px] bg-muted animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : results?.results ? (
        <>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.results.map((recipe: Recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onFavoriteToggle={toggleFavorite}
                isFavorited={favorites.some((fav) => fav.id === recipe.id)}
              />
            ))}
          </div>
          {results.totalResults > results.results.length && (
            <div className="mt-8 flex justify-center">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 text-center text-muted-foreground">
          Search for recipes to get started
        </div>
      )}
    </main>
  );
}