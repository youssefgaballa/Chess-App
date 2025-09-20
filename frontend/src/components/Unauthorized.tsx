
const Unauthorized = () => {
  //console.log("Unauthorized component mounted");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">403 Forbidden</h1>
      <p className="text-lg">You do not have permission to view this page.</p>
      <img src="https://http.cat/403" alt="403 Forbidden" className="mt-6 rounded shadow-lg" />
    </div>
  );
};

export default Unauthorized;