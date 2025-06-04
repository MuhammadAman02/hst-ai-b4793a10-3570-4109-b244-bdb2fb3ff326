import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { ApiKeyInput } from '@/components/ApiKeyInput';

const Index = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  console.log('Index component rendered, hasApiKey:', hasApiKey);

  const handleApiKeySubmit = (key: string) => {
    console.log('API key submitted, length:', key.length);
    setApiKey(key);
    setHasApiKey(true);
  };

  const handleResetApiKey = () => {
    console.log('Resetting API key');
    setApiKey('');
    setHasApiKey(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {!hasApiKey ? (
        <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
      ) : (
        <ChatInterface apiKey={apiKey} onResetApiKey={handleResetApiKey} />
      )}
    </div>
  );
};

export default Index;