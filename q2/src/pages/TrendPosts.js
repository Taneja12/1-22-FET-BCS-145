// src/pages/TrendingPosts.js
import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Card, CardContent, Typography, CircularProgress, Grid } from "@mui/material";

const TrendingPosts = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrending = async () => {
    try {
      const usersRes = await axios.get("/users");
      const users = usersRes.data;

      const postCommentCounts = [];

      for (const user of users) {
        const postsRes = await axios.get(`/users/${user.id}/posts`);
        const posts = postsRes.data;

        for (const post of posts) {
          const commentsRes = await axios.get(`/posts/${post.id}/comments`);
          postCommentCounts.push({
            ...post,
            userName: user.name,
            commentCount: commentsRes.data.length,
          });
        }
      }

      const maxCount = Math.max(...postCommentCounts.map(p => p.commentCount));
      const mostCommented = postCommentCounts.filter(p => p.commentCount === maxCount);

      setTrending(mostCommented);
    } catch (err) {
      console.error("Trending Posts Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      {trending.map(post => (
        <Grid item xs={12} md={6} key={post.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.body}</Typography>
              <Typography variant="caption">By {post.userName} — 💬 {post.commentCount} comments</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TrendingPosts;
