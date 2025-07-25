import { User2, Bot } from 'lucide-react';

function ChatAvatar({ role }: { role: string }) {
  if (role === 'user') {
    return (
      <div className='flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg border bg-background shadow'>
        <User2 className='h-4 w-4' />
      </div>
    );
  }

  return (
    <div className='flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg border shadow'>
      <Bot className='h-4 w-4' />
    </div>
  );
}

export { ChatAvatar };
