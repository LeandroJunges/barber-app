import React, { useState } from "react";
import {Container,InputArea,SignMessageButton,CustomButtonText, CustomButton,SignMessageButtonTextBold,SignMessageButtonText} from './styles'
import BarberLogo from '../../assets/barber.svg';
import SignInput from "../../components/SignInput/inde";
import PersonIcon from '../../assets/person.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import { useNavigation } from "@react-navigation/native";



export default ()=>{
  const [nameField, setNameField] = useState("")
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("")

  const navigation = useNavigation()

  const handleSignClick =()=>{

  }


  const handleMessageButtonClick =()=>{

      navigation.reset({
        routes: [{name: 'SignIn'}]
      });
  }



  return(
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput IconSvg={PersonIcon} placeholder="Digite seu nome" value={emailField} onChangeText={text => setEmailField(text)} />
        <SignInput IconSvg={EmailIcon} placeholder="Digite seu e-mail" value={emailField} onChangeText={text => setEmailField(text)} />
        <SignInput  IconSvg={LockIcon} placeholder="Digite sua senha" value={passwordField} onChangeText={text => setPasswordField(text)} password={true} />

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>

        <SignMessageButtonText>Já possui uma conta? </SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>

      </SignMessageButton>

    </Container>
  )
}