import React from "react";
import { BookX } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 px-4">
      <div className="text-center">
        <BookX className="mx-auto text-purple-500 w-16 h-16 mb-6" />
        <h1 className="text-4xl font-bold text-purple-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-purple-600 mb-6">
          We are sorry. But the page you are looking for is not available.
          Perhaps you can try a new search.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
