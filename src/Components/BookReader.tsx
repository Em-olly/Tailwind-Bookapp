// import type React from "react";
// import { useState, useEffect } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ExternalLink,
//   X,
//   Loader2,
//   AlertCircle,
//   Library,
//   Globe,
// } from "lucide-react";
// import "./BookReader.css";

// interface BookReaderProps {
//   book: {
//     key: string;
//     title: string;
//     author_name?: string[];
//     cover_i?: number;
//   };
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface BookContent {
//   available: boolean;
//   type: "full_text" | "preview" | "external_link" | "unavailable";
//   content?: string;
//   pages?: string[];
//   external_url?: string;
//   ia_identifier?: string;
// }

// const BookReader: React.FC<BookReaderProps> = ({ book, isOpen, onClose }) => {
//   const [bookContent, setBookContent] = useState<BookContent | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (isOpen && book) {
//       fetchBookContent();
//     }
//   }, [isOpen, book]);

//   const fetchBookContent = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // First, try to get book details from Open Library
//       const bookResponse = await fetch(
//         `https://openlibrary.org${book.key}.json`
//       );
//       const bookData = await bookResponse.json();

//       // Check for Internet Archive identifier
//       if (bookData.ocaid) {
//         const content = await fetchInternetArchiveContent(bookData.ocaid);
//         setBookContent(content);
//       } else {
//         // Try to find alternative sources
//         const alternativeContent = await findAlternativeSources(book);
//         setBookContent(alternativeContent);
//       }
//     } catch (error) {
//       console.error("Error fetching book content:", error);
//       setError("Failed to load book content");
//       setBookContent({
//         available: false,
//         type: "unavailable",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   interface MetadataFile {
//     name?: string;
//   }

//   interface MetadataResponse {
//     files?: MetadataFile[];
//   }

//   const fetchInternetArchiveContent = async (
//     identifier: string
//   ): Promise<BookContent> => {
//     try {
//       const metadataResponse = await fetch(
//         `https://archive.org/metadata/${identifier}`
//       );
//       if (!metadataResponse.ok) {
//         throw new Error(
//           `Failed to fetch metadata for identifier: ${identifier}`
//         );
//       }

//       const metadata: MetadataResponse = await metadataResponse.json();

//       const textFiles = Array.isArray(metadata.files)
//         ? metadata.files.filter(
//             (file) => file.name?.endsWith(".txt") || file.name?.endsWith(".pdf")
//           )
//         : [];

//       if (textFiles.length === 0) {
//         return {
//           available: true,
//           type: "external_link",
//           external_url: `https://archive.org/details/${identifier}`,
//           ia_identifier: identifier,
//         };
//       }

//       const textFile =
//         textFiles.find((file) => file.name?.endsWith(".txt")) || textFiles[0];

//       if (!textFile?.name) {
//         throw new Error("No valid text file found in metadata.");
//       }

//       const textResponse = await fetch(
//         `https://archive.org/download/${identifier}/${textFile.name}`
//       );
//       if (!textResponse.ok) {
//         throw new Error(`Failed to fetch text file: ${textFile.name}`);
//       }

//       const fullText = await textResponse.text();
//       const pages = splitIntoPages(fullText);

//       return {
//         available: true,
//         type: "full_text",
//         content: fullText,
//         pages,
//         ia_identifier: identifier,
//       };
//     } catch (error) {
//       console.error("Error fetching Internet Archive content:", error);
//       return {
//         available: false,
//         type: "unavailable",
//       };
//     }
//   };

//   interface GutenbergBook {
//     formats: {
//       "text/plain"?: string;
//     };
//   }

//   interface GutenbergResponse {
//     results: GutenbergBook[];
//   }

//   const findAlternativeSources = async (book: {
//     title: string;
//   }): Promise<BookContent> => {
//     try {
//       // Try Project Gutenberg search
//       const gutenbergResponse = await fetch(
//         `https://gutendex.com/books/?search=${encodeURIComponent(book.title)}`
//       );
//       const gutenbergData: GutenbergResponse = await gutenbergResponse.json();

//       if (gutenbergData.results && gutenbergData.results.length > 0) {
//         const gutenbergBook = gutenbergData.results[0];
//         const textUrl = gutenbergBook.formats["text/plain"];

//         if (textUrl) {
//           const textResponse = await fetch(textUrl);
//           const fullText = await textResponse.text();
//           const pages = splitIntoPages(fullText);

//           return {
//             available: true,
//             type: "full_text",
//             content: fullText,
//             pages,
//           };
//         }
//       }
//     } catch (error) {
//       console.error("Project Gutenberg search failed:", error);
//     }

//     // If no sources found
//     return {
//       available: false,
//       type: "unavailable",
//     };
//   };

//   const splitIntoPages = (text: string): string[] => {
//     const wordsPerPage = 300;
//     const words = text.split(/\s+/);
//     const pages: string[] = [];

//     for (let i = 0; i < words.length; i += wordsPerPage) {
//       const pageWords = words.slice(i, i + wordsPerPage);
//       pages.push(pageWords.join(" "));
//     }

//     return pages;
//   };

//   const nextPage = () => {
//     if (bookContent?.pages && currentPage < bookContent.pages.length - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="book-reader-overlay">
//       <div className="book-reader-modal">
//         <div className="book-reader-header">
//           <div className="book-info">
//             <h2>{book.title}</h2>
//             {book.author_name && (
//               <p>by {book.author_name.slice(0, 2).join(", ")}</p>
//             )}
//           </div>
//           <button onClick={onClose} className="close-button">
//             <X />
//           </button>
//         </div>

//         <div className="book-reader-content">
//           {loading && (
//             <div className="loading-state">
//               <Loader2 className="loading-icon" />
//               <p>Loading book content...</p>
//             </div>
//           )}

//           {error && (
//             <div className="error-state">
//               <AlertCircle className="error-icon" />
//               <h3>Error Loading Book</h3>
//               <p>{error}</p>
//               <button onClick={fetchBookContent} className="retry-button">
//                 Try Again
//               </button>
//             </div>
//           )}

//           {bookContent && !loading && (
//             <>
//               {bookContent.type === "full_text" && bookContent.pages && (
//                 <div className="text-reader">
//                   <div className="page-controls">
//                     <button
//                       onClick={prevPage}
//                       disabled={currentPage === 0}
//                       className="page-button"
//                     >
//                       <ChevronLeft className="page-nav-icon" /> Previous
//                     </button>
//                     <span className="page-info">
//                       Page {currentPage + 1} of {bookContent.pages.length}
//                     </span>
//                     <button
//                       onClick={nextPage}
//                       disabled={currentPage === bookContent.pages.length - 1}
//                       className="page-button"
//                     >
//                       Next <ChevronRight className="page-nav-icon" />
//                     </button>
//                   </div>

//                   <div className="page-content">
//                     <p>{bookContent.pages[currentPage]}</p>
//                   </div>
//                 </div>
//               )}

//               {bookContent.type === "external_link" && (
//                 <div className="external-link-state">
//                   <Globe className="external-icon" />
//                   <h3>Read on External Site</h3>
//                   <p>This book is available to read on an external platform.</p>
//                   <a
//                     href={bookContent.external_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="external-button"
//                   >
//                     <ExternalLink className="external-link-icon" />
//                     Read on Internet Archive
//                   </a>
//                 </div>
//               )}

//               {bookContent.type === "unavailable" && (
//                 <div className="unavailable-state">
//                   <Library className="unavailable-icon" />
//                   <h3>Content Not Available</h3>
//                   <p>
//                     The full text of this book is not available for online
//                     reading. This may be due to copyright restrictions.
//                   </p>
//                   <div className="suggestions">
//                     <p>You might find this book at:</p>
//                     <ul>
//                       <li>Your local library</li>
//                       <li>Online bookstores</li>
//                       <li>Digital library services</li>
//                     </ul>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookReader;
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const BookReader = () => {
  const { bookKey } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookContent = async () => {
      try {
        // Decode the book key
        const decodedKey = decodeURIComponent(bookKey || "");

        // Fetch book details from Open Library
        const response = await fetch(
          `https://openlibrary.org${decodedKey}.json`
        );
        const data = await response.json();

        // Process content (simplified example)
        if (data.description) {
          setContent(
            typeof data.description === "string"
              ? data.description
              : data.description.value || "No content available"
          );
        } else {
          setContent("No content available for this book");
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        setContent("Failed to load book content");
      } finally {
        setLoading(false);
      }
    };

    fetchBookContent();
  }, [bookKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 p-4 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-purple-600"
        >
          <X className="w-6 h-6" />
          Back to search
        </button>

        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-4">Book Content</h1>
          <div className="whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default BookReader;
