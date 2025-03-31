
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
import { useLanguage } from '@/contexts/LanguageContext';

interface GroceryListInputProps {
  onSubmit: (items: string[]) => void;
  isProcessing: boolean;
}

const GroceryListInput = ({ onSubmit, isProcessing }: GroceryListInputProps) => {
  const { t } = useLanguage();
  const [inputMethod, setInputMethod] = useState<'text' | 'upload' > ('text');
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
      <CardContent className="p-4 sm:p-6">
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
          <Button 
            variant={inputMethod === 'text' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setInputMethod('text')}
            className="gap-1 whitespace-nowrap"
          >
            <FileText className="h-4 w-4" />
            <span>{t('scan.input.text')}</span>
          </Button>
          <Button 
            variant={inputMethod === 'upload' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setInputMethod('upload')}
            className="gap-1 whitespace-nowrap"
          >
            <Upload className="h-4 w-4" />
            <span>{t('scan.input.upload')}</span>
            </Button>
        </div>
        
        {inputMethod === 'text' && (
          <div className="space-y-4">
            <Textarea 
              placeholder={t('scan.input.placeholder')}
              className="min-h-[150px]"
              value={groceryItems}
              onChange={(e) => setGroceryItems(e.target.value)}
            />
          </div>
        )}
        
        {inputMethod === 'upload' && (
          <div 
            className={cn(
              "border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-colors",
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
              <h3 className="text-lg font-medium">{t('scan.upload.title')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                {t('scan.upload.description')}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => fileInputRef.current?.click()}
              >
                {t('scan.upload.button')}
              </Button>
            </div>
          </div>
        )}
        
        
        {groceryItems.trim().length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 gap-3">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('scan.items.count').replace('{0}', groceryItems.split('\n').filter(item => item.trim().length > 0).length.toString())}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setGroceryItems('')}
                className="flex-1 sm:flex-none"
              >
                <X className="h-4 w-4 mr-1" />
                {t('scan.button.clear')}
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isProcessing || groceryItems.trim().length === 0}
                className="gap-1 flex-1 sm:flex-none"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span>{isProcessing ? t('scan.button.processing') : t('scan.button.find')}</span>
                {!isProcessing && <ArrowRight className="h-4 w-4 ml-1 hidden sm:inline" />}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroceryListInput;
