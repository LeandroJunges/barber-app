
import {
  Container, 
  Scroller,

  HeaderArea,
  HeaderTitle,
  SearchButton,
  
  LocationArea,
  LocationInput,
  LocationFinder,

  LocationIcon
} from './styles'

import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { PERMISSIONS, request } from 'react-native-permissions'
import { Platform } from 'react-native'
import Geolocation from '@react-native-community/geolocation'

export default ()=> {

  const navigation = useNavigation()

  const [locationText, setLocationText] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const handleLocationFinder = async () => {

    setCoords(null)
    let result = await request(
      Platform.OS === 'ios'?
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if (result == 'granted') {

      setLoading(true)
      setLocationText('')
      SectionList([])

      Geolocation.getCurrentPosition((info)=>{
        setCoords(info.coords);
        getBarbers()
      })
      
    }

  }

  const getBarbers = () =>{

  }

  
  return(
    <Container>
      <Scroller>
        <HeaderArea>
          <HeaderTitle numberOfLines={2} >Encontre o seu barbeiro favorito</HeaderTitle>
          <SearchButton onPress={()=>navigation.navigate('Search')}>
            <SearchIcon width="26" height="26" fill="#FFFFFF" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>

          <LocationInput placeholder="Onde você está ?" placeholderTextColor="#FFFFFF" value={locationText} onChange={ t=> setLocationText(t) } />


          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
          </LocationFinder>

        </LocationArea>




      </Scroller>
    </Container>
  );
}