  // src/pages/Feed.js
  import React, { useEffect, useState } from "react";
  import axios from "../services/api";
  import { Card, CardContent, Typography, CircularProgress, Grid } from "@mui/material";

  const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFeed = async () => {
      try {
        const usersRes = await axios.get("/users");
        const users = usersRes.data;

        const allPosts = [];

        for (const user of users) {
          const postsRes = await axios.get(`/users/${user.id}/posts`);
          postsRes.data.forEach(post => {
            allPosts.push({ ...post, userName: user.name });
          });
        }

        allPosts.sort((a, b) => b.id - a.id); // newest first
        setPosts(allPosts);
      } catch (err) {
        console.error("Feed Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchFeed();
    }, []);

    if (loading) return <CircularProgress />;

    return (
      <Grid container spacing={2}>
        {posts.map(post => (
          <Grid item xs={12} md={6} key={`${post.userId}-${post.id}`}
>
          <Card>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.body}</Typography>
              <Typography variant="caption">By {post.userName}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        ))}
      </Grid>
    );
  };

  export default Feed;
