
import { useNavigation, useRoute } from '@react-navigation/native';
import {
        Container,
        BackButton,
        Scroller,
        PageBody,
        LoadingIcon,
        
        SwipeDot,
        SwipeDotActive,
        SwipeImage,
        SwipeItem,
        FakeSwiper,
        
        
        UserInfoArea,
        UserAvatar,
        UserInfo,
        UserInfoName,
        UserFavButton,
        
        ServiceArea,
        ServiceInfo,
        ServiceItem,
        ServiceName,
        ServicesTitle,
        ServicePrice,
        ServiceChooseButton,
        ServiceChooseBtnText,

        TestimonialArea,
        TestimonialInfo,
        TestimonialName,
        TestimonialBody,
        TestimonialItem


      } from './styles'

import { useEffect, useState } from 'react';
import api from '../../service/api';
import Swiper from 'react-native-swiper/src';
import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';
import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg'
import NavNextIcon from '../../assets/nav_next.svg'

export default ()=>{

  const navigation = useNavigation();
  const route = useRoute();

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars
  })
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false)
  
  useEffect(()=>{
    const getBarberInfo = async ()=>{
      setLoading(true)

      let json = await api.getBarber(userInfo.id);

      if(json.error == ''){
        setUserInfo(json.data);
        setFavorited(json.data.favorited);

      }else{
        alert("Erro: "+json.error)
      }
      setLoading(false);
    }
    getBarberInfo();
  },[])

  const handleBackButton = () =>{
    navigation.goBack();
  }

  const handleFavClick = ()=>{
    setFavorited(!favorited);
    api.setFavorite(userInfo.id);
  }

  const handleServiceChoose = (key)=>{
    setSelectedService(key)
    setShowModal(true)
  }

  return(
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ? 
          <Swiper style={{height: 240}} 
          dot={<SwipeDot />} 
          activeDot={<SwipeDotActive />}
          paginationStyle= {{top:15, right: 15, bottom: null, left: null}}
          autoplay={true}          
          >
            {userInfo.photos.map((photo, key)=>(
              <SwipeItem key={key} >
                <SwipeImage source={{uri: photo.url}} resizeMode="cover" />
              </SwipeItem>
            ))}

          </Swiper>
          :
          <FakeSwiper></FakeSwiper>
        }

        <PageBody>

          <UserInfoArea>
            <UserAvatar source={{uri:userInfo.avatar}} />
            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber={true} />
            </UserInfo>
            <UserFavButton onPress={handleFavClick}>
              {favorited ? 
                <FavoriteFullIcon width="24" height="24" fill="#FF0000" />
              :
              
                <FavoriteIcon width="24" height="24" fill="#FF0000" />
              
              }



            </UserFavButton>

          </UserInfoArea>
          {loading && 
            <LoadingIcon size="large" color="#000000" />
          }
          {userInfo.services &&
            <ServiceArea >
              <ServicesTitle>Lista de Serviços</ServicesTitle>

                {userInfo.services.map((service, key)=> (
                    <ServiceItem key={key}>
                    <ServiceInfo>
                      <ServiceName>{service.name}</ServiceName>
                      <ServicePrice>R$ {service.price.toFixed(2)}</ServicePrice>
                    </ServiceInfo>

                    <ServiceChooseButton onPress={()=> handleServiceChoose(key)} >
                      <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                    </ServiceChooseButton>

                    </ServiceItem>
                ))}
            </ServiceArea>
          } 
        {userInfo.testimonials && userInfo.testimonials.length > 0  && 
        
            <TestimonialArea>
              <Swiper
                style={{height: 110}}
                showsPagination={false}
                showsButtons={true}
                prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
                nextButton={<NavNextIcon width="35" height="35" fill="#000000" />}
              >
                {userInfo.testimonials.map((item, key)=>(
                  <TestimonialItem key={key}>
                      <TestimonialInfo>
                        <TestimonialName>{item.name}</TestimonialName>
                        <Stars stars={item.rate} showNumber={false} />
                      </TestimonialInfo>

                      <TestimonialBody>{item.body}</TestimonialBody>

                  </TestimonialItem>
                ))}

              </Swiper>
        
            </TestimonialArea>
        }

        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton} >
        <BackIcon width="44" height="44" fill="#FFFFFF" />
      </BackButton>
        <BarberModal 
        show={showModal} 
        setShow={setShowModal}
        user={userInfo}
        service={selectedService}
        />

    </Container>
  );
}