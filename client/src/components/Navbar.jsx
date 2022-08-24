import React from 'react'
import { AppBar, Button, Toolbar, Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../actions/userActions';
import {isExpired} from "react-jwt"


const Navbar = () => {

const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("profile")) || null)

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
    }else{
      navigate("/")
    }

}, [navigate, auth.authData])

const handleLogOut = () => {
    dispatch(logOut())

    navigate("/auth")

    setUser(null)
}

  return (
    <AppBar style={{background:"#1B1A1D", color:"#FEFEFE", display:"flex"}} position="static" color="inherit">
        <Toolbar style={{display:"flex", justifyContent:"space-around"}}>
            {user !== null && <Button disabled={user === null ? true : false} onClick={() => navigate("/")}><i style={{fontSize:"20px"}} className="fa-solid fa-house"></i></Button>}
            {user !== null && <Avatar style={{cursor:"pointer"}} onClick={handleLogOut}></Avatar>}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar