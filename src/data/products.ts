
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  origin: 'US' | 'Canada' | 'Other';
  image: string;
  price?: number;
  description?: string;
}

// Initial sample data for demonstration (will be replaced by CSV data when available)
const initialAmericanProducts: Product[] = [
  {
    id: 'a1',
    name: 'Wonder Bread',
    brand: 'Wonder',
    category: 'Bakery',
    origin: 'US',
    image: '/placeholder.svg',
    price: 3.99,
    description: 'Classic American white bread.'
  },
  {
    id: 'a2',
    name: 'Heinz Ketchup',
    brand: 'Heinz',
    category: 'Condiments',
    origin: 'US',
    image: '/placeholder.svg',
    price: 4.49,
    description: 'America\'s favorite ketchup.'
  },
  {
    id: 'a3',
    name: 'Jiffy Peanut Butter',
    brand: 'Jiffy',
    category: 'Spreads',
    origin: 'US',
    image: '/placeholder.svg',
    price: 5.99,
    description: 'Creamy peanut butter.'
  },
  {
    id: 'a4',
    name: 'Tropicana Orange Juice',
    brand: 'Tropicana',
    category: 'Beverages',
    origin: 'US',
    image: '/placeholder.svg',
    price: 4.99,
    description: 'Pure premium orange juice.'
  },
  {
    id: 'a5',
    name: 'Post Honey Bunches of Oats',
    brand: 'Post',
    category: 'Cereal',
    origin: 'US',
    image: '/placeholder.svg',
    price: 5.49,
    description: 'Crunchy cereal with real honey.'
  },
  {
    id: 'a6',
    name: 'Land O\'Lakes Butter',
    brand: 'Land O\'Lakes',
    category: 'Dairy',
    origin: 'US',
    image: '/placeholder.svg',
    price: 6.99,
    description: 'Premium American butter.'
  }
];

const initialCanadianAlternatives: Product[] = [
  {
    id: 'c1',
    name: 'D\'Italiano Bread',
    brand: 'D\'Italiano',
    category: 'Bakery',
    origin: 'Canada',
    image: '/placeholder.svg',
    price: 3.79,
    description: 'Canadian-made bread with Italian inspiration.'
  },
  {
    id: 'c2',
    name: 'French\'s Ketchup',
    brand: 'French\'s',
    category: 'Condiments',
    origin: 'Canada',
    image: '/placeholder.svg',
    price: 4.29,
    description: 'Made with 100% Canadian tomatoes.'
  },
  {
    id: 'c3',
    name: 'Kraft Peanut Butter',
    brand: 'Kraft',
    category: 'Spreads',
    origin: 'Canada',
    image: '/placeholder.svg',
    price: 5.49,
    description: 'Smooth peanut butter with no artificial colors.'
  },
  {
    id: 'c4',
    name: 'Oasis Orange Juice',
    brand: 'Oasis',
    category: 'Beverages',
    origin: 'Canada',
    image: '/placeholder.svg',
    price: 4.79,
    description: 'Premium orange juice made in Canada.'
  },
  {
    id: 'c5',
    name: 'Nature\'s Path Cereal',
    brand: 'Nature\'s Path',
    category: 'Cereal',
    origin: 'Canada',
    image: '/placeholder.svg',
    price: 5.99,
    description: 'Organic cereal made by a Canadian company.'
  },
  {
    id: 'c6',
    name: 'Gay Lea Butter',
    brand: 'Gay Lea',
    category: 'Dairy',
    origin: 'Canada',
    image: '/placeholder.svg',
    price: 6.49,
    description: 'Butter produced by Canadian dairy farmers.'
  }
];

// Use mutable variables that can be updated by the CSV import
let americanProducts: Product[] = [...initialAmericanProducts];
let canadianAlternatives: Product[] = [...initialCanadianAlternatives];

// Get all American products
export const getAmericanProducts = (): Product[] => {
  return americanProducts;
};

// Get all Canadian products
export const getCanadianProducts = (): Product[] => {
  return canadianAlternatives;
};

// Find a product by name (for the grocery list search)
export const findProductByName = (name: string): Product | undefined => {
  const normalizedName = name.toLowerCase().trim();
  return americanProducts.find(
    product => product.name.toLowerCase().includes(normalizedName) || 
    product.brand.toLowerCase().includes(normalizedName)
  );
};

// Update the product data from CSV import
export const updateProductData = (
  newAmericanProducts: Product[],
  newCanadianAlternatives: Product[]
) => {
  // Clear existing data
  americanProducts = [];
  canadianAlternatives = [];
  
  // Add new items
  americanProducts.push(...newAmericanProducts);
  canadianAlternatives.push(...newCanadianAlternatives);
  
  // Return the updated data
  return {
    americanProducts,
    canadianAlternatives
  };
};
