import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Temporary: Use absolute URL to bypass proxy issues
        const response = await fetch('http://localhost:5000/api/posts');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data); // Inspect data structure
        
        if (!Array.isArray(data)) {
          throw new Error('Expected array but got:', typeof data);
        }
        
        setPosts(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <h1>Blog Posts</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
              {post.author && <p>By: {post.author.name || post.author}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found (but API call succeeded)</p>
      )}
    </div>
  );
}

export default App;