import { StarArea, StarText, StarView } from "./styles"
import StarFull from '../../assets/star.svg'
import StarHalf from '../../assets/star_half.svg'
import StarEmpty from '../../assets/star_empty.svg'


const Stars = ({stars, showNumber})=>{
  let littleStar = [0, 0, 0, 0, 0];

  let floor = Math.floor(stars);
  let left = stars - floor;

  for(var i = 0; i < floor; i++ ){
    littleStar[i] = 2;
  }

  if(left > 0){
    littleStar[i] = 1
  }




  return (
    <StarArea>
      {littleStar.map((item, key)=>(
        <StarView key={key}>
          {item === 0 && <StarEmpty width="18" height="18" fill="#FF9200" />}
          {item === 1 && <StarHalf width="18" height="18" fill="#FF9200" />}
          {item === 2 && <StarFull width="18" height="18" fill="#FF9200" />}
        </StarView>
      ))}

      {showNumber && <StarText>{stars}</StarText> }
    </StarArea>
  )
}

export default Stars