export default function LoadingSpinner({ 
  size = 'md', 
  color = 'blue',
  text = '',
  fullScreen = false 
}: {
    size?: "sm" | "md" | "lg" | "xl",
    color?: "blue" | "gray" | "red" | "green" | "purple" | "white",
    text?: string,
    fullScreen?: boolean
}) {
  // Size configurations
  const sizes: Record<string, string> = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Color configurations
  const colors: Record<string, string> = {
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    red: 'border-red-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    white: 'border-white'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`
          ${sizes[size]} 
          ${colors[color]}
          border-4 
          border-t-transparent 
          rounded-full 
          animate-spin
        `}
      />
      {text && (
        <span className={`text-${color}-600 font-medium animate-pulse`}>
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};
