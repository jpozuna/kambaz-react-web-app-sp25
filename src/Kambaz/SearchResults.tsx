import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'post' | 'user';
  thumbnail?: string;
  createdAt: string;
  author?: {
    id: string;
    name: string;
  };
}

const SearchResults: React.FC = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // This is mock data for demonstration
        const mockResults: SearchResult[] = [
          {
            id: '1',
            title: 'Introduction to Computer Science',
            description: 'A comprehensive introduction to computer science concepts...',
            type: 'course',
            thumbnail: '/images/course1.jpg',
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Question about Assignment 1',
            description: 'I have a question about the first problem...',
            type: 'post',
            createdAt: new Date().toISOString(),
            author: {
              id: '1',
              name: 'John Doe'
            }
          },
          {
            id: '3',
            title: 'Dr. Smith',
            description: 'Computer Science Professor',
            type: 'user',
            thumbnail: '/images/profile1.jpg',
            createdAt: new Date().toISOString()
          }
        ];
        setResults(mockResults);
      } catch (err) {
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    switch (result.type) {
      case 'course':
        navigate(`/Kambaz/Courses/${result.id}/Home`);
        break;
      case 'post':
        navigate(`/details/${result.id}`);
        break;
      case 'user':
        navigate(`/profile/${result.id}`);
        break;
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-4">
        <button 
          className="btn btn-link text-decoration-none me-3"
          onClick={() => navigate('/search')}
        >
          <FaArrowLeft /> Back to Search
        </button>
        <h2>Search Results for "{query}"</h2>
      </div>

      {results.length === 0 ? (
        <div className="alert alert-info">
          No results found for "{query}"
        </div>
      ) : (
        <div className="row g-4">
          {results.map(result => (
            <div key={result.id} className="col-md-6 col-lg-4">
              <div 
                className="card h-100 interactive-card"
                onClick={() => handleResultClick(result)}
                style={{ cursor: 'pointer' }}
              >
                {result.thumbnail && (
                  <img
                    src={result.thumbnail}
                    className="card-img-top"
                    alt={result.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{result.title}</h5>
                  <p className="card-text text-muted">
                    {result.description.substring(0, 150)}...
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-primary">{result.type}</span>
                    <small className="text-muted">
                      {new Date(result.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  {result.author && (
                    <div className="mt-2">
                      <small className="text-muted">
                        By {result.author.name}
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 