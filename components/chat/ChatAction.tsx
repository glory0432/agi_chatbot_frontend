import { PauseCircle, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ChatHandler } from '@/types/chat';

function ChatAction(
  props: Pick<ChatHandler, 'stop' | 'reload'> & {
    showReload?: boolean;
    showStop?: boolean;
  }
) {
  return (
    <div className='space-x-4 p-4'>
      {props.showStop && (
        <Button variant='outline' size='sm' onClick={props.stop}>
          <PauseCircle className='mr-2 h-4 w-4' />
          Stop generating
        </Button>
      )}
      {props.showReload && (
        <Button variant='outline' size='sm' onClick={props.reload}>
          <RefreshCw className='mr-2 h-4 w-4' />
          Regenerate
        </Button>
      )}
    </div>
  );
}

export { ChatAction };
