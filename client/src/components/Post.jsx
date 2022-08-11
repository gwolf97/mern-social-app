import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, Menu, MenuItem } from '@mui/material';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setCurrentID } from '../actions/userActions';

const Post = ({ post }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()

  const handleEdit = () => {
    setAnchorEl(null)
    dispatch(setCurrentID(post._id))
  }

  const handleDelete = () => {
    setAnchorEl(null)
  }

  return (
    <Card sx={{my:"20px"}}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <Typography variant="h6">{post.creator}</Typography>
        <i onClick={e => setAnchorEl(e.currentTarget)} style={{margin: "6px 5px 0 0", cursor:"pointer"}} className='fa-solid fa-ellipsis'></i>
        <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: "",
            width: '100px',
          },
        }}
      >
          <MenuItem onClick={handleEdit}>
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            Delete
          </MenuItem>
      </Menu>
      </div>
      <img style={{width:"100px"}} src={post.file} alt="" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <div >
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <CardActions>
      <Button size="small" color="primary" onClick={() => {}}><i className="fa-solid fa-heart" style={{margin:"-2px 4px 0 0"}}></i> Like 0</Button>
      </CardActions>
    </Card>
  );
};

export default Post;