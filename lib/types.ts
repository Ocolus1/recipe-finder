export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  cuisines: string[];
  diets: string[];
  dishTypes: string[];
  extendedIngredients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
    image?: string;
  }[];
  analyzedInstructions: {
    steps: {
      number: number;
      step: string;
    }[];
  }[];
}

export interface SearchFilters {

  query: string;

  cuisine?: string;

  diet?: string;

  type?: string;

}
