// AddLandPage.js
import React, { useState } from 'react';

import axios from 'axios';

function AddLandPage() {
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/add-land', { location, area });
      console.log('Land added successfully');
    } catch (error) {
      console.error('Add land error:', error.message);
    }
  };

  return (
    <div>
      <h2>Add Land</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          Area (sqft):
          <input type="number" value={area} onChange={(e) => setArea(e.target.value)} />
        </label>
        <button type="submit">Add Land</button>
      </form>
    </div>
  );
}

export default AddLandPage;
