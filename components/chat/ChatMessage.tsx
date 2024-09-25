import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatAvatar } from '.';
import { Message } from '@/types/chat';
import { useClipboard } from '@/hooks/useClipboard';
import { useTheme } from 'next-themes';
import MarkdownPreview from '@uiw/react-markdown-preview';

function ChatMessage(chatMessage: Message) {
  const { isCopied, copyToClipboard } = useClipboard({ timeout: 2000 });
  const { theme } = useTheme();

  return (
    <div>
      {chatMessage.role !== 'user' ? (
        <div className='flex w-full flex-row gap-4'>
          <ChatAvatar role={chatMessage.role} />
          <div className='group flex w-full flex-row justify-between gap-2'>
            <div className='base-full w-[calc(100vw-11rem)] md:w-[calc(100vw-15rem)] lg:w-[calc(1024px-15rem)]'>
              <MarkdownPreview
                source={chatMessage.content}
                wrapperElement={{
                  'data-color-mode': theme === 'dark' ? 'dark' : 'light',
                }}
              />
            </div>
            <Button
              onClick={() => copyToClipboard(chatMessage.content)}
              size='icon'
              variant='ghost'
              className='h-8 w-8 p-2 opacity-0 group-hover:opacity-100'
            >
              {isCopied ? (
                <Check className='h-4 w-4' />
              ) : (
                <Copy className='h-4 w-4' />
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex w-full justify-end px-4'>
          <div className='max-w-[70%] rounded-3xl bg-neutral-200 px-4 py-2 dark:bg-neutral-700'>
            <div className='break-words text-base'>{chatMessage.content}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ChatMessage };
