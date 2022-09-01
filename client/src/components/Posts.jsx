import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import {useSelector} from "react-redux"
import Post from './Post';
import { SpinnerDotted } from 'spinners-react';


const Posts = () => {

    const posts = useSelector((state) => state.posts.posts)

  return (
    !posts.length ? <Grid style={{display:"flex", width:"100%", justifyContent:"center", alignItems:"center"}} md={6} item><SpinnerDotted color="#408df7"/></Grid>  : (
      <Grid style={{marginBottom:"30px", display: "flex", justifyContent:"center"}} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} md={9}>
            <Post post={post}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;