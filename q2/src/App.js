// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Feed from "./pages/Feed";
import TrendingPosts from "./pages/TrendPosts";
import TopUsers from "./pages/TopUsers";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Social Analytics
          </Typography>
          <Button color="inherit" component={Link} to="/">Feed</Button>
          <Button color="inherit" component={Link} to="/trending">Trending</Button>
          <Button color="inherit" component={Link} to="/top-users">Top Users</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/trending" element={<TrendingPosts />} />
        <Route path="/top-users" element={<TopUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
