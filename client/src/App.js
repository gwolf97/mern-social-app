import React from 'react';
import { Container} from '@mui/material';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {


  return (
    <Router>
      <Container maxWidth="lg">
      <Navbar/>    
      <Routes>  
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/profile/:id" element={<ProfileScreen/>}/>
          <Route path="/auth" element={<AuthScreen/>}/>
      </Routes>
      </Container>
    </Router>
  );
}

export default App;
