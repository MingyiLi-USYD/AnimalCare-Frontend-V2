import {Avatar, Card} from 'antd';
const { Meta } = Card;
import {history} from 'umi'




const PetCard = ({id}) => {
   return (
       <div className={'pet-card'}>

       </div>
   )

}
export default PetCard;
/*
<Card
    onClick={()=>{history.push(`/pet/${data.petId}`)}}
    hoverable
    style={{
        width: 240,
        height:240,
    }}
    cover={<img alt="example" style={{height:150,objectFit:"cover"}} src={data.petAvatar}/>}
>

</Card>
*/
