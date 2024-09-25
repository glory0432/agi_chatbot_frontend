import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

import { ChatAction, ChatMessage } from '@/components/chat';
import { ChatHandler } from '@/types/chat';

export default function ChatMessages(
  props: Pick<ChatHandler, 'messages' | 'isLoading' | 'reload' | 'stop'>
) {
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);
  const messageLength = props.messages.length;
  const lastMessage = props.messages[messageLength - 1];
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current && !isUserScrolling) {
      window.scrollTo({
        behavior: 'smooth',
        top: scrollableChatContainerRef.current.scrollHeight,
      });
    }
  };
  const handleScroll = () => {
    const container = scrollableChatContainerRef.current;
    if (container) {
      // Check if the user is close to the bottom of the container
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      setIsUserScrolling(!isAtBottom); // Set the flag to stop auto-scrolling when the user scrolls
    }
  };

  useEffect(() => {
    // Add scroll event listener
    const container = scrollableChatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const isLastMessageFromAssistant =
    messageLength > 0 && lastMessage?.role !== 'user';
  const showReload =
    props.reload && !props.isLoading && isLastMessageFromAssistant;
  const showStop = props.stop && props.isLoading;

  const isPending = props.isLoading && !isLastMessageFromAssistant;

  useEffect(() => {
    scrollToBottom();
  }, [messageLength, lastMessage]);

  return (
    <div className='flex w-full flex-grow'>
      <div className='relative mx-auto flex h-full w-full flex-col px-8 py-6 md:px-16 lg:w-[1024px]'>
        <div className='overflow-y-auto' ref={scrollableChatContainerRef}>
          <div className='flex flex-col gap-5'>
            {props.messages.map((m) => (
              <ChatMessage key={m.id} {...m} />
            ))}
            {isPending && (
              <div className='flex items-center justify-center pt-10'>
                <Loader2 className='h-4 w-4 animate-spin' />
              </div>
            )}
          </div>
          <div className='flex justify-end'>
            <ChatAction
              reload={props.reload}
              stop={props.stop}
              showReload={showReload}
              showStop={showStop}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
