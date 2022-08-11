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
    <AppBar position="static" color="inherit">
      <Typography variant="h2" align="center">mern-social-app</Typography>
    </AppBar>
    <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts/>
            </Grid>
            <Grid item xs={12} sm={4}>
             <Form/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  </Container>
  );
}

export default App;
