import OpenAI from 'openai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const useOpenAI = (apiKey: string) => {
  console.log('useOpenAI hook initialized');

  const sendMessage = async (message: string, previousMessages: Message[]): Promise<string> => {
    console.log('Sending message to OpenAI:', message);
    console.log('Previous messages count:', previousMessages.length);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
      });

      // Convert our message format to OpenAI format
      const messages = [
        ...previousMessages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })),
        {
          role: 'user' as const,
          content: message
        }
      ];

      console.log('Calling OpenAI API with', messages.length, 'messages');

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      console.log('OpenAI API response received, length:', response.length);
      
      return response;
    } catch (error) {
      console.error('OpenAI API error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          throw new Error('Invalid API key. Please check your OpenAI API key.');
        } else if (error.message.includes('429')) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else if (error.message.includes('insufficient_quota')) {
          throw new Error('API quota exceeded. Please check your OpenAI account.');
        }
      }
      
      throw new Error('Failed to get response from AI. Please try again.');
    }
  };

  return { sendMessage };
};