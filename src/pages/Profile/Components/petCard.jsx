import {Avatar, Card} from 'antd';
const { Meta } = Card;
import {history} from 'umi'
import {DogLogo, Logo} from "../../../assets/logo/Logo";
//import {Logo, DogLogo} from "../../../assets/logo/Logo";



const PetCard = ({data}) => {
   return (
        <Card
            onClick={()=>{history.push(`/pet/${data.petId}`)}}
            hoverable
            style={{
                width: 240,
                height:240,
            }}
            cover={<img alt="example" style={{height:150,objectFit:"cover"}} src={data.petAvatar}/>}
        >

            <Meta
                avatar={<Avatar icon={data.category==='cat'?<Logo/>:<DogLogo/>} />}
                title={data.petName}
            />
        </Card>
    );
}
export default PetCard;
