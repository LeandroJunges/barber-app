import { UserContext } from '../../contexts/UserContext';

import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import TodayIcon from '../../assets/today.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import AccountIcon from '../../assets/account.svg';
import { useContext } from 'react';
import { AvatarIcon, TabArea, TabItem, TabItemCenter } from './style';


export default ({state, navigation})=>{
  const {state : user } = useContext(UserContext);
  const goTo = (screenName)=>{
    navigation.navigate(screenName)
  }

  return (
    <TabArea>
      <TabItem onPress={()=> goTo('Home')}>
        <HomeIcon style={{opacity: state.index===0? 1 : 0.5 }} width="24" heigth="24" fill="#FFFFFF" />
       </TabItem>
       <TabItem onPress={()=> goTo('Search')}>
        <SearchIcon style={{opacity: state.index===1? 1 : 0.5 }} width="24" heigth="24" fill="#FFFFFF" />
       </TabItem>
       <TabItemCenter onPress={()=> goTo('Appointments')} >
        <TodayIcon width="32" heigth="32" fill="#4EABDE" />
       </TabItemCenter>
       <TabItem onPress={()=> goTo('Favorites')} >
        <FavoriteIcon style={{opacity: state.index===3? 1 : 0.5 }} width="24" heigth="24" fill="#FFFFFF" />
       </TabItem>
       <TabItem onPress={()=> goTo('Profile')}>
        {user.avatar != ''?
            <AvatarIcon source={{uri: user.avatar}} />
          :  
            <AccountIcon style={{opacity: state.index===4? 1 : 0.5 }} width="24" heigth="24" fill="#FFFFFF" />
      }
       </TabItem>
    </TabArea>
  )

}