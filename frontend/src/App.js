import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Card,
  CardContent,
  Slider
} from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";

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
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/neighborhoods")
      .then((res) => setNeighborhoods(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (key) => (_, value) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/match",
        preferences,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMatches(res.data);
    } catch (err) {
      alert("Error fetching matches. Make sure you are logged in.");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            NeighborFit
          </Typography>
          {token ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute token={token}>
              <Container maxWidth="md">
                <Box mt={4}>
                  <Typography variant="h5">All Neighborhoods</Typography>
                  <Box display="grid" gap={2}>
                    {neighborhoods.map((n) => (
                      <Card key={n.id} variant="outlined">
                        <CardContent>
                          <Typography variant="h6">{n.name}</Typography>
                          <Typography variant="body2">
                            Safety: {n.safety}, Affordability: {n.affordability}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>

                  <Box mt={4}>
                    <Typography variant="h5">Set Your Preferences</Typography>
                    <form onSubmit={handleSubmit}>
                      {Object.keys(preferences).map((key) => (
                        <Box key={key} mb={2}>
                          <Typography>
                            {key}: {preferences[key]}
                          </Typography>
                          <Slider
                            value={preferences[key]}
                            min={1}
                            max={5}
                            step={1}
                            marks
                            valueLabelDisplay="auto"
                            onChange={handleChange(key)}
                          />
                        </Box>
                      ))}
                      <Button variant="contained" color="primary" type="submit">
                        Find Matches
                      </Button>
                    </form>
                  </Box>

                  {matches.length > 0 && (
                    <Box mt={4}>
                      <Typography variant="h5">Recommended Neighborhoods</Typography>
                      <Box display="grid" gap={2}>
                        {matches.map((m) => (
                          <Card key={m.id} variant="outlined" sx={{ backgroundColor: "#e3f2fd" }}>
                            <CardContent>
                              <Typography variant="h6">{m.name}</Typography>
                              <Typography variant="body2">
                                Match Score: {m.matchScore}
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Container>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
