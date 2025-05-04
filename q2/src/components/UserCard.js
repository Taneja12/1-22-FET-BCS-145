// src/components/UserCard.js
import { Card, CardContent, Typography, Avatar, Stack } from "@mui/material";

export default function UserCard({ user }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={`https://source.unsplash.com/random/100x100?sig=${user.id}`}
            alt={user.name}
          />
          <div>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Posts: {user.postCount}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
