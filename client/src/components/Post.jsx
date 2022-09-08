import React from 'react';
import axios from "axios"
import { Card, CardActions, CardContent, Button, Typography, Menu, MenuItem, Avatar} from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from './DeleteModal';
import { deletePost, getPosts, likePost, setCurrentID, setSkip } from '../actions/postActions';
import CommentModal from './CommentModal';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, disable }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openComment, setOpenComment] = React.useState(false)
  const [profileData, setProfileData] = React.useState({file:""})
 
  const open = Boolean(anchorEl);
  const handleOpenModal = () => {setOpenModal(true) ; dispatch(setCurrentID(post._id))};
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenComment = () => {setOpenComment(true)};
  const handleCloseComment = () => {setOpenComment(false)}

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedInUserData = useSelector(state =>  state.auth.authData.result)
  const {_id} = loggedInUserData



  React.useEffect(() => {
    const getData = async () => {
      const {data} = await axios.get(`https://wolf-mern-social-app.herokuapp.com/user/${post.creator}`)
      setProfileData(data)
    }
    getData()
  }, [])

  const handleEdit = () => {
    setAnchorEl(null)
    dispatch(setCurrentID(post._id))
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  }

  const handleDelete = () => {
    dispatch(setCurrentID(post._id))
    dispatch(deletePost(post._id))
    setAnchorEl(null)
    setOpenModal(false)
    dispatch(setCurrentID(0))
    dispatch(getPosts())
    dispatch(setSkip(3))
  }

  

  return (
    <Card style={{background:"#2B2D2E", color:"#FEFEFE", width:"100%"}}>
      <div style={{display:"flex", justifyContent:"space-between", padding:"10px 0 10px 10px"}}>
        <div onClick={() => navigate(`/profile/${post.creator}`)} style={{display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer"}}> <Avatar src={profileData.file}/>  <Typography style={{marginLeft:"5px", fontSize:"14px", fontWeight:"600"}} variant="h6">{post.name.split(" ")[0].toLowerCase()}</Typography></div>
        {_id === post.creator && <Button disabled={disable} onClick={e => setAnchorEl(e.currentTarget)} style={{color:"#FEFEFE"}}><i style={{ borderRadius:"50%", cursor:"pointer"}} className='fa-solid fa-ellipsis'></i></Button>}
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
            background:"#2B2D2E", 
            color:"#FEFEFE"
          },
        }}
      >
          <MenuItem onClick={handleEdit}>
            Edit
          </MenuItem>
          <div>
          <MenuItem onClick={handleOpenModal}>
            Delete
          </MenuItem>
          <DeleteModal post={post} open={openModal} handleDelete={handleDelete} handleClose={handleCloseModal}/>
          </div>
      </Menu>
      </div >
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <img style={{ maxWidth:"98%", margin:"auto", borderRadius:"1%"}} src={post.file} alt="" />
      </div>
      <CardContent>
            <Typography style={{marginTop:"-5px"}} variant="body2" component="p"><span style={{fontWeight:"700"}} >{post.name.split(" ")[0].toLowerCase()}</span> {post.message}</Typography>
        <div style={{marginTop:"5px", marginBottom:"-20px"}} >
          <Typography variant="body2" color="primary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
      </CardContent>
      <CardActions style={{marginLeft:"2px"}}>
        <div style={{display:"flex", justifyContent: "space-between", width:"100%"}}>
        <Button disabled={disable} size="small" color="primary" onClick={() => {dispatch(likePost(post._id))}}>{post.likes.indexOf(_id) > -1 ? <i className="fa-solid fa-heart" style={{margin:"-2px 4px 0 0"}}></i> : <i className='fa-regular fa-heart' style={{margin:"-2px 4px 0 0"}}></i>} Like {`${post.likes.length}`}</Button>
        <Button disabled={disable} size="small" color="primary" onClick={handleOpenComment}><i className="fa-regular fa-comment" style={{margin:"-2px -12px 0 0", fontSize:"12px"}}> {`${post.numComments}`}</i></Button>
        </div>
        <CommentModal post={post} open={openComment} handleClose={handleCloseComment}/>
      </CardActions>
    </Card>
  );
};

export default Post;