import React from 'react'
import { Container, Paper, Grid, Avatar, Typography, Button, TextField} from '@mui/material';
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from '../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import {auth, signIn, signUp} from '../actions/userActions'

const AuthScreen = () => {

    const [showPassword, setShowPassword] = React.useState(false)
    const [isSignup, setIsSignup] = React.useState(false)
    const [authFormData, setAuthFormData] = React.useState({userName:"", email:"", password:"", confirmPassword:""})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleShowPassword = () => setShowPassword(prev => !prev)
    const switchMode = () => {
        setIsSignup(prev => !prev) 
    }

    React.useEffect(() => {
        const handleCallbackResponse = async(res) => {
            var token = res.credential
            var response = jwt_decode(res.credential)
            
       try {
        dispatch(auth(response, token))

        navigate("/home")
       } catch (error) {
            navigate("/")
            console.log(error)
       }
    }
    }, [dispatch, navigate])


    const handleChange = (e) => {
        setAuthFormData({...authFormData, [e.target.name]: e.target.value.trim()})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isSignup){
           dispatch(signUp(authFormData))
        }else{
            dispatch(signIn(authFormData))
        }
    }

  return (
    <Container style={{display:"flex", justifyContent:"center", alignItems:"center", height:"90vh"}} component="main" maxWidth="xs">
        <Paper style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"20px 20px",  background:"#2B2D2E", color:"#FEFEFE"}} elevation={3}>
            <Avatar>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography style={{marginBottom:"20px"}} variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
            <form  onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                             <TextField style={{width:"100%", margin:"0 0 0 15px"}} InputLabelProps={{style: { color: "#FEFEFE" } }}  inputProps={{style:{color:"#fefefe"}, maxLength:15}} name="userName" label="Username" value={authFormData.userName} onChange={handleChange} autoFocus/>                           
                        )}
                    <Input name="email" label="Email Address" handleChange={handleChange} value={authFormData.email} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange}  type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <Button style={{width:"175px", margin:"20px 0", height:"35px"}} type="submit" variant="contained" color="primary">
                            {isSignup ? "Sign Up" : "Sign In"}
                        </Button>
                            <div id="googleDiv"></div>
                        <Grid container style={{margin:"25px -15px -15px 0"}} direction="column" alignItems="end">
                            <Grid item>
                                <Button style={{fontSize:"12px", }} onClick={switchMode}>
                                    {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default AuthScreen