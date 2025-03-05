
import { useState } from 'react';
import { Product } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MapleLeaf, Info } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  className?: string;
}

const ProductCard = ({ product, compact = false, className }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 ease-out",
        isHovered ? "shadow-lg transform -translate-y-1" : "shadow-sm",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
        <img 
          src={product.image} 
          alt={product.name}
          className={cn(
            "object-cover w-full h-full transition-transform duration-300",
            isHovered ? "scale-105" : "scale-100"
          )}
          loading="lazy"
        />
        {product.origin === 'Canada' && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/70 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
            <MapleLeaf className="h-3.5 w-3.5 text-canada-red" />
            <span className="text-xs font-medium">Canadian</span>
          </div>
        )}
      </div>
      
      <CardContent className={cn(
        "flex flex-col",
        compact ? "p-3" : "p-4"
      )}>
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className={cn(
            "font-medium text-gray-900 dark:text-gray-100 leading-tight",
            compact ? "text-sm" : "text-base"
          )}>
            {product.name}
          </h3>
          {!compact && (
            <Badge variant="outline" className="text-xs bg-transparent">
              {product.category}
            </Badge>
          )}
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {product.brand}
        </p>
        
        {!compact && product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-2">
          {product.price && (
            <span className={cn(
              "font-medium text-gray-900 dark:text-gray-100",
              compact ? "text-sm" : "text-base"
            )}>
              ${product.price.toFixed(2)}
            </span>
          )}
          
          {!compact && (
            <button 
              className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors"
              aria-label="More information"
            >
              <Info className="h-4 w-4" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
