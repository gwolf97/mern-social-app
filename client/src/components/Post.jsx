import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import moment from 'moment';

//import ThumbUpAltIcon from '@mui/icons/ThumbUpAlt';
//import DeleteIcon from '@mui/icons/Delete';
//import MoreHorizIcon from '@mui/icons/MoreHoriz';
//<Button size="small" color="primary" onClick={() => {}}><ThumbUpAltIcon fontSize="small" /> Like 0</Button>
//<Button size="small" color="primary" onClick={() => {}}><DeleteIcon fontSize="small" /> Delete</Button>
//<Button style={{ color: 'white' }} size="small" onClick={() => {}}><MoreHorizIcon fontSize="default" /></Button>
 //     <CardMedia />

const Post = ({ post }) => {

  return (
    <Card>
      <div >
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div >

      </div>
      <div >
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
  );
};

export default Post;