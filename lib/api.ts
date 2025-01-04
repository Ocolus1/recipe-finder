const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function searchRecipes(
  filters: SearchFilters,
  offset = 0,
  limit = 12
): Promise<SearchResults> {
  const params = new URLSearchParams({
    apiKey: API_KEY || '',
    offset: offset.toString(),
    number: limit.toString(),
    query: filters.query,
    ...(filters.cuisine && { cuisine: filters.cuisine }),
    ...(filters.diet && { diet: filters.diet }),
    ...(filters.type && { type: filters.type }),
  });

  const response = await fetch(`${BASE_URL}/complexSearch?${params}&addRecipeInformation=true`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return response.json();
}

export async function getRecipeDetails(id: string): Promise<Recipe> {
  const response = await fetch(
    `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch recipe details');
  }

  return response.json();
}