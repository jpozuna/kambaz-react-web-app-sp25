import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaHeart, FaBookmark, FaShare } from 'react-icons/fa';

interface DetailItem {
  id: string;
  title: string;
  content: string;
  type: 'course' | 'post' | 'user';
  thumbnail?: string;
  createdAt: string;
  author?: {
    id: string;
    name: string;
  };
  relatedItems?: DetailItem[];
  reviews?: {
    id: string;
    content: string;
    rating: number;
    author: {
      id: string;
      name: string;
    };
    createdAt: string;
  }[];
}

const Details: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [item, setItem] = useState<DetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // This is mock data for demonstration
        const mockItem: DetailItem = {
          id: id || '1',
          title: 'Introduction to Computer Science',
          content: 'A comprehensive introduction to computer science concepts...',
          type: 'course',
          thumbnail: '/images/course1.jpg',
          createdAt: new Date().toISOString(),
          author: {
            id: '1',
            name: 'Dr. Smith'
          },
          relatedItems: [
            {
              id: '2',
              title: 'Data Structures and Algorithms',
              content: 'Learn about fundamental data structures...',
              type: 'course',
              thumbnail: '/images/course2.jpg',
              createdAt: new Date().toISOString()
            }
          ],
          reviews: [
            {
              id: '1',
              content: 'Great course! Very informative.',
              rating: 5,
              author: {
                id: '2',
                name: 'John Doe'
              },
              createdAt: new Date().toISOString()
            }
          ]
        };
        setItem(mockItem);
      } catch (err) {
        setError('Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;
  if (!item) return <div className="container mt-5">Item not found</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-4">
        <button 
          className="btn btn-link text-decoration-none me-3"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Back
        </button>
        <h2>{item.title}</h2>
      </div>

      <div className="row">
        <div className="col-md-8">
          {item.thumbnail && (
            <img
              src={item.thumbnail}
              className="img-fluid rounded mb-4"
              alt={item.title}
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          )}

          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">{item.title}</h3>
              {item.author && (
                <p className="text-muted">
                  By <a href={`/profile/${item.author.id}`}>{item.author.name}</a>
                </p>
              )}
              <p className="card-text">{item.content}</p>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary">
                  <FaHeart /> Like
                </button>
                <button className="btn btn-outline-primary">
                  <FaBookmark /> Save
                </button>
                <button className="btn btn-outline-primary">
                  <FaShare /> Share
                </button>
              </div>
            </div>
          </div>

          {item.reviews && item.reviews.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">Reviews</h4>
              </div>
              <div className="card-body">
                {item.reviews.map(review => (
                  <div key={review.id} className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <a href={`/profile/${review.author.id}`}>
                          {review.author.name}
                        </a>
                        <span className="ms-2">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i} className="text-warning">★</span>
                          ))}
                        </span>
                      </div>
                      <small className="text-muted">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <p className="mb-0">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-md-4">
          {item.relatedItems && item.relatedItems.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">Related Items</h4>
              </div>
              <div className="card-body">
                {item.relatedItems.map(relatedItem => (
                  <div 
                    key={relatedItem.id}
                    className="mb-3 cursor-pointer"
                    onClick={() => navigate(`/details/${relatedItem.id}`)}
                  >
                    {relatedItem.thumbnail && (
                      <img
                        src={relatedItem.thumbnail}
                        className="img-fluid rounded mb-2"
                        alt={relatedItem.title}
                        style={{ height: '150px', objectFit: 'cover' }}
                      />
                    )}
                    <h5>{relatedItem.title}</h5>
                    <p className="text-muted mb-0">
                      {relatedItem.content.substring(0, 100)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details; 