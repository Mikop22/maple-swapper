interface Product {
  name: string;
  category: string;
  brand: string;
}

// Mock data for demonstration
const canadianProducts: Product[] = [
  { name: "President's Choice Butter", category: "Dairy", brand: "President's Choice" },
  { name: "Chapman's Ice Cream", category: "Dairy", brand: "Chapman's" },
  { name: "Maple Leaf Bacon", category: "Meat", brand: "Maple Leaf" },
  { name: "Compliments Bread", category: "Bakery", brand: "Compliments" },
  { name: "Great Value Milk", category: "Dairy", brand: "Great Value" },
];

const americanProducts: Product[] = [
  { name: "Land O'Lakes Butter", category: "Dairy", brand: "Land O'Lakes" },
  { name: "Breyers Ice Cream", category: "Dairy", brand: "Breyers" },
  { name: "Oscar Mayer Bacon", category: "Meat", brand: "Oscar Mayer" },
  { name: "Wonder Bread", category: "Bakery", brand: "Wonder" },
  { name: "Kroger Milk", category: "Dairy", brand: "Kroger" },
];

export const getCanadianProducts = (): Product[] => {
  return canadianProducts;
};

export const findProductByName = (name: string): Product | undefined => {
  return americanProducts.find(p => 
    p.name.toLowerCase().includes(name.toLowerCase()) ||
    p.brand.toLowerCase().includes(name.toLowerCase())
  );
};

export const analyzeGroceryList = async (items: string[]): Promise<{
  recommendedProducts: string[];
  brandsToAvoid: string[];
  brandsToLookFor: string[];
  insights: string;
}> => {
  // Mock analysis for demonstration
  const brandsToAvoid = Array.from(new Set(
    items
      .map(item => findProductByName(item))
      .filter((p): p is Product => p !== undefined)
      .map(p => p.brand)
  ));

  const brandsToLookFor = Array.from(new Set(
    canadianProducts
      .filter(p => items.some(item => 
        findProductByName(item)?.category === p.category
      ))
      .map(p => p.brand)
  ));

  const recommendedProducts = canadianProducts
    .filter(p => items.some(item => 
      findProductByName(item)?.category === p.category
    ))
    .map(p => p.name);

  return {
    recommendedProducts,
    brandsToAvoid,
    brandsToLookFor,
    insights: "Consider choosing Canadian brands for better local support and potentially different ingredients or standards."
  };
}; 