
export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <img src="https://http.cat/404" alt="404 Not Found" className="mt-6 rounded shadow-lg" />
    </div>

  )

}