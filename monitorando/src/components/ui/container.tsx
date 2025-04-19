
import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

export const Container = ({
  children,
  className,
  fluid = false,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={cn(
        fluid ? 'w-full px-4 md:px-6 lg:px-8' : 'container px-4 md:px-6 mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
