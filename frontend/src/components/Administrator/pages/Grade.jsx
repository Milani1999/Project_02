import React, { useState } from 'react';

const Grade = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [newsList, setNewsList] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newNewsItem = { title, description, image };
    setNewsList([...newsList, newNewsItem]);
    // Clear form fields after submission
    setTitle('');
    setDescription('');
    setImage('');
  };

  const handleDeleteNews = (index) => {
    const updatedNewsList = newsList.filter((_, i) => i !== index);
    setNewsList(updatedNewsList);
  };

  return (
    <div className="grade-container">
      <div className="column">
        <h2>Manage News</h2>
        <form className="form" onSubmit={handleSubmit}>
          <h3>Add News</h3>
          {/* ... (input fields) ... */}
          <button type="submit">Submit News</button>
        </form>
      </div>
      <div className="column">
        <h2>Posted News</h2>
        <ul className="news-list">
          {newsList.map((news, index) => (
            <li key={index} className="news-item">
              <h3>{news.title}</h3>
              <div className="news-buttons">
                <button className="delete-button" onClick={() => handleDeleteNews(index)}>
                  Delete News
                </button>
                <button className="edit-button">Edit News</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Grade;
