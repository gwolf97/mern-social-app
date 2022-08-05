import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';

function App() {
  return (
    <Container maxWidth="lg">
    <AppBar position="static" color="inherit">
      <Typography variant="h2" align="center">mern-social-app</Typography>
    </AppBar>
    <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <h1>posts</h1>
            </Grid>
            <Grid item xs={12} sm={4}>
              <h1>form</h1>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  </Container>
  );
}

export default App;
