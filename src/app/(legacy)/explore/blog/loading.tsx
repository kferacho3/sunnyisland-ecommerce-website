export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section Skeleton */}
      <div className="relative min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-32 h-32 bg-gray-700 mx-auto animate-pulse" />
          <div className="w-16 h-8 bg-gray-700 mx-auto animate-pulse" />
          <div className="w-96 h-12 bg-gray-700 mx-auto animate-pulse" />
          <div className="w-full max-w-3xl h-20 bg-gray-700 mx-auto animate-pulse" />
          <div className="w-48 h-12 bg-gray-700 mx-auto animate-pulse" />
        </div>
      </div>

      {/* Filter Section Skeleton */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow-xl p-4">
        <div className="container mx-auto flex gap-4">
          <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="w-48 h-12 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="w-24 h-12 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
      </div>

      {/* Articles Grid Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg"
            >
              <div className="h-48 bg-gray-300 dark:bg-gray-700 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
