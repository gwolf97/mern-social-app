import React, { useState } from 'react';
import axios from "axios"
import { TextField, Button, Paper, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPosts, updatePost, setCurrentID } from '../actions/postActions';

const Form = () => {
  const [postData, setPostData] = useState({ creator: '', message: '', tags: '', file: '' });
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const currentID = useSelector((state) => state.currentID)
  const post = useSelector((state) => currentID ? state.posts.posts.find(p => p._id === currentID) : null)

  React.useEffect(( )=>{
    if(post){
      setPostData({
        creator: post.creator,
        message: post.message,
        tags: post.tags,
        file: post.file
      })
    }
  },[currentID, post])

  const clear = () => {
    dispatch(setCurrentID(0))
    setPostData({ creator: '', message: '', tags: '', selectedFile: '' });
    dispatch(getPosts())
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    setUploading(true)
    
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const {data} = await axios.post("http://localhost:5000/upload", formData, config)

        setPostData({...postData, file: data})
        setUploading(false)
    } catch (error) {
        console.error(error)
        setUploading(false)
        setPostData({...postData, file:""})
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      
      if(currentID !== 0){
        dispatch(updatePost(currentID, postData))
        clear()
      }else{
        dispatch(createPost(postData))
        clear()
        dispatch(getPosts())
      }

  };


  return (
    <Paper style={{background:"#2B2D2E", color:"#FEFEFE"}} sx={{margin:"20px 0"}}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField InputLabelProps={{style: { color: "#FEFEFE" } }} inputProps={{ style: { color: "#FEFEFE" } }} name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        {uploading ? <CircularProgress/> : <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}><img style={{ maxWidth:"98%", margin:"auto", borderRadius:"1%"}} src={postData.file} alt="" /></div>}
        <TextField placeholder="message" inputProps={{ style: { color: "#FEFEFE" } }} style={{color:"#FEFEFE"}} name="message" variant="outlined" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField InputLabelProps={{style: { color: "#FEFEFE" } }} inputProps={{ style: { color: "#FEFEFE" } }} name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"end", padding:"15px 15px"}}>
          <div className="image-upload">
            <label htmlFor="file-input">
              <i style={{cursor:"pointer", color:"#408BF7", fontSize:"20px", marginRight:"10px"}} className="fa-solid fa-image"></i>
            </label>
            <input id="file-input" type="file" multiple={false} onChange={uploadFileHandler} />
          </div>
          <Button style={{width:"10%", height:"28px", color:"FEFEFE"}} variant="contained" color="primary" size="small" type="submit" fullWidth>Post</Button>
        </div>
      </form>
    </Paper>
  );
};

export default Form;