const React = require('react');
const { useState, useEffect } = require('react');
const axios = require('axios');

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return React.createElement('div', null, 'Loading...');

  return React.createElement('div', null,
    React.createElement('h1', null, 'Blog Posts'),
    React.createElement('ul', null,
      posts.map(post => 
        React.createElement('li', { key: post._id },
          React.createElement('h3', null, post.title),
          React.createElement('p', null, post.content)
        )
      )
    )
  );
}

module.exports = Posts;