// src/pages/TopUsers.js
import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Card, CardContent, Typography, CircularProgress, List, ListItem } from "@mui/material";

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopUsers = async () => {
    try {
      const usersRes = await axios.get("/users");
      const users = usersRes.data;

      const userPostCounts = [];

      for (const user of users) {
        const postsRes = await axios.get(`/users/${user.id}/posts`);
        userPostCounts.push({
          name: user.name,
          postCount: postsRes.data.length,
        });
      }

      const sorted = userPostCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
      setTopUsers(sorted);
    } catch (err) {
      console.error("Top Users Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopUsers();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Top 5 Users</Typography>
        <List>
          {topUsers.map((user, i) => (
            <ListItem key={i}>
              {user.name} — {user.postCount} posts
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TopUsers;
