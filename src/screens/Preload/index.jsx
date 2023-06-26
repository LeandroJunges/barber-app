import React, { useContext, useEffect } from "react";
import {Container, LoadingIcon} from './styles'
import BarberLogo from '../../assets/barber.svg'
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import {useNavigation} from '@react-navigation/native'
import Api from "../../service/api";
import {UserContext} from "../../contexts/UserContext";


export default ()=>{
  const {dispatch: userDispatch} = useContext(UserContext)
  const navigation = useNavigation();

  useEffect(()=>{
    const checkToken = async ()=>{
      const token = await AsyncStorage.getItem('token');
      console.log('eu sou o token:',token)
      if(token){
        let res = await Api.checkToken(token)
        if(res.token){

          await AsyncStorage.setItem('token', res.token);

          userDispatch({
            type: 'setAvatar',
            payload : {
              avatar: res.data.avatar
            }
          });

        navigation.reset({
          routes: [{name: 'MainTab'}]
        });

        }else{
          navigation.navigate('SignIn')

        }
      }else{

        navigation.navigate('SignIn')
      }
      
    }
    checkToken();
  },[])


  return(
    <Container>
      <BarberLogo width="100%" heigth="160" />
      <LoadingIcon size="large" color="#FFFFFF" />
    </Container>
  )
}