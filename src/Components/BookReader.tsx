import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

// Unified UI Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>{children}</div>
);

const StatusScreen = ({ icon, title, desc, action }) => (
  <div className="min-h-screen bg-purple-50 flex items-center justify-center text-center">
    <div>
      {icon}
      <h2 className="text-2xl font-bold text-purple-800 mt-4">{title}</h2>
      {desc && <p className="text-purple-600 my-4">{desc}</p>}
      {action}
    </div>
  </div>
);

const Button = ({ onClick, children, disabled, size = 'md', className = '' }) => {
  const sizes = { sm: 'px-3 py-1', md: 'px-4 py-2', lg: 'px-6 py-3' };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${sizes[size]} bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

// Main Component
const BookReader: React.FC = () => {
  const { bookKey = '' } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    if (!bookKey) return setStatus({ loading: false, error: 'No book specified' });

    (async () => {
      try {
        const formattedKey = bookKey.startsWith('/works/') ? bookKey : `/works/${bookKey}`;
        const res = await fetch(`https://openlibrary.org${formattedKey}.json`);
        const data = await res.json();
        setBook(await getBookContent(data));
        setStatus(s => ({ ...s, loading: false }));
      } catch (e) {
        setStatus({ loading: false, error: 'Failed to load content' });
      }
    })();
  }, [bookKey]);

  const getBookContent = async (data: any) => {
    const title = data.title || 'Unknown Title';
    const author = data.authors?.[0]?.name || 'Unknown Author';
    const sources = [
      ...(data.ocaid ? [`https://archive.org/download/${data.ocaid}`] : []),
      ...(data.ia ? [`https://archive.org/download/${data.ia}`] : []),
      `https://gutendex.com/books?search=${encodeURIComponent(title)}`
    ];

    for (const source of sources) {
      try {
        const formats = source.includes('archive.org')
          ? ['_djvu.txt', '.txt', '_pdf.txt']
          : [''];

        for (const format of formats) {
          const url = source.includes('gutendex')
            ? await getGutenbergUrl(source)
            : `${source}/${source.split('/').pop()}${format}`;

          const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
          if (!res.ok) continue;

          const text = await res.text();
          if (!text.trim()) continue;

          // Paginate text
          const pages: string[] = [];
          for (let i = 0; i < text.length; i += 3000) {
            pages.push(text.substring(i, i + 3000));
          }

          return { type: 'text', title, author, pages };
        }
      } catch { }
    }

    const link = data.links?.find((l: any) => /read|text/i.test(l.title));
    return link
      ? { type: 'external', title, author, url: link.url }
      : { type: 'unavailable', title, author };
  };

  const getGutenbergUrl = async (url: string) => {
    const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
    const data = await res.json();
    return data.results?.[0]?.formats?.['text/plain'] || '';
  };

  // Rendering
  if (status.loading) return (
    <StatusScreen
      icon={<BookOpen className="w-16 h-16 text-purple-600 mx-auto animate-pulse" />}
      title="Loading book content..."
      desc={undefined}
      action={undefined}
    />
  );

  if (status.error || !book) return (
    <StatusScreen
      icon={<BookOpen className="w-16 h-16 text-purple-600 mx-auto" />}
      title="Content Error"
      desc={status.error || 'Book content unavailable'}
      action={<Button onClick={() => navigate('/')} size="lg" disabled={false}>Return to Search</Button>}
    />
  );

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-white shadow-sm border-b border-purple-100 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-4">
          <Button onClick={() => navigate(-1)} size="sm" disabled={false}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <div className="truncate">
            <h1 className="text-xl font-bold text-purple-800 truncate">{book.title}</h1>
            <p className="text-purple-600 truncate">by {book.author}</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {book.type === 'text' && book.pages?.length > 0 ? (
          <Card>
            <div className="flex justify-between items-center mb-4">
              <p className="text-purple-600">Page {page + 1} of {book.pages.length}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  size="sm"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </Button>
                <Button
                  onClick={() => setPage(p => Math.min(book.pages.length - 1, p + 1))}
                  disabled={page === book.pages.length - 1}
                  size="sm"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="prose max-w-none p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
              {book.pages[page]}
            </div>
          </Card>
        ) : book.type === 'external' ? (
          <Card className="text-center">
            <ExternalLink className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-purple-800 mb-2">Read Online</h2>
            <p className="text-purple-600 mb-6">Available on external site</p>
            <a href={book.url} target="_blank">
              <Button size="lg" onClick={() => { }} disabled={false}><ExternalLink className="w-5 h-5 mr-2" /> Read Now</Button>
            </a>
          </Card>
        ) : (
          <Card className="text-center">
            <BookOpen className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-purple-800 mb-2">Content Unavailable</h2>
            <p className="text-purple-600 mb-6">Not available for online reading.Try your local bookstore or library.</p>
            <Button onClick={() => navigate('/')} size="lg" disabled={false}>Search for Another Book</Button>
          </Card>
        )}
      </main>
    </div>
  );
};

export default BookReader;
