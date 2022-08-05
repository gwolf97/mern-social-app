import React from 'react';
import { Grid, CircularProgress } from '@mui/material';

const Posts = () => {

    const posts = ["post","post","post","post","post"]

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <p>{post}</p>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;