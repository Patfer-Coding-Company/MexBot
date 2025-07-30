/**
 * Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks
 * Progress Indicator Component
 */

import React from 'react';

interface ProgressIndicatorProps {
  isVisible: boolean;
  message?: string;
  progress?: number; // 0-100
  type?: 'spinner' | 'progress' | 'dots';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  isVisible,
  message = 'Processing...',
  progress,
  type = 'spinner',
  size = 'medium',
  className = '',
}) => {
  if (!isVisible) return null;

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const spinnerSizes = {
    small: 'size-4',
    medium: 'size-6',
    large: 'size-8',
  };

  const renderSpinner = () => (
    <div className={`animate-spin rounded-full border-2 border-sky-400 border-t-transparent ${spinnerSizes[size]}`} />
  );

  const renderProgress = () => (
    <div className="w-full bg-sky-200 rounded-full h-2">
      <div
        className="bg-sky-500 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress || 0}%` }}
      />
    </div>
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      <div className="animate-bounce size-2 bg-sky-500 rounded-full" style={{ animationDelay: '0ms' }} />
      <div className="animate-bounce size-2 bg-sky-500 rounded-full" style={{ animationDelay: '150ms' }} />
      <div className="animate-bounce size-2 bg-sky-500 rounded-full" style={{ animationDelay: '300ms' }} />
    </div>
  );

  const renderIndicator = () => {
    switch (type) {
      case 'progress':
        return renderProgress();
      case 'dots':
        return renderDots();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 p-4 ${className}`}>
      {renderIndicator()}
      {message && <p className={`text-center text-sky-600 ${sizeClasses[size]} font-medium`}>{message}</p>}
      {type === 'progress' && progress !== undefined && (
        <p className="text-sm text-sky-500 font-medium">{Math.round(progress)}%</p>
      )}
    </div>
  );
};

export default ProgressIndicator;
