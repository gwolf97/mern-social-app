import React from 'react'
import { AppBar, Button, Toolbar, Avatar, Popover, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../actions/userActions';
import {isExpired} from "react-jwt"


const Navbar = () => {

const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("profile")) || null)

const [anchorEl, setAnchorEl] = React.useState(null);
const [profileOpen, setProfileOpen] = React.useState(false)

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

const isTokenExpired = user === null ? "no token" : isExpired(user.token) 

const auth = useSelector(state => state.auth)

const navigate = useNavigate()
const dispatch = useDispatch()

React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")))

    if(isTokenExpired){
      navigate("/auth")
    }

    if(auth.authData === null){
      navigate("/auth")
      return
    }else if(profileOpen){
      return
    }else if(auth.success){
      navigate("/")
      return
    }else if(auth.error){
      navigate("/auth")
      return
    }else{
      navigate("/")
    }

}, [navigate, auth.authData, isTokenExpired])

const handleProfile = () => {
  setProfileOpen(true)
  navigate(`/profile/${user.result._id}`)
}

const handleLogOut = () => {
    dispatch(logOut())

    navigate("/auth")

    setUser(null)
}

  return (
    <AppBar style={{background:"#1B1A1D", color:"#FEFEFE", display:"flex"}} position="static" color="inherit">
        <Toolbar style={{display:"flex", justifyContent:"space-around"}}>
            {user !== null && <Button disabled={user === null ? true : false} onClick={() => {navigate("/") ; setProfileOpen(false)}}><i style={{fontSize:"20px"}} className="fa-solid fa-house"></i></Button>}
            {user !== null && (
              <>
              <Avatar aria-describedby={id} variant="contained" onClick={handleClick} style={{cursor:"pointer"}}></Avatar>
              <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              PaperProps={{style: {backgroundColor:"#2B2D2E"}}}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Typography  sx={{p:1, backgroundColor:"#2B2D2E", color:"#FEFEFE", cursor:"pointer", borderBottom:"1px solid #1B1A1D"}} onClick={() => {handleClose() ; handleProfile()}}>Profile</Typography>
              <Typography  sx={{p:1, backgroundColor:"#2B2D2E", color:"#FEFEFE", cursor:"pointer"}} onClick={() => {handleClose() ; handleLogOut()}}>Logout</Typography>
            </Popover>
            </>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar