import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import Posts from './components/Posts';
import {useDispatch, useSelector} from "react-redux"
import { getPosts } from './actions/postActions';
import Form from './components/Form';


function App() {

  const dispatch = useDispatch()
  const currentID = useSelector((state) => state.currentID)

  React.useEffect(() => {
    dispatch(getPosts())
  },[currentID, dispatch])

  return (
    <Container maxWidth="lg">
    <AppBar style={{background:"#1B1A1D", color:"#FEFEFE"}} position="static" color="inherit">
      <Typography variant="h2" align="center">mern-social-app</Typography>
    </AppBar>
    <Grow in>
        <Container>
          <Grid container justify="center" alignItems="center" spacing={3}>

          <Grid item xs={1} sm={3}></Grid>

          <Grid item xs={10} sm={6} justify="center" alignItems="center" >
            <Grid item xs={12}>
              <Form/>
            </Grid>
            <Grid item xs={12}>
              <Posts/>
            </Grid>
          </Grid>

          <Grid item xs={1} sm={3}></Grid>

          </Grid>
        </Container>
      </Grow>
  </Container>
  );
}

export default App;
