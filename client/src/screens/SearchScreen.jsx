import { Avatar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearSearch, getUsers } from '../actions/userActions'
import Input from '../components/Input'

const SearchScreen = () => {

    const [keyword, setKeyword] = React.useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(state => state.search.users)

    React.useEffect(() => {
      if(keyword === ""){
        dispatch(clearSearch())
      }else{
        dispatch(getUsers(keyword))
      }
    },[keyword])

    const handleChange = (e) => {
      setKeyword(e.target.value.trim())
  }



    
  return (
    <div>
        <div style={{ display:"flex", flexDirection:"column", color:"#fefefe", justifyContent:"center", alignItems:"center", marginTop:"20px"}}>
          <div style={{marginBottom:"30px"}}>
            <Input handleChange={handleChange} label="Search Users"/>
          </div>

          { users.map(user => (
            <div onClick={() => navigate(`/profile/${user._id}`)} style={{display:"flex", justifyContent:"start", alignItems:"center", width:"350px", padding:"10px 10px", border:"1px solid rgba(63,140,247,.5)", borderRadius:"5px", cursor:"pointer"}} key={user._id}>
              <Avatar src={user.file}/> <h3 style={{marginLeft:"10px"}}>{user.name}</h3>
            </div>
          ))}
        </div>
    </div>

  )
}

export default SearchScreen