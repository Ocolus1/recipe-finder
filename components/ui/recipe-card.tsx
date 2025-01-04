'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Recipe } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RecipeCardProps {
  recipe: Recipe;
  onFavoriteToggle: (recipe: Recipe) => void;
  isFavorited: boolean;
}

export function RecipeCard({ recipe, onFavoriteToggle, isFavorited }: RecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
		<Card
			className="overflow-hidden transition-all duration-300 hover:shadow-lg"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Link href={`/recipes/${recipe.id}`}>
				<CardHeader className="p-0 relative aspect-[4/3]">
					<Image
						src={recipe.image}
						alt={recipe.title}
						fill
						className={cn(
							'object-cover transition-transform duration-300',
							isHovered && 'scale-105'
						)}
						sizes="(max-width: 768px) 100vw, 33vw"
					/>
				</CardHeader>
				<CardContent className="p-4">
					<h3 className="font-semibold text-lg mb-2 line-clamp-2">
						{recipe.title}
					</h3>
					<div className="flex flex-wrap gap-2 mb-2">
						{recipe.cuisines?.slice(0, 2).map((cuisine) => (
							<Badge key={cuisine} variant="secondary">
								{cuisine}
							</Badge>
						))}
					</div>
					<div className="flex items-center gap-4 text-sm text-muted-foreground">
						<span>{recipe.readyInMinutes} mins</span>
						<span>{recipe.servings} servings</span>
					</div>
				</CardContent>
			</Link>
			<CardFooter className="p-4 pt-0">
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						'ml-auto transition-colors',
						isFavorited && 'text-red-500 hover:text-red-600'
					)}
					onClick={() => onFavoriteToggle(recipe)}
				>
					<Heart
						className={cn('h-5 w-5', isFavorited && 'fill-current')}
					/>
				</Button>
			</CardFooter>
		</Card>
  );
}