
import { useState } from 'react';
import {Container, Scroller} from './styles'
import { RefreshControl} from 'react-native'

export default ()=>{
  const [refreshing, setRefreshing] = useState(false)
  
  const getFavBarber = () =>{

  }

  const onRefresh = () =>{
    setRefreshing(false)
    getFavBarber()
  }

  return(
    <Container>
      <Scroller refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
      } >
        

      </Scroller>
    </Container>
  );
}