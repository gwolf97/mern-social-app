import React, { useState } from 'react';
import axios from "axios"
import { TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../actions/postActions';
import { setCurrentID } from '../actions/userActions';

const Form = () => {
  const [postData, setPostData] = useState({ creator: '', message: '', tags: '', file: '' });
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const currentID = useSelector((state) => state.currentID)
  const clear = () => {
    dispatch(setCurrentID(0))
    setPostData({ creator: '', message: '', tags: '', selectedFile: '' });
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

      dispatch(createPost(postData))
      clear()
  };

  return (
    <Paper>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">Create a post</Typography>
        {uploading ? <CircularProgress/> : <div><img style={{width: "100px",}} src={postData.file} alt="" /></div>}
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div><input type="file" multiple={false} onChange={uploadFileHandler} /></div>
        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;