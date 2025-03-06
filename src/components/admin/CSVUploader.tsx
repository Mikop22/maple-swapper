
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { handleCSVUpload } from '@/lib/csvParser';
import { updateProductData } from '@/data/products';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

const CSVUploader = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    setIsUploading(true);
    try {
      const { americanProducts, canadianAlternatives, alternatives } = await handleCSVUpload(file);
      
      // Update the products data
      updateProductData(americanProducts, canadianAlternatives, alternatives);
      
      toast.success(`Successfully imported ${americanProducts.length} products`);
    } catch (error) {
      console.error('Error uploading CSV:', error);
      toast.error('Failed to upload CSV file. Please check the format.');
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Import Products from CSV</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Upload a CSV file with the following columns: Category, American Product, American Product Price (CAD), 
            Canadian Alternative, Canadian Alternative Price (CAD), Image Path (American), Image Path (Canadian)
          </p>
          
          <label 
            htmlFor="csvFile" 
            className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <div className="flex flex-col items-center justify-center">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">.CSV files only</p>
            </div>
            <input
              id="csvFile"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
          
          {isUploading && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-canada-red"></div>
              <span className="ml-2 text-sm">Uploading...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CSVUploader;
