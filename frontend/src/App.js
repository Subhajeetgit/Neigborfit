import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [preferences, setPreferences] = useState({
    safety: 3,
    affordability: 3,
    nightlife: 3,
    commute: 3,
    schools: 3
  });
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/neighborhoods")
      .then((res) => setNeighborhoods(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/match", preferences)
      .then((res) => setMatches(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <h1>NeighborFit</h1>

      <h2>All Neighborhoods</h2>
      <ul>
        {neighborhoods.map((n) => (
          <li key={n.id}>
            <strong>{n.name}</strong> (Safety: {n.safety}, Affordability: {n.affordability})
          </li>
        ))}
      </ul>

      <h2>Set Your Preferences</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(preferences).map((key) => (
          <div key={key}>
            <label>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
              <input
                type="range"
                min="1"
                max="5"
                name={key}
                value={preferences[key]}
                onChange={handleChange}
              />
              {preferences[key]}
            </label>
          </div>
        ))}
        <button type="submit">Find Matches</button>
      </form>

      {matches.length > 0 && (
        <>
          <h2>Recommended Neighborhoods</h2>
          <ul>
            {matches.map((m) => (
              <li key={m.id}>
                <strong>{m.name}</strong> - Match Score: {m.matchScore}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
