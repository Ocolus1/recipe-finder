import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Recipe } from '@/lib/types';
import { Button } from './button';
import { Card, CardContent, CardFooter } from './card';

interface RecipeCardProps {
	recipe: Recipe;
	onFavoriteToggle: (recipe: Recipe) => void;
	isFavorited: boolean;
}

export function RecipeCard({
	recipe,
	onFavoriteToggle,
	isFavorited,
}: RecipeCardProps) {
	return (
		<Card className="overflow-hidden">
			<Link href={`/recipes/${recipe.id}`}>
				<div className="relative aspect-[4/3]">
					<Image
						src={recipe.image}
						alt={recipe.title}
						fill
						className="object-cover transition-transform hover:scale-105"
					/>
				</div>
			</Link>
			<CardContent className="p-4">
				<Link
					href={`/recipes/${recipe.id}`}
					className="hover:underline"
				>
					<h3 className="font-semibold text-lg line-clamp-2">
						{recipe.title}
					</h3>
				</Link>
				<div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
					<span>{recipe.readyInMinutes} mins</span>
					<span>{recipe.servings} servings</span>
				</div>
			</CardContent>
			<CardFooter className="p-4 pt-0 flex justify-between items-center">
				<div className="flex flex-wrap gap-2">
					{recipe.diets?.slice(0, 2).map((diet) => (
						<span
							key={diet}
							className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
						>
							{diet}
						</span>
					))}
				</div>
				<Button
					variant="ghost"
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						onFavoriteToggle(recipe);
					}}
					className={isFavorited ? 'text-red-500' : ''}
				>
					<Heart
						className="h-5 w-5"
						fill={isFavorited ? 'currentColor' : 'none'}
					/>
				</Button>
			</CardFooter>
		</Card>
	);
}
