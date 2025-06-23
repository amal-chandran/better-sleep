import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved,
        deleted, or never existed in the first place.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Return Home
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
