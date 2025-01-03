import React, { useRef, useCallback, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  autoResize?: boolean;
}

export default function TextArea({ 
  value,
  onChange,
  className,
  autoResize = true,
  ...props
}: TextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const adjustHeight = useCallback(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [autoResize]);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      className={cn(
        "w-full px-3 py-2",
        "bg-white dark:bg-gray-800",
        "border border-gray-300 dark:border-gray-700",
        "rounded-lg",
        "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "text-gray-900 dark:text-white",
        "resize-none",
        className
      )}
      {...props}
    />
  );
}