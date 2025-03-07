
import { Product } from '@/data/products';

export interface CSVProductRow {
  category: string;
  americanProduct: string;
  americanProductPrice: string;
  canadianAlternative: string;
  canadianAlternativePrice: string;
  imagePathAmerican: string;
  imagePathCanadian: string;
}

export const parseCSVToProducts = (csvData: string): { 
  americanProducts: Product[], 
  canadianAlternatives: Product[],
  alternatives: Record<string, string[]>
} => {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  
  // Skip header row
  const rows = lines.slice(1).filter(line => line.trim() !== '');
  
  const americanProducts: Product[] = [];
  const canadianAlternatives: Product[] = [];
  const alternatives: Record<string, string[]> = {};
  
  rows.forEach((row, index) => {
    const columns = row.split(',');
    const category = columns[0]?.trim() || '';
    const americanProduct = columns[1]?.trim() || '';
    const americanPrice = parseFloat(columns[2]?.replace('(CAD)', '').trim()) || 0;
    const canadianAlternative = columns[3]?.trim() || '';
    const canadianPrice = parseFloat(columns[4]?.replace('(CAD)', '').trim()) || 0;
    const americanImagePath = columns[5]?.trim() || '/placeholder.svg';
    const canadianImagePath = columns[6]?.trim() || '/placeholder.svg';
    
    // Create American product entry
    const americanId = `a${index + 1}`;
    americanProducts.push({
      id: americanId,
      name: americanProduct,
      brand: americanProduct.split(' ')[0] || 'Unknown',
      category,
      origin: 'US',
      image: americanImagePath,
      price: americanPrice,
      description: `American ${category.toLowerCase()} product.`
    });
    
    // Create Canadian alternative entry
    const canadianId = `c${index + 1}`;
    canadianAlternatives.push({
      id: canadianId,
      name: canadianAlternative,
      brand: canadianAlternative.split(' ')[0] || 'Unknown',
      category,
      origin: 'Canada',
      image: canadianImagePath,
      price: canadianPrice,
      description: `Canadian ${category.toLowerCase()} product.`
    });
    
    // Map the alternative
    alternatives[americanId] = [canadianId];
  });
  
  return {
    americanProducts,
    canadianAlternatives,
    alternatives
  };
};

// Function to load default CSV data
export const loadDefaultCSVData = async (): Promise<{
  americanProducts: Product[], 
  canadianAlternatives: Product[],
  alternatives: Record<string, string[]>
}> => {
  try {
    // Since the CSV file doesn't exist yet, we'll skip trying to import it
    // and just return empty arrays which will make the app fall back to default products
    console.log('CSV file not available yet, using default product data instead');
    return {
      americanProducts: [],
      canadianAlternatives: [],
      alternatives: {}
    };
    
    // This is the code we'll use once the CSV file is available:
    // const csvModule = await import('@/data/products.csv?raw');
    // const csvData = csvModule.default;
    // return parseCSVToProducts(csvData);
  } catch (error) {
    console.warn('CSV file not found, using default product data instead:', error);
    // Return empty data if CSV file doesn't exist yet
    return {
      americanProducts: [],
      canadianAlternatives: [],
      alternatives: {}
    };
  }
};

// Function to handle CSV file upload
export const handleCSVUpload = async (file: File): Promise<{
  americanProducts: Product[], 
  canadianAlternatives: Product[],
  alternatives: Record<string, string[]>
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        if (!csvData) {
          reject(new Error('Failed to read CSV file'));
          return;
        }
        
        const parsedData = parseCSVToProducts(csvData);
        resolve(parsedData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};
