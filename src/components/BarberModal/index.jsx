import { 
  CloseButton,
  DateInfo,
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
    setSelectedDay(1);
    setListHours([]);
    setSelectedHour(0);


  },[selectedMonth, selectedYear])

  useEffect(()=>{
    let today = new Date()
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate())

  },[]);

  const handleCloseButton =()=>{
    setShow(false)
  }

  const handleFinishClick = ()=>{

  }

  const handleLeftDateClick = ()=>{
    let mountDate = new Date(selectedYear, selectedMonth, 1)
    mountDate.setMonth(mountDate.getMonth() - 1);

    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(1)

  }

  const handleRightDateClick = ()=>{
    let mountDate = new Date(selectedYear, selectedMonth, 1)
    mountDate.setMonth(mountDate.getMonth() + 1);

    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(1)
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
                <DateItem key={key} onPress={()=>{}} >
                  <DateItemWeekDay>{item.weekday}</DateItemWeekDay>
                  <DateItemNumber>{item.number}</DateItemNumber>
                </DateItem>
              ))}

            </DateList>
          </ModalItem>

          <FinishButton onPress={handleFinishClick} >
            <FinishButtonText>Finalizar Agendamento</FinishButtonText>
          </FinishButton>

        </ModalBody>
      </ModalArea>

    </Modal>
  )

}

export default BarberModal