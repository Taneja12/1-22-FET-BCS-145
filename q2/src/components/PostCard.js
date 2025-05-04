// src/components/PostCard.js
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

export default function PostCard({ post }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={`https://source.unsplash.com/random/400x200?sig=${post.id}`}
        alt="Post visual"
      />
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2" color="text.secondary">{post.content}</Typography>
        <Typography variant="caption" display="block" mt={1}>
          Comments: {post.commentCount}
        </Typography>
      </CardContent>
    </Card>
  );
}
