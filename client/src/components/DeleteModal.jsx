import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Post from './Post';

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

 function DeleteModal({handleClose, open, post, handleDelete}) {

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
            Are you sure you want to delete this post?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Post disable={true} post={post}/>
          </Typography>
          <div style={{marginTop:"10px", display:"flex", width:"100%", justifyContent:"space-around"}}>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteModal