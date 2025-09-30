export function LoadingSpinner({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  }

  return (
    <div className="flex items-center justify-center" role="status" aria-label="Loading">
      <div className={`${sizeClasses[size]} border-gray-200 border-t-primary rounded-full animate-spin`}></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}