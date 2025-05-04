const express = require("express");
const router = express.Router();
const { fetchUsers, fetchPosts, fetchComments } = require("../services/service");

router.get("/users", async (req, res) => {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (err) {
    console.error("Route Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


router.get("/users/:id/posts", async (req, res) => {
  try {
    const posts = await fetchPosts(req.params.id);
    res.json(posts);
  } catch {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/posts/:id/comments", async (req, res) => {
  try {
    const comments = await fetchComments(req.params.id);
    res.json(comments);
  } catch {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

module.exports = router;
