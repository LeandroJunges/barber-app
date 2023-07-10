import { useNavigation } from "@react-navigation/native"
import Stars from "../Stars"
import { Area, Avatar, InfoArea, SeeProfileButton, SeeProfileButtonText, UserName } from "./styles"



const BarberItem = ({data})=>{
  const navigation = useNavigation();

  const handleClick = ()=>{
    navigation.navigate('Barber', {
      id: data.id,
      avatar: data.avatar,
      name: data.name,
      stars: data.stars
    });
  }

  return (
    <Area onPress={handleClick}>
      <Avatar source={{uri: data.avatar}} />
      <InfoArea>
        <UserName>{data.name}</UserName>
        <Stars stars={data.stars} showNumber={true} />

        <SeeProfileButton>
          <SeeProfileButtonText>Ver perfil</SeeProfileButtonText>
        </SeeProfileButton>
      </InfoArea>

    </Area>
  )
}

export default BarberItem