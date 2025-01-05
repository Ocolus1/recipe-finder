import { Recipe } from '@/lib/types';
import { RecipeCard } from '@/components/ui/recipe-card';
import { Button } from '@/components/ui/button';

interface RecipeGridProps {
	title: string;
	recipes: Recipe[] | null;
	loading: boolean;
	onFavoriteToggle: (recipe: Recipe) => void;
	favorites: Recipe[];
	onLoadMore?: () => void;
	hasMore?: boolean;
}

export function RecipeGrid({
	title,
	recipes,
	loading,
	onFavoriteToggle,
	favorites,
	onLoadMore,
	hasMore,
}: RecipeGridProps) {
	if (loading && !recipes?.length) {
		return (
			<div className="mt-8">
				<h2 className="text-2xl font-semibold mb-6">{title}</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className="h-[400px] bg-muted animate-pulse rounded-lg"
						/>
					))}
				</div>
			</div>
		);
	}

	if (!recipes?.length) {
		return (
			<div className="mt-8 text-center text-muted-foreground">
				No recipes found
			</div>
		);
	}

	return (
		<div className="mt-8">
			<h2 className="text-2xl font-semibold mb-6">{title}</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{recipes.map((recipe) => (
					<RecipeCard
						key={recipe.id}
						recipe={recipe}
						onFavoriteToggle={onFavoriteToggle}
						isFavorited={favorites.some(
							(fav) => fav.id === recipe.id
						)}
					/>
				))}
			</div>
			{onLoadMore && hasMore && (
				<div className="mt-8 flex justify-center">
					<Button
						variant="outline"
						onClick={onLoadMore}
						disabled={loading}
					>
						{loading ? 'Loading...' : 'Load More'}
					</Button>
				</div>
			)}
		</div>
	);
}
