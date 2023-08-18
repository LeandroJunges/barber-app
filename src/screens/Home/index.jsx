
import {
  Container, 
  Scroller,

  HeaderArea,
  HeaderTitle,
  SearchButton,
  
  LocationArea,
  LocationInput,
  LocationFinder,

  LoadingIcon,
  ListArea
} from './styles'

import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'


import * as Location from "expo-location"
import api from '../../service/api'
import { RefreshControl } from 'react-native'
import BarberItem from '../../components/BarberItem'

export default ()=> {

  const navigation = useNavigation()

  const [locationText, setLocationText] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false)

//console.log("eu sou a lista de barbeiros atualizada=>", list[0])




  const handleLocationFinder = async () => {

    setCoords(null)
    // Geolocation.requestAuthorization('whenInUse').then(result=> console.log(result))
    const {status} = await Location.requestForegroundPermissionsAsync();

     if (status == 'granted') {

      setLoading(true)
      setLocationText('')
      setList([])

      const location = await Location.getCurrentPositionAsync({})
        setCoords(location.coords);
        getBarbers()
        
      }else{
        console.log('Ooops não deu certo o user negou.')
      }
      
  }

const getBarbers = async () =>{
  setLoading(true);
  setList([]);

  let latitude = null;
  let longitude = null

  if(coords){
    latitude = coords.latitude;
    longitude = coords.longitude;
  }

  let res = await api.getBarbers(latitude, longitude, locationText)

  if(res.error == ''){
      if(res.loc){
        setLocationText(res.loc)
      }
    setList(res.data)

  }else{
    console.log("Erro: "+res.error )
  }

  setLoading(false)
  

}

useEffect(()=>{
  getBarbers();
},[])

const onRefresh = () =>{
  setRefreshing(false)
  getBarbers()
}

const handleLocationSearch = () =>{
  setCoords({})
  getBarbers()
}
  
  return(
    <Container>
      <Scroller refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>

        <HeaderArea>
          <HeaderTitle numberOfLines={2} >Encontre o seu barbeiro favorito</HeaderTitle>
          <SearchButton onPress={()=>navigation.navigate('Search')}>
            <SearchIcon width="26" height="26" fill="#FFFFFF" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>

          <LocationInput placeholder="Onde você está ?" placeholderTextColor="#FFFFFF" value={locationText} onChange={ t=> setLocationText(t) } onEndEditing={handleLocationSearch} />



          <LocationFinder onPress={handleLocationFinder }>
            <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
          </LocationFinder>

        </LocationArea>

        {loading && 
        
          <LoadingIcon size="large" color="#FFFFFF" />
  
        }

        <ListArea>
          {list.map((item, key)=>(
              <BarberItem key={key} data={item} />
          ))}
        </ListArea>



      </Scroller>
    </Container>
  );
}