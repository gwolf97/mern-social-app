import React from 'react'
import { Container, Paper, Grid, Avatar, Typography, Button} from '@mui/material';
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from '../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import {auth, signIn, signUp} from '../actions/userActions'

const AuthScreen = () => {

    const [showPassword, setShowPassword] = React.useState(false)
    const [isSignup, setIsSignup] = React.useState(false)
    const [authFormData, setAuthFormData] = React.useState({firstName:"", lastName:"", email:"", password:"", confirmPassword:""})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentID = useSelector(state => state.currentID)

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

        navigate("/")
       } catch (error) {
            console.log(error)
       }
    }
        /* global google */
        google.accounts.id.initialize({
            client_id:"453306460983-2n9u0t6u7ii5b0dbefmkrhdf9ed50vdj.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        
        google.accounts.id.renderButton(
            document.getElementById("googleDiv"),
            {theme:"outline", size:"medium"}
        );
    }, [dispatch, navigate])


    const handleChange = (e) => {
        setAuthFormData({...authFormData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isSignup){
           dispatch(signUp(authFormData))
        }else{
            dispatch(signIn(authFormData))
            currentID !== 0 ? navigate("/") : navigate("/auth")
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
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
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