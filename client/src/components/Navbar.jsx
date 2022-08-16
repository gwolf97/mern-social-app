import React from 'react'
import { AppBar, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

const navigate = useNavigate()

  return (
    <AppBar style={{background:"#1B1A1D", color:"#FEFEFE"}} position="static" color="inherit">
        <Button onClick={() => navigate("/auth")}>Sign in</Button>
    </AppBar>
  )
}

export default Navbar