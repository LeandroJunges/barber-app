import { 
  CloseButton,
  DateInfo,
  DateItem,
  DateItemNumber,
  DateItemWeekday,
  DateList,
  DateNextArea,
  DatePrevArea,
  DateTitle,
  DateTitleArea,
  FinishButton,
  FinishButtonText,
  Modal,
  ModalArea,
  ModalBody,
  ModalItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  UserAvatar,
  UserInfo,
  UserName,
} from './style'
import {useNavigation} from '@react-navigation/native'
import ExpandIcon from '../../assets/expand.svg'
import NavPrevIcon from '../../assets/nav_prev.svg'
import NavNextIcon from '../../assets/nav_next.svg'
import { useEffect, useState } from 'react'
import api from '../../service/api'


const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
]

const days = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sab"
]


const BarberModal = ({show, setShow, user, service})=>{

  const navigation = useNavigation();

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);
  
  useEffect(()=>{
    if(user.available){

      
      let daysInMonth = new Date(selectedYear, selectedMonth+1, 0).getDate();
      let newListDays = [];
      
      for(let i = 1; i<=daysInMonth; i++){
        
        let oldDay = new Date(selectedYear, selectedMonth, i);
        let year = oldDay.getFullYear();
        let month = oldDay.getMonth();
        let day = oldDay.getDate();
        month = month < 10 ? '0'+month : month;
        day = day < 10 ? '0'+day : day;
        let selDate = `${year}-${month}-${day}`;
        
        let availability = user.available.filter(e=> e.date === selDate)
        
        newListDays.push({
          status: availability.length > 0 ? true : false,
          weekday: days[oldDay.getDay()],
          number: i
        });
        
      }
      
      setListDays(newListDays);
      setSelectedDay(0);
      setListHours([]);
      setSelectedHour(0);
      
    }
      
    },[user, selectedMonth, selectedYear])


  useEffect(()=>{
    if(user.available && selectedDay > 0){
      let nowDate = new Date(selectedYear, selectedMonth, selectedDay);
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth();
      let day = nowDate.getDate();
      month = month < 10 ? '0'+month : month;
      day = day < 10 ? '0'+day : day;
      let selDate = `${year}-${month}-${day}`;

      let availability = user.available.filter(e=> e.date === selDate)

      if(availability.length > 0){
        setListHours( availability[0].hours );
      }

    }
    setSelectedHour(null);
  },[user, selectedDay]);
    
  useEffect(()=>{
    let today = new Date()
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate())

  },[]);

  const handleCloseButton =()=>{
    setShow(false)
  }

  const handleFinishClick = async ()=>{
    if(user.id && service !== null && selectedYear > 0 && selectedMonth > 0 && selectedDay > 0 && selectedHour !== null ){
      
      let res = await api.setAppointment(
        user.id,
        service,
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour
      )
      if(res.error == ''){
        setShow(false)
        navigation.navigate('Appointments')
      }else{
        alert(res.error);
      }
      
    }else{

    }
  }

  const handleLeftDateClick = ()=>{
    let mountDate = new Date(selectedYear, selectedMonth, 1)
    mountDate.setMonth(mountDate.getMonth() - 1);

    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0)

  }

  const handleRightDateClick = ()=>{
    let mountDate = new Date(selectedYear, selectedMonth, 1)
    mountDate.setMonth(mountDate.getMonth() + 1);

    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0)
  }
  
  return(
    <Modal
      transparent={true}
      visible={show}
      animationType='slide'
    
    >
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton} >
            <ExpandIcon width="40" height="40" fill="#000"  />
          </CloseButton>

          <ModalItem>
            <UserInfo>
              <UserAvatar source={{uri: user.avatar}} />
              <UserName>{user.name}</UserName>
            </UserInfo>
          </ModalItem>

          {service !== null &&

              <ModalItem>
                <ServiceInfo>
                  <ServiceName> {user.services[service].name} </ServiceName>
                  <ServicePrice> R$ {user.services[service].price.toFixed(2)} </ServicePrice>
                </ServiceInfo>

              </ModalItem>
          }

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handleLeftDateClick} >
                <NavPrevIcon width="35px" height="35px" fill="#000" />
              </DatePrevArea>

              <DateTitleArea>
                <DateTitle>{months[selectedMonth]} {selectedYear}</DateTitle>
              </DateTitleArea>

              <DateNextArea onPress={handleRightDateClick} >
                <NavNextIcon width="35px" height="35px" fill="#000" />
              </DateNextArea>

            </DateInfo>
            <DateList horizontal={true} showsHorizontalScrollIndicator={false} >

              {listDays.map((item, key)=>(
                <DateItem key={key} onPress={()=>item.status? setSelectedDay(item.number) : null} style={{
                  opacity: item.status ? 1 : 0.5,
                  backgroundColor: item.number === selectedDay? "#4EADBE" : "#FFF"
                }} >
                  <DateItemWeekday style={{
                    color: item.number === selectedDay ? "#FFF": "#000"
                  }}>{item.weekday}</DateItemWeekday>

                  <DateItemNumber style={{
                    color: item.number === selectedDay ? "#FFF": "#000"
                  }} >{item.number}</DateItemNumber>
                </DateItem>
              ))}

            </DateList>
          </ModalItem>
          {
           selectedDay > 0 && listHours.length > 0 &&
            <ModalItem>
              <TimeList horizontal={true} showsHorizontalScrollIndicator={false}>
                {listHours.map((item, key)=>(
                  <TimeItem key={key} 
                  onPress={()=>setSelectedHour(item)}
                  style={{
                    backgroundColor: item === selectedHour? "#4EADBE" : "#FFF"
                  }}
                  >
                    <TimeItemText style={{
                    color: item === selectedHour ? "#FFF": "#000"
                  }} >{item}</TimeItemText>
                  </TimeItem>
                ))}

              </TimeList>
            </ModalItem>
          }

          <FinishButton onPress={handleFinishClick} >
            <FinishButtonText>Finalizar Agendamento</FinishButtonText>
          </FinishButton>

        </ModalBody>
      </ModalArea>

    </Modal>
  )

}

export default BarberModal