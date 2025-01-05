'use client';

import { Search, Loader2 } from 'lucide-react';
import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/select';
import { SearchFilters } from '@/lib/types';

const cuisines = [
	'Italian',
	'Mexican',
	'Chinese',
	'Indian',
	'Japanese',
	'Thai',
	'Mediterranean',
	'French',
	'Greek',
];

const diets = [
	'Vegetarian',
	'Vegan',
	'Gluten Free',
	'Ketogenic',
	'Paleo',
	'Pescetarian',
];

const mealTypes = [
	'Main Course',
	'Side Dish',
	'Dessert',
	'Appetizer',
	'Salad',
	'Soup',
	'Breakfast',
	'Snack',
];

interface SearchFiltersProps {
	filters: SearchFilters;
	onFilterChange: (filters: SearchFilters) => void;
	onSearch: () => void;
	loading?: boolean;
}

export function SearchFiltersComponent({
	filters,
	onFilterChange,
	onSearch,
	loading = false,
}: SearchFiltersProps) {
	const handleInputChange = useCallback(
		(key: keyof SearchFilters, value: string) => {
			onFilterChange({ ...filters, [key]: value });
		},
		[filters, onFilterChange]
	);

	return (
		<div className="flex flex-col gap-4 p-4 bg-card rounded-lg shadow-sm">
			<div className="flex gap-4">
				<div className="flex-1 relative">
					<Input
						placeholder="Search recipes..."
						value={filters.query}
						onChange={(e) =>
							handleInputChange('query', e.target.value)
						}
						className="pl-10"
						disabled={loading}
					/>
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				</div>
				<Button onClick={onSearch} disabled={loading}>
					{loading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Searching...
						</>
					) : (
						'Search'
					)}
				</Button>
			</div>
			{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Select
					value={filters.cuisine}
					onValueChange={(value) =>
						handleInputChange('cuisine', value)
					}
					disabled={loading}
				>
					<SelectTrigger>
						<SelectValue placeholder="Cuisine" />
					</SelectTrigger>
					<SelectContent>
						{cuisines.map((cuisine) => (
							<SelectItem
								key={cuisine}
								value={cuisine.toLowerCase()}
							>
								{cuisine}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					value={filters.diet}
					onValueChange={(value) => handleInputChange('diet', value)}
					disabled={loading}
				>
					<SelectTrigger>
						<SelectValue placeholder="Diet" />
					</SelectTrigger>
					<SelectContent>
						{diets.map((diet) => (
							<SelectItem key={diet} value={diet.toLowerCase()}>
								{diet}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					value={filters.type}
					onValueChange={(value) => handleInputChange('type', value)}
					disabled={loading}
				>
					<SelectTrigger>
						<SelectValue placeholder="Meal Type" />
					</SelectTrigger>
					<SelectContent>
						{mealTypes.map((type) => (
							<SelectItem key={type} value={type.toLowerCase()}>
								{type}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div> */}
		</div>
	);
}
