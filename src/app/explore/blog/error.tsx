"use client";

export default function BlogError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <div className="text-6xl">🌶️</div>
        <h1 className="text-3xl font-bold text-white">
          Something went spicy wrong!
        </h1>
        <p className="text-gray-300 max-w-md mx-auto">
          We couldn't load the articles. This might be due to a network issue or
          the content is temporarily unavailable.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
