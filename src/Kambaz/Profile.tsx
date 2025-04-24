import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phone?: string;
  bio?: string;
  following: string[];
  followers: string[];
  posts: any[];
  bookmarks: any[];
}

const Profile: React.FC = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});

  useEffect(() => {
    // Fetch user data based on profileId or currentUser
    const userId = profileId || currentUser?._id;
    if (userId) {
      // TODO: Replace with actual API call
      setUser({
        _id: userId,
        username: 'johndoe',
        email: 'john@example.com',
        role: 'student',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123-456-7890',
        bio: 'Computer Science student',
        following: [],
        followers: [],
        posts: [],
        bookmarks: []
      });
    }
  }, [profileId, currentUser]);

  const handleEdit = () => {
    setEditedUser(user || {});
    setIsEditing(true);
  };

  const handleSave = async () => {
    // TODO: Implement API call to update user
    setUser({ ...user, ...editedUser } as User);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({});
    setIsEditing(false);
  };

  if (!user) return <div>Loading...</div>;

  const isOwnProfile = currentUser?._id === user._id;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">
                {user.firstName} {user.lastName}
                {isOwnProfile && (
                  <button 
                    className="btn btn-link float-end"
                    onClick={isEditing ? handleSave : handleEdit}
                  >
                    {isEditing ? <FaSave /> : <FaEdit />}
                  </button>
                )}
              </h2>
              {isEditing ? (
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editedUser.firstName || ''}
                    onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editedUser.lastName || ''}
                    onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                    placeholder="Last Name"
                  />
                  <textarea
                    className="form-control mb-2"
                    value={editedUser.bio || ''}
                    onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                    placeholder="Bio"
                  />
                  {isOwnProfile && (
                    <>
                      <input
                        type="email"
                        className="form-control mb-2"
                        value={editedUser.email || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        className="form-control mb-2"
                        value={editedUser.phone || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                        placeholder="Phone"
                      />
                    </>
                  )}
                  <button 
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-muted">{user.bio}</p>
                  {isOwnProfile && (
                    <>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Phone:</strong> {user.phone}</p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Following</h5>
                </div>
                <div className="card-body">
                  {user.following.length > 0 ? (
                    user.following.map(id => (
                      <div key={id} className="mb-2">
                        <a href={`/profile/${id}`}>User {id}</a>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">Not following anyone</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Followers</h5>
                </div>
                <div className="card-body">
                  {user.followers.length > 0 ? (
                    user.followers.map(id => (
                      <div key={id} className="mb-2">
                        <a href={`/profile/${id}`}>User {id}</a>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No followers</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent Activity</h5>
            </div>
            <div className="card-body">
              {user.posts.length > 0 ? (
                user.posts.map(post => (
                  <div key={post._id} className="mb-3">
                    <h6>{post.title}</h6>
                    <p className="text-muted">{post.content.substring(0, 150)}...</p>
                    <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                  </div>
                ))
              ) : (
                <p className="text-muted">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 