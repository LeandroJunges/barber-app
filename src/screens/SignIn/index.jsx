import React, { useState, useContext } from "react";
import {Container,InputArea,SignMessageButton,CustomButtonText, CustomButton,SignMessageButtonTextBold,SignMessageButtonText} from './styles'
import BarberLogo from '../../assets/barber.svg';
import SignInput from '../../components/SignInput/inde';
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

import Api from '../../service/api'
import {UserContext} from '../../contexts/UserContext'




export default ()=>{
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("")

  const {dispatch: userDispatch} = useContext(UserContext)

  const navigation = useNavigation()

  const handleSignClick = async ()=>{
    if(emailField != '' && passwordField != ''){
    
      let json = await Api.signIn(emailField, passwordField);
      if(json.token){
        await AsyncStorage.setItem('token', json.token);

        userDispatch({
          type: 'setAvatar',
          payload : {
            avatar: json.data.avatar
          }
        });

        navigation.reset({
          routes: [{name: 'MainTab'}]
        });

      }else{
        alert('E-mail e/ou senha errados!')
      }

    }else{
      alert('Preencha os campos!')
    }
  }


  const handleMessageButtonClick =()=>{

      navigation.reset({
        routes: [{name: 'SignUp'}]
      });
  }



  return(
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput IconSvg={EmailIcon} placeholder="Digite seu e-mail" value={emailField} onChangeText={text => setEmailField(text)} />
        <SignInput  IconSvg={LockIcon} placeholder="Digite sua senha" value={passwordField} onChangeText={text => setPasswordField(text)} password={true} />

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>

        <SignMessageButtonText>Ainda não possui uma conta? </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastra-se</SignMessageButtonTextBold>

      </SignMessageButton>

    </Container>
  )
}