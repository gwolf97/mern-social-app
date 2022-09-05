import React from 'react'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {

const user = useSelector(state => state.auth.authData)

  return (
    <section style={{width:"100vw", height:"80vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
    <img style={{width:"300px", borderRadius:"50%"}} src="../images/profileimg.jpg"/> 
    <h3 style={{color:"#fefefe", marginTop:"40px"}} >{user.result.name.toUpperCase()}</h3>
    </section>

  )
}

export default ProfileScreen