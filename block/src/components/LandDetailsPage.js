// LandDetailsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LandDetailsPage() {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await axios.get('http://localhost:5000/lands');
        setLands(response.data);
      } catch (error) {
        console.error('Fetch lands error:', error.message);
      }
    };

    fetchLands();
  }, []);

  return (
    <div>
      <h2>Land Details</h2>
      <ul>
        {lands.map((land) => (
          <li key={land.id}>
            Location: {land.location}, Area: {land.area}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LandDetailsPage;
