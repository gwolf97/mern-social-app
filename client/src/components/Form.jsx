import React, { useState } from 'react';
import axios from "axios"
import { TextField, Button, Paper, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPosts, updatePost, setCurrentID, setSkip } from '../actions/postActions';

const Form = () => {
  const [postData, setPostData] = useState({ message: '', tags: '', file: '' });
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const currentID = useSelector((state) => state.currentID)
  const post = useSelector((state) => currentID ? state.posts.posts.find(p => p._id === currentID) : null)
  const user = JSON.parse(localStorage.getItem("profile")) || null
  const name = user.result.name.split(" ")[0]

  React.useEffect(( )=>{
    if(post){
      setPostData({
        message: post.message,
        tags: post.tags,
        file: post.file
      })
    }else{
      clear()
    }
  },[currentID, post])

  const clear = () => {
    dispatch(setCurrentID(0))
    setPostData({ message: '', tags: '', selectedFile: '' });
    dispatch(getPosts())
    dispatch(setSkip(3))
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
        dispatch(updatePost(currentID, {...postData, name: user.result.name}))
        clear()
      }else{
        dispatch(createPost({...postData, name: user.result.name}))
        clear()
      }
  };

  const handleCancel = () => {
    dispatch(setCurrentID(0))
    setPostData({ message: '', tags: '', file: '' })
  }


  return (
    <Paper style={{background:"#2B2D2E", color:"#FEFEFE"}} sx={{margin:"20px 0"}}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography  style={{padding:"5px 0", marginLeft:"13px"}}>{name.toLowerCase()}</Typography>
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
          {currentID !== 0 && <Button style={{width:"10%", height:"28px", color:"FEFEFE", marginRight:"-100px"}} variant="contained" color="error" size="small" fullWidth onClick={handleCancel}>Cancel</Button>}
          <Button style={{width:"10%", height:"28px", color:"FEFEFE"}} variant="contained" color="primary" size="small" type="submit" fullWidth>{currentID === 0 ? "Post" : "Edit"}</Button>
        </div>
      </form>
    </Paper>
  );
};

export default Form;