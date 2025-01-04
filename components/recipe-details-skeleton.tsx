export function RecipeDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="h-8 bg-muted rounded w-3/4 mb-6" />
        <div className="h-[400px] bg-muted rounded-lg mb-8" />
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}