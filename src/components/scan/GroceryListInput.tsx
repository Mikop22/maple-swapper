
import { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Upload, 
  ArrowRight, 
  Loader2, 
  FileText, 
  Camera,
  Search, 
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GroceryListInputProps {
  onSubmit: (items: string[]) => void;
  isProcessing: boolean;
}

const GroceryListInput = ({ onSubmit, isProcessing }: GroceryListInputProps) => {
  const [inputMethod, setInputMethod] = useState<'text' | 'upload' | 'camera'>('text');
  const [groceryItems, setGroceryItems] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const items = groceryItems
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    if (items.length > 0) {
      onSubmit(items);
    }
  };

  const handleFileUpload = (file: File) => {
    // In a real app, this would use OCR or file parsing
    // For this demo, we'll simulate reading a text file
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setGroceryItems(e.target.result.toString());
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <Card className="overflow-hidden shadow-md bg-white dark:bg-gray-900 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex space-x-3 mb-4">
          <Button 
            variant={inputMethod === 'text' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setInputMethod('text')}
            className="gap-1"
          >
            <FileText className="h-4 w-4" />
            <span>Text</span>
          </Button>
          <Button 
            variant={inputMethod === 'upload' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setInputMethod('upload')}
            className="gap-1"
          >
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </Button>
          <Button 
            variant={inputMethod === 'camera' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setInputMethod('camera')}
            className="gap-1"
          >
            <Camera className="h-4 w-4" />
            <span>Camera</span>
          </Button>
        </div>
        
        {inputMethod === 'text' && (
          <div className="space-y-4">
            <Textarea 
              placeholder="Enter your grocery list with each item on a new line: 
Example:
Wonder Bread
Heinz Ketchup
Jiffy Peanut Butter"
              className="min-h-[150px]"
              value={groceryItems}
              onChange={(e) => setGroceryItems(e.target.value)}
            />
          </div>
        )}
        
        {inputMethod === 'upload' && (
          <div 
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-gray-200 dark:border-gray-700"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              accept=".txt,.csv,.jpg,.jpeg,.png" 
              className="hidden" 
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                <Upload className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">Upload your grocery list</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                Drag and drop a file, or click to browse
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => fileInputRef.current?.click()}
              >
                Select file
              </Button>
            </div>
          </div>
        )}
        
        {inputMethod === 'camera' && (
          <div className="border rounded-lg p-8 text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                <Camera className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">Take a photo of your list</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                Feature coming soon! For now, please use text input or upload.
              </p>
            </div>
          </div>
        )}
        
        {groceryItems.trim().length > 0 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {groceryItems.split('\n').filter(item => item.trim().length > 0).length} items
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setGroceryItems('')}
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isProcessing || groceryItems.trim().length === 0}
                className="gap-1"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span>{isProcessing ? "Processing..." : "Find Alternatives"}</span>
                {!isProcessing && <ArrowRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroceryListInput;
