import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { createComment, deleteComment } from '../actions/postActions';


const style = {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:"18rem",
    background:"#2B2D2E", 
    color:"#FEFEFE",
    border: '1px solid #1B1A1D',
    borderRadius:"3%",
    boxShadow: 24,
    p: 4,
  };
  
   function CommentModal({handleClose, open, post}) {
  
    const [commentData, setCommentData] = React.useState({comment:""})

    const comments = post.comments

    const dispatch = useDispatch()

    const loggedInUserData = useSelector(state =>  state.auth.authData.result)

    const handleComment = () => {
        dispatch(createComment(post._id, commentData))
        setCommentData({comment:""})
    }

    const handleDelete = (commentId) => {
        dispatch(deleteComment(post._id, commentId))
    }

    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography style={{textAlign:"center",}} id="modal-modal-title" variant="h6" component="h2">
            <Typography style={{margin:"-5px 0 10px 0", textAlign:"left"}} variant="body2" component="p"><span style={{fontWeight:"700"}} >{post.name.split(" ")[0].toLowerCase()}</span> {post.message}</Typography>
            </Typography>
            {comments.map(com =>
                <Box style={{display:"flex", justifyContent:"space-between", width:"100%"}} key={`${com} ${comments.indexOf(com)}`} item>
                     <Typography style={{marginTop:"2px"}} variant="body2" component="p"><span style={{fontWeight:"700"}} >{com.name.split(" ")[0].toLowerCase()}</span> {com.comment}</Typography>
                    {com.user === loggedInUserData._id && <Typography style={{marginTop:"2px", fontSize:"11px", cursor:"pointer"}} onClick={() => handleDelete(com._id)}>delete</Typography>}
                </Box>
            )}
            <Box style={{width:"100%"}} item id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField placeholder="write here..." inputProps={{ style: { color: "#FEFEFE"} , maxLength: 75}} name="comment" variant="outlined" fullWidth multiline rows={4} value={commentData.comment} onChange={(e) => setCommentData({...commentData, comment:e.target.value})} />
            </Box>
            <div style={{marginTop:"10px", display:"flex", width:"100%", justifyContent:"space-around"}}>
            <Button variant="contained" color="error" onClick={() => {handleClose() ; setCommentData({comment:""})}}>Back</Button>
            <Button disabled={commentData.comment.length === 0} variant="contained" onClick={handleComment}>Comment</Button>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }

export default CommentModal