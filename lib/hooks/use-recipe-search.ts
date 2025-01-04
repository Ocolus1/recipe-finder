'use client';

import { useCallback, useState } from 'react';
import { SearchFilters, SearchResults } from '@/lib/types';
import { searchRecipes } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useRecipeSearch() {
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const search = useCallback(async (filters: SearchFilters, offset = 0) => {
    try {
      setLoading(true);
      const newResults = await searchRecipes(filters, offset);
      
      setResults((prev) => 
        offset > 0 && prev 
          ? { 
              ...newResults, 
              results: [...prev.results, ...newResults.results] 
            }
          : newResults
      );
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch recipes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return { results, loading, search };
}