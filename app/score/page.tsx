export default function Score() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Your Score</h1>
      <p>Your final score is: {/* Display final score here */}</p>
      <a href="/" className="bg-blue-500 text-white px-4 py-2 mt-4">
        Play Again
      </a>
    </div>
  );
}
