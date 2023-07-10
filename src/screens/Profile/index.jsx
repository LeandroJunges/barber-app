
import { useNavigation } from '@react-navigation/native'
import api from '../../service/api'
import {Container} from './styles'
import { Text, Button } from 'react-native'

export default ()=>{
  
  const navigation = useNavigation()

  const handleLogoutClick = async ()=>{
    await api.logout();
    navigation.reset({
      routes: [{name: 'SignIn'}]
    });
  }
  
  return(
    <Container>
      <Text>Profile</Text>
      <Button title='sair' onPress={handleLogoutClick} />
    </Container>
  );
}