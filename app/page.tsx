'use client';

import { useState, useEffect } from 'react';
import { SearchFilters, Recipe } from '@/lib/types';
import { SearchFiltersComponent } from '@/components/search-filters';
import { RecipeGrid } from '@/components/recipe-grid';
import { useRecipeSearch } from '@/lib/hooks/use-recipe-search';
import { useFavorites } from '@/lib/hooks/use-favorites';
import { getTrendingRecipes } from '@/lib/api';

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
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[] | null>(null);
  const [loadingTrending, setLoadingTrending] = useState(true);

  useEffect(() => {
    const loadTrendingRecipes = async () => {
      try {
        const data = await getTrendingRecipes();
        setTrendingRecipes(data.results);
      } catch (error) {
        console.error('Failed to load trending recipes:', error);
      } finally {
        setLoadingTrending(false);
      }
    };

    loadTrendingRecipes();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Recipe Finder</h1>
      
      <SearchFiltersComponent
        filters={filters}
        onFilterChange={setFilters}
        onSearch={() => search(filters)}
        loading={loading}
      />

      <RecipeGrid
        title={results?.results ? 'Search Results' : 'Trending Recipes'}
        recipes={results?.results || trendingRecipes}
        loading={loading || loadingTrending}
        onFavoriteToggle={toggleFavorite}
        favorites={favorites}
        onLoadMore={results ? () => search(filters, results.results.length) : undefined}
        hasMore={results ? results.totalResults > results.results.length : false}
      />
    </main>
  );
}