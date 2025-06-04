import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Shield } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

export const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  console.log('ApiKeyInput component rendered');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('API key form submitted');
    
    if (!apiKey.trim()) {
      console.warn('Empty API key submitted');
      return;
    }

    setIsLoading(true);
    
    // Simple validation - OpenAI API keys start with 'sk-'
    if (!apiKey.startsWith('sk-')) {
      console.error('Invalid API key format');
      alert('Please enter a valid OpenAI API key (starts with sk-)');
      setIsLoading(false);
      return;
    }

    console.log('API key validated, submitting...');
    onApiKeySubmit(apiKey);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Key className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to AI Chat</CardTitle>
          <CardDescription>
            Enter your OpenAI API key to start chatting with AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono"
                disabled={isLoading}
              />
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-1" />
                Your API key is stored locally and never sent to our servers
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!apiKey.trim() || isLoading}
            >
              {isLoading ? 'Validating...' : 'Start Chatting'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};