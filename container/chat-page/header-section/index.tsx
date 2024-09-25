import { AlignLeft, MessageSquarePlus } from 'lucide-react';
import { useState } from 'react';
import { Message } from 'ai/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Define the props for ChatHeader
interface ChatHeaderProps {
  handleMessages: (messages: Message[]) => void; // Replace Message[] with your actual message type if necessary
}

export default function ChatHeader({ handleMessages }: ChatHeaderProps) {
  const [position, setPosition] = useState('top');

  return (
    <header className='sticky top-0 z-40 w-full bg-white p-6 drop-shadow dark:bg-zinc-950 dark:drop-shadow-[0_2px_2px_rgba(200,200,200,0.1)]'>
      <div className='relative flex items-end justify-center dark:text-white'>
        <Button
          variant='ghost'
          className='absolute left-0 top-1/2 -translate-y-1/2 transform p-2'
        >
          <AlignLeft />
        </Button>
        <p className='text-center text-xl md:text-4xl'>ChatGPT</p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='pl-2 text-center text-sm dark:text-gray-200 md:pl-4 md:text-xl'>
              GPT 4o
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='bottom'>
                Bottom
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='absolute right-0 top-1/2 -translate-y-1/2 transform'>
          <Button
            variant='ghost'
            className='p-2'
            onClick={() => handleMessages([])}
          >
            <MessageSquarePlus />
          </Button>
        </div>
      </div>
    </header>
  );
}
