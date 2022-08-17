import React from 'react'
import { Container, Paper, Grid, Avatar, Typography, Button} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from '../components/Input';

const AuthScreen = () => {

    const [showPassword, setShowPassword] = React.useState(false)

    const [isSignup, setIsSignup] = React.useState(false)

    const handleShowPassword = () => setShowPassword(prev => !prev)
    const switchMode = () => setIsSignup(prev => !prev)

    const handleChange = () => {

    }

    const handleSubmit = () => {

    }



  return (
    <Container style={{display:"flex", justifyContent:"center", alignItems:"center", height:"80vh"}} component="main" maxWidth="xs">
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
                        <Button style={{width:"100px", marginTop:"20px"}} type="submit" variant="contained" color="primary">
                            {isSignup ? "Sign Up" : "Sign In"}
                        </Button>
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