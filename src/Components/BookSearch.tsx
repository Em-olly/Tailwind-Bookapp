// import React, { useState } from "react";
// import { Search, BookOpen } from "lucide-react";
// import "./BookSearch.css"; // Import the external CSS file

// interface Book {
//   key: string;
//   title: string;
//   author_name?: string[];
//   first_publish_year?: number;
//   cover_i?: number;
// }

// const BookSearch: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);

//   const searchBooks = async (query: string) => {
//     if (!query.trim()) return;

//     setLoading(true);
//     setHasSearched(true);

//     try {
//       const response = await fetch(
//         `https://openlibrary.org/search.json?title=${encodeURIComponent(
//           query
//         )}&limit=20`
//       );
//       const data = await response.json();
//       setBooks(data.docs || []);
//     } catch (error) {
//       console.error("Error searching books:", error);
//       setBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     searchBooks("alchemist"); // Initial search for a popular book
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     searchBooks(searchQuery);
//   };

//   const getCoverUrl = (coverId: number, size: "S" | "M" | "L" = "M") => {
//     return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
//   };

//   return (
//     <div className="book-search-container">
//       <div className="book-search-header">
//         <h1>Discover Books</h1>
//         <p>Search through millions of books from Open Library</p>
//       </div>

//       <form onSubmit={handleSearch} className="book-search-form">
//         <div className="search-input-wrapper">
//           <Search className="search-icon" />
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search for books by title..."
//             className="book-input"
//           />
//           <button type="submit" disabled={loading} className="search-button">
//             {loading ? "Searching..." : "Search"}
//           </button>
//         </div>
//       </form>

//       {books.length > 0 && (
//         <div className="book-grid">
//           {books.map((book) => (
//             <div key={book.key} className="book-card">
//               <div className="book-image-wrapper">
//                 {book.cover_i ? (
//                   <img
//                     src={getCoverUrl(book.cover_i)}
//                     alt={book.title}
//                     className="book-cover"
//                     onError={(e) => {
//                       e.currentTarget.style.display = "none";
//                       e.currentTarget.nextElementSibling?.classList.remove(
//                         "hidden"
//                       );
//                     }}
//                   />
//                 ) : null}
//                 <div
//                   className={`book-placeholder ${book.cover_i ? "hidden" : ""}`}
//                 >
//                   <BookOpen className="placeholder-icon" />
//                 </div>
//               </div>
//               <div className="book-details">
//                 <h3>{book.title}</h3>
//                 {book.author_name && (
//                   <p className="book-author">
//                     by {book.author_name.slice(0, 2).join(", ")}
//                     {book.author_name.length > 2 &&
//                       ` +${book.author_name.length - 2} more`}
//                   </p>
//                 )}
//                 {book.first_publish_year && (
//                   <p className="book-year">
//                     First published: {book.first_publish_year}
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {!loading && books.length === 0 && (
//         <div className="empty-state">
//           <BookOpen className="empty-icon" />
//           <h3>
//             {hasSearched
//               ? "No books found"
//               : "Start your book discovery journey"}
//           </h3>
//           <p>
//             {hasSearched
//               ? "Try a different title or check for spelling errors."
//               : "Search for any book title to explore our vast collection"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookSearch;

import { useState, KeyboardEvent } from "react";
import { Search, BookOpen, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const searchBooks = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(
          query
        )}&limit=20`
      );
      const data = await response.json();
      setBooks(data.docs || []);
    } catch (error) {
      console.error("Error searching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    searchBooks("alchemist"); // Initial search for a popular book
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBooks(searchQuery);
    }
  };

  const handleBookClick = (bookKey: string) => {
    navigate(`/book/${encodeURIComponent(bookKey)}`);
  };

  const getCoverUrl = (coverId: number, size: "S" | "M" | "L" = "M") => {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">
          Discover Books
        </h1>
        <p className="text-purple-600">
          Search through millions of books from Open Library
        </p>
      </div>

      {/* Search Input with Loading Indicator */}
      <div className="mb-8 relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for books by title... Press Enter to search"
            className="w-full py-3 px-12 text-lg border border-purple-600 rounded-full outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          />
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
            </div>
          )}
        </div>
      </div>

      {/* Book Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <div
              key={book.key}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
              onClick={() => handleBookClick(book.key)}
            >
              <div className="relative aspect-[3/4] bg-purple-50">
                {book.cover_i ? (
                  <img
                    src={getCoverUrl(book.cover_i)}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    book.cover_i ? "hidden" : ""
                  }`}
                >
                  <BookOpen className="w-12 h-12 text-purple-300" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-purple-800 line-clamp-2">
                  {book.title}
                </h3>
                {book.author_name && (
                  <p className="text-sm text-purple-600 mt-1 line-clamp-1">
                    by {book.author_name.slice(0, 2).join(", ")}
                    {book.author_name.length > 2 &&
                      ` +${book.author_name.length - 2}`}
                  </p>
                )}
                {book.first_publish_year && (
                  <p className="text-xs text-purple-400 mt-1">
                    {book.first_publish_year}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-purple-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            {hasSearched
              ? "No books found"
              : "Start your book discovery journey"}
          </h3>
          <p className="text-purple-400">
            {hasSearched
              ? "Try a different title or check your spelling"
              : "Search for any book title to explore our collection"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
