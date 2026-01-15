import { loadDefaultCSVData } from '@/lib/csvParser';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  origin: 'US' | 'Canada';
  image: string;
  price?: number;
}

// Initial sample data for demonstration (will be used as fallback)
const initialAmericanProducts: Product[] = [
  {
    id: 'a1',
    name: 'Wonder Bread',
    brand: 'Wonder',
    category: 'Bakery',
    origin: 'US',
    image: '/placeholder.svg',
    price: 3.99,
  },
  {
    id: 'a2',
    name: 'Heinz Ketchup',
    brand: 'Heinz',
    category: 'Condiments',
    origin: 'US',
    image: '/placeholder.svg',
    price: 4.49,
  },
  {
    id: 'a3',
    name: 'Jiffy Peanut Butter',
    brand: 'Jiffy',
    category: 'Spreads',
    origin: 'US',
    image: '/placeholder.svg',
    price: 5.99,  
  },
  {
    id: 'a4',
    name: 'Tropicana Orange Juice',
    brand: 'Tropicana',
    category: 'Beverages',
    origin: 'US',
    image: '/placeholder.svg',
    price: 4.99,
  },
  {
    id: 'a5',
    name: 'Post Honey Bunches of Oats',
    brand: 'Post',
    category: 'Cereal',
    origin: 'US',
    image: '/placeholder.svg',
    price: 5.49,
  },
  {
    id: 'a6',
    name: 'Land O\'Lakes Butter',
    brand: 'Land O\'Lakes',
    category: 'Dairy',
    origin: 'US',
    image: '/placeholder.svg',
    price: 6.99,
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
  },
  {
    id: 'c2',
    name: 'French\'s Ketchup',
    brand: 'French\'s',
    category: 'Condiments',
    origin: 'Canada',
    image: '/placeholder.svg',
    price: 4.29,
  
  },
  {
    id: 'c3',
    name: 'Kraft Peanut Butter',
    brand: 'Kraft',
    category: 'Spreads',
    origin: 'Canada',
    image: '/placeholder.svg',
    price: 5.49,
  },
  {
    id: 'c4',
    name: 'Oasis Orange Juice',
    brand: 'Oasis',
    category: 'Beverages',
    origin: 'Canada',
    image: '/placeholder.svg',
    price: 4.79,
  },
  {
    id: 'c5',
    name: 'Nature\'s Path Cereal',
    brand: 'Nature\'s Path',
    category: 'Cereal',
    origin: 'Canada',
    image: '/placeholder.svg',
    price: 5.99,
  },
  {
    id: 'c6',
    name: 'Gay Lea Butter',
    brand: 'Gay Lea',
    category: 'Dairy',
    origin: 'Canada',
    image: '/placeholder.svg',
    price: 6.49,
  }
];

// Initialize with default data
let americanProducts: Product[] = [...initialAmericanProducts];
let canadianAlternatives: Product[] = [...initialCanadianAlternatives];

// Since loadDefaultCSVData returns a Promise, we need to load the data asynchronously
// Initialize data loading but don't wait for it to complete
const loadData = async () => {
  try {
    const data = await loadDefaultCSVData();
    
    // Check if the returned data has the expected structure
    if (data && data.americanProducts && Array.isArray(data.americanProducts)) {
      americanProducts = data.americanProducts;
    }
    
    if (data && data.canadianAlternatives && Array.isArray(data.canadianAlternatives)) {
      canadianAlternatives = data.canadianAlternatives;
    }
    
    console.log('CSV data loaded successfully');
  } catch (error) {
    console.error('Failed to load CSV data, using initial sample data instead:', error);
  }
};

// Start loading the data but don't block
loadData();

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
  
  // Search in both American and Canadian products
  return [...americanProducts, ...canadianAlternatives].find(
    product => product.name.toLowerCase().includes(normalizedName) || 
    product.brand.toLowerCase().includes(normalizedName)
  );
};

// Update product data from CSV upload
export const updateProductData = (
  newAmericanProducts: Product[],
  newCanadianAlternatives: Product[]
): void => {
  if (Array.isArray(newAmericanProducts) && newAmericanProducts.length > 0) {
    americanProducts = newAmericanProducts;
  }
  
  if (Array.isArray(newCanadianAlternatives) && newCanadianAlternatives.length > 0) {
    canadianAlternatives = newCanadianAlternatives;
  }
};