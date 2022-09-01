import React from 'react';
import { Container, Grow, Grid } from '@mui/material';
import Posts from '../components/Posts';
import {useDispatch, useSelector} from "react-redux"
import { getPosts, loadMore, setSkip } from '../actions/postActions';
import Form from '../components/Form';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { SpinnerDotted } from 'spinners-react';


const HomeScreen = () => {

  const dispatch = useDispatch()
  const skip = useSelector(state => state.skip)
  const {loading} = useSelector(state => state.posts)

  React.useEffect(() => {
    dispatch(getPosts())
    dispatch(setSkip(3))
  },[dispatch])

  const handleScroll = () => {
      dispatch(setSkip(skip + 3))
      dispatch(loadMore(skip))
  }

 useBottomScrollListener(handleScroll);

  return (
    <Grow in>
    <Container >
      <Grid container justify="center" alignItems="center" spacing={3}>

      <Grid item xs={1} sm={3}></Grid>

      <Grid item xs={10} sm={6} justify="center" alignItems="center" >
        <Grid item xs={12}>
          <Form skip={skip}/>
        </Grid>
        <Grid item xs={12}>
          <Posts/>
          {loading && <Grid style={{display:"flex", width:"100%", justifyContent:"center", alignItems:"center"}} md={6} item><SpinnerDotted color="#408df7"/></Grid> }
        </Grid>
      </Grid>

      <Grid item xs={1} sm={3}></Grid>

      </Grid>
    </Container>
  </Grow>
  )
}

export default HomeScreen