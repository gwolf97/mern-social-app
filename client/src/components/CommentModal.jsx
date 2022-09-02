import * as React from 'react';
import Box from '@mui/material/Box';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { createComment, deleteComment } from '../actions/postActions';
  
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
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="modal-dialog-title"
          aria-describedby="modal-dialog-description"
          PaperProps={{
            style: {
                background:"#2B2D2E", 
                color:"#FEFEFE",
                boxShadow: 24,
            },}}
          style={{
            position:"aboslute",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            maxWidth:"500px",
            margin:"auto"
        }}
        >
          <DialogContent>
            <div style={{textAlign:"center", maxWidth:"70vw"}} id="modal-modal-title" variant="h6" component="h2">
            <p style={{margin:"-5px 0 15px 0", textAlign:"left"}} variant="body2" component="p"><span style={{fontWeight:"700"}} >{post.name.split(" ")[0].toLowerCase()}</span> {post.message}</p>
            </div>
            {comments.map(com =>
                <p style={{display:"flex", justifyContent:"space-between", width:"100%", marginBottom:"8px"}} key={`${com} ${comments.indexOf(com)}`} >
                     <p style={{marginTop:"2px", maxWidth:"330px"}} variant="body2" component="p"><span style={{fontWeight:"700"}} >{com.name.split(" ")[0].toLowerCase()}</span> {com.comment} <br/> <span style={{fontSize:"11px", opacity:"0.6"}}>{moment(com.createdAt).fromNow()}</span> </p>
                    {com.user === loggedInUserData._id && <Typography style={{marginTop:"2px", fontSize:"11px", cursor:"pointer", opacity:"0.6"}} onClick={() => handleDelete(com._id)}>delete</Typography>}
                </p>
            )}
            <DialogContent style={{maxWidth:"80vw"}}  id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField placeholder="write here..." inputProps={{ style: { color: "#FEFEFE"} , maxLength: 75}} name="comment" variant="outlined" fullWidth multiline maxRows={4} value={commentData.comment} onChange={(e) => setCommentData({...commentData, comment:e.target.value})} />
            </DialogContent>
            <div style={{marginTop:"10px", display:"flex", width:"100%", justifyContent:"space-around"}}>
            <Button variant="contained" color="error" onClick={() => {handleClose() ; setCommentData({comment:""})}}>Back</Button>
            <Button disabled={commentData.comment.length === 0} variant="contained" onClick={handleComment}>Comment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

export default CommentModal
