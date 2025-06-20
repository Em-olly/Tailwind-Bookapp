import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface BookContent {
  type: 'text' | 'external' | 'unavailable';
  content?: string;
  url?: string;
  title: string;
  author: string;
  pages?: string[];
}

const BookReader: React.FC = () => {
  const { bookKey = '' } = useParams<{ bookKey?: string }>();
  const navigate = useNavigate();
  const [bookContent, setBookContent] = useState<BookContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookKey) {
      fetchBookContent(bookKey);
    } else {
      setError('No book specified');
      setLoading(false);
    }
  }, [bookKey]);

  const fetchBookContent = async (key: string) => {
    setLoading(true);
    setError(null);

    try {
      // Properly format the book key
      const formattedKey = key.startsWith('/works/') ? key : `/works/${key}`;

      // Fetch book metadata
      const bookResponse = await fetch(`https://openlibrary.org${formattedKey}.json`);
      if (!bookResponse.ok) throw new Error('Book not found');

      const bookData = await bookResponse.json();

      // Extract title and author
      const title = bookData.title || 'Unknown Title';
      const author = bookData.authors?.[0]?.name || 'Unknown Author';

      // Try to get readable content
      let content: BookContent = {
        type: 'unavailable',
        title,
        author
      };

      // Try Internet Archive first
      if (bookData.ocaid) {
        try {
          const iaResponse = await fetch(
            `https://archive.org/download/${bookData.ocaid}/${bookData.ocaid}_djvu.txt`
          );

          if (iaResponse.ok) {
            const text = await iaResponse.text();
            content = {
              type: 'text',
              title,
              author,
              content: text,
              pages: splitIntoPages(text)
            };
          }
        } catch (iaError) {
          console.log('Internet Archive content not available');
        }
      }


      // Fallback to external link
      if (content.type === 'unavailable' && bookData.links?.length > 0) {
        const readableLink = bookData.links.find((link: any) =>
          link.title?.toLowerCase().includes('read') ||
          link.title?.toLowerCase().includes('full text')
        );

        if (readableLink) {
          content = {
            type: 'external',
            title,
            author,
            url: readableLink.url
          };
        }
      }

      setBookContent(content);
    } catch (err) {
      console.error('Error fetching book content:', err);
      setError('Failed to load book content. Please try another book.');
    } finally {
      setLoading(false);
    }
  };

  const splitIntoPages = (text: string): string[] => {
    const wordsPerPage = 500;
    const words = text.split(/\s+/);
    const pages: string[] = [];

    for (let i = 0; i < words.length; i += wordsPerPage) {
      pages.push(words.slice(i, i + wordsPerPage).join(' '));
    }

    return pages;
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    if (bookContent?.pages) {
      setCurrentPage(prev => Math.min(bookContent.pages!.length - 1, prev + 1));
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-purple-600">Loading book content...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error || !bookContent) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <BookOpen className="w-16 h-16 mx-auto" />
            <p className="text-lg mt-4">{error || 'Book content unavailable'}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-purple-800 truncate">{bookContent.title}</h1>
              <p className="text-purple-600 truncate">by {bookContent.author}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Text Content */}
        {bookContent.type === 'text' && bookContent.pages && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-purple-600">
                Page {currentPage + 1} of {bookContent.pages.length}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 0}
                  className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === (bookContent.pages?.length || 0) - 1}
                  className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="prose max-w-none p-4 bg-gray-50 rounded-lg">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {bookContent.pages[currentPage]}
              </div>
            </div>
          </div>
        )}

        {/* External Link */}
        {bookContent.type === 'external' && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <ExternalLink className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              Read Online
            </h2>
            <p className="text-purple-600 mb-6">
              This book is available to read on an external site.
            </p>
            <a
              href={bookContent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Read Now
            </a>
          </div>
        )}

        {/* Unavailable Content */}
        {bookContent.type === 'unavailable' && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <BookOpen className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              Content Not Available
            </h2>
            <p className="text-purple-600 mb-6">
              Unfortunately, this book is not available for online reading.
              You may find it at your local library or bookstore.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Search for Another Book
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookReader;



