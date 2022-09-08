import React from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import {Avatar} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUserFile } from '../actions/userActions';
import { SpinnerDotted } from 'spinners-react';

const ProfileScreen = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const user = useSelector(state => state.auth.authData)
const profile = useSelector(state => state.profile.profile )
const {loading} = useSelector(state => state.profile)
const {id} = useParams()

const [uploading, setUploading] = React.useState(false)
const [profileData, setProfileData] = React.useState({file:"", name:"", _id: id})


React.useEffect(() => {
    dispatch(getUser(id))
    setProfileData({file: profile.file || "", name: profile.name || "", _id: id})
}, [id, dispatch, profile.file])

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

        const {data} = await axios.post("https://wolf-mern-social-app.herokuapp.com/upload", formData, config)

        dispatch(updateUserFile(data))
        setUploading(false)
        navigate("/")
    } catch (error) {
        console.error(error)
        setUploading(false)
        setProfileData(prev => prev)
    }
  }

  return (
    <>
    <section style={{width:"100vw", height:"80vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
    {loading ? <SpinnerDotted color="#408df7"/> : (<><Avatar sx={{width:300, height:300}} src={profileData.file} variant="contained"/>
        <h3 style={{color:"#fefefe", marginTop:"40px"}} >{profileData.name.toUpperCase()}</h3></>)}
    </section>
    {id === user.result._id && (<section>
         <div className="image-upload">
            <label htmlFor="file-input">
              <i style={{cursor:"pointer", color:"#408BF7", fontSize:"12px", marginRight:"10px"}} className="fa-solid fa-image"> change profile picture</i>
            </label>
            <input id="file-input" type="file" multiple={false} onChange={uploadFileHandler} />
        </div>
    </section>)}
    </>



  )
}

export default ProfileScreen