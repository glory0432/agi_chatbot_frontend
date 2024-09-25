'use client';

import * as React from 'react';

export interface useClipboardProps {
  timeout?: number;
}

export function useClipboard({ timeout = 2000 }: useClipboardProps) {
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const copyToClipboard = (value?: string) => {
    if (typeof window === 'undefined' || !navigator.clipboard?.writeText) {
      return;
    }

    // Get the selected text if no value is provided
    const selectedText = value || window.getSelection()?.toString();

    if (!selectedText) {
      return;
    }

    navigator.clipboard.writeText(selectedText).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard };
}
