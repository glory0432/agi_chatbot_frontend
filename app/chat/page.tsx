'use client';
import { useChat } from 'ai/react';
import ChatInput from '@/container/chat-page/input-section';
import ChatMessages from '@/container/chat-page/message-section';
import ChatHeader from '@/container/chat-page/header-section';
import { toast } from 'react-hot-toast';

export default function Home() {
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
    setMessages,
  } = useChat({
    onError: (error) => {
      toast.error(extractMessage(error.message));
    },
  });
  function extractMessage(htmlContent: string): string | null {
    // Create a DOM parser
    const parser = new DOMParser();

    // Parse the HTML content
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Find the script tag with the ID '__NEXT_DATA__'
    const scriptTag = doc.querySelector('script#__NEXT_DATA__');

    if (scriptTag && scriptTag.textContent) {
      try {
        // Parse the JSON data
        const jsonData = JSON.parse(scriptTag.textContent);

        // Access the message
        if (jsonData.err && jsonData.err.message) {
          return jsonData.err.message;
        }
      } catch (error) {
        console.error('Failed to parse JSON data', error);
      }
    }

    return null;
  }
  return (
    <div className='flex min-h-screen flex-col items-center'>
      <ChatHeader handleMessages={setMessages} />
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        reload={reload}
        stop={stop}
      />
      <ChatInput
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        multiModal
      />
    </div>
  );
}
