import React from 'react';
import { Container} from '@mui/material';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import {useDispatch, useSelector} from "react-redux"
import {setSkip, loadMore} from "./actions/postActions"

function App() {

  const dispatch = useDispatch()
  const skip = useSelector(state => state.skip)

  const listInnerRef = React.useRef();

  const handleScroll = (e) =>{
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if(bottom){
      dispatch(setSkip(skip + 3))
      dispatch(loadMore(skip))
    }
  }


  return (
    <Router>
      <Container maxWidth="lg">
      <Navbar/>    
      <Routes>  
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/auth" element={<AuthScreen/>}/>
      </Routes>
      </Container>
    </Router>
  );
}

export default App;
