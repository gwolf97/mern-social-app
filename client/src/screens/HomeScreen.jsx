import React from 'react';
import { Container, Grow, Grid } from '@mui/material';
import Posts from '../components/Posts';
import {useDispatch, useSelector} from "react-redux"
import { getPosts } from '../actions/postActions';
import Form from '../components/Form';

const HomeScreen = () => {


  const dispatch = useDispatch()
  const currentID = useSelector((state) => state.currentID)

  React.useEffect(() => {
    dispatch(getPosts(0))
  },[currentID, dispatch])

  return (
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
  )
}

export default HomeScreen