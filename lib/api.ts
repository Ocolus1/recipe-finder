import {Recipe, SearchFilters, SearchResults } from "./types";
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
		...(filters.query && { query: filters.query }),
		...(filters.cuisine && { cuisine: filters.cuisine }),
		...(filters.diet && { diet: filters.diet }),
		...(filters.type && { type: filters.type }),
		addRecipeInformation: 'true',
		sort: 'popularity',
		instructionsRequired: 'true',
	});

	const response = await fetch(`${BASE_URL}/complexSearch?${params}`);

	if (!response.ok) {
		throw new Error('Failed to fetch recipes');
	}

	return response.json();
}

export async function getRecipeDetails(id: number): Promise<Recipe> {
	const params = new URLSearchParams({
		apiKey: API_KEY || '',
	});

	const response = await fetch(`${BASE_URL}/${id}/information?${params}`);

	if (!response.ok) {
		throw new Error('Failed to fetch recipe details');
	}

	return response.json();
}

export async function getTrendingRecipes(): Promise<SearchResults> {
	const params = new URLSearchParams({
		apiKey: API_KEY || '',
		number: '12',
		addRecipeInformation: 'true',
		sort: 'popularity',
		instructionsRequired: 'true',
	});

	const response = await fetch(`${BASE_URL}/complexSearch?${params}`);

	if (!response.ok) {
		throw new Error('Failed to fetch trending recipes');
	}

	return response.json();
}