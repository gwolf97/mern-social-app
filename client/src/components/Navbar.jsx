import React from 'react'
import { AppBar, Button, Toolbar} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const Navbar = () => {

const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("profile")))

console.log(user)

const navigate = useNavigate()

  return (
    <AppBar style={{background:"#1B1A1D", color:"#FEFEFE", display:"flex"}} position="static" color="inherit">
        <Toolbar style={{display:"flex", justifyContent:"space-around"}}>
            <Button onClick={() => navigate("/")}><i style={{fontSize:"20px"}} className="fa-solid fa-house"></i></Button>
            <Button onClick={() => navigate("/auth")}>Sign in</Button>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar