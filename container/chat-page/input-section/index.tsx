import { useState } from 'react';
import FileUploader from '../../../components/ui/file-uploader';
import { Input } from '@/components/ui/input';
import UploadImagePreview from '@/components/ui/upload-image-preview';
import { ChatHandler } from '@/types/chat';
import { Headphones, Camera, Image, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export default function ChatInput(
  props: Pick<
    ChatHandler,
    | 'isLoading'
    | 'input'
    | 'onFileUpload'
    | 'onFileError'
    | 'handleSubmit'
    | 'handleInputChange'
  > & {
    multiModal?: boolean;
  }
) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (imageUrl) {
      props.handleSubmit(e, {
        data: { imageUrl: imageUrl },
      });
      setImageUrl(null);
      return;
    }
    props.handleSubmit(e);
  };

  const onRemovePreviewImage = () => setImageUrl(null);

  const handleUploadImageFile = async (file: File) => {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
    setImageUrl(base64);
  };

  const handleUploadFile = async (file: File) => {
    try {
      if (props.multiModal && file.type.startsWith('image/')) {
        return await handleUploadImageFile(file);
      }
      props.onFileUpload?.(file);
    } catch (error: any) {
      props.onFileError?.(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ backgroundColor: 'hsl(var(--background))' }}
      className='sticky bottom-0 flex h-full w-full flex-col justify-between p-6 pt-0 md:px-16 md:pb-10 lg:px-32'
    >
      {imageUrl && (
        <UploadImagePreview url={imageUrl} onRemove={onRemovePreviewImage} />
      )}
      <div className='flex flex-row items-center pt-2'>
        <Button variant='ghost' className='p-2'>
          <Camera />
        </Button>
        <Button variant='ghost' className='p-2'>
          <Image />
        </Button>
        <FileUploader
          onFileUpload={handleUploadFile}
          onFileError={props.onFileError}
        />
        <Input
          autoFocus
          name='message'
          placeholder='Type a message'
          className='mx-2 basis-full rounded-full p-6 text-lg'
          value={props.input}
          onChange={props.handleInputChange}
        />
        <Button variant='ghost' className='p-2'>
          <Headphones />
        </Button>
        <Button variant='ghost' className='p-2' onClick={() => toggleTheme()}>
          <Sun className='dark:hidden' />
          <Moon className='hidden dark:block' />
        </Button>
      </div>
    </form>
  );
}
