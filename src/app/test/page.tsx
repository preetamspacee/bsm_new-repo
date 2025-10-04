export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Test Page
        </h1>
        <p className="text-lg text-gray-600">
          If you can see this, the basic Next.js setup is working.
        </p>
        <div className="mt-8">
          <a 
            href="/" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
