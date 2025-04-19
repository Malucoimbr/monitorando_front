
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  asLink?: boolean;
}

export const Logo = ({ 
  className, 
  size = 'md',
  withText = true,
  asLink = true,
}: LogoProps) => {
  const logoContent = (
    <div className={cn(
      'flex items-center gap-2 font-bold text-foreground',
      size === 'sm' && 'text-sm',
      size === 'md' && 'text-xl',
      size === 'lg' && 'text-2xl',
      className
    )}>
      <div className="relative">
        <div className="absolute inset-0 bg-monitorando-500 blur-sm rounded-full opacity-50 animate-pulse"></div>
        <Eye 
          className={cn(
            'relative text-monitorando-500',
            size === 'sm' && 'h-5 w-5',
            size === 'md' && 'h-7 w-7',
            size === 'lg' && 'h-9 w-9',
          )}
          strokeWidth={1.5}
        />
      </div>
      {withText && (
        <span className="bg-gradient-to-r from-monitorando-700 to-monitorando-500 bg-clip-text text-transparent">
          Monitorando
        </span>
      )}
    </div>
  );

  if (asLink) {
    return <Link to="/">{logoContent}</Link>;
  }

  return logoContent;
};
