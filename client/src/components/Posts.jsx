import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import {useSelector} from "react-redux"
import Post from './Post';

const Posts = () => {

    const posts = useSelector((state) => state.posts)

  

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid style={{marginBottom:"30px"}} container alignItems="stretch" spacing={3}>
        {posts.reverse().map((post) => (
          <Grid key={post._id} item xs={12} md={6}>
            <Post post={post}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;