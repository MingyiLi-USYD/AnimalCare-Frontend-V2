import {Avatar, Card} from 'antd';
import {parseStringToList} from "../../../utils/arrayUtils";
import {connect} from "umi";
const { Meta } = Card;
const showPostDetail = (dispatch,id)=>{
    dispatch({
        type:"PostModel/openModal",
        payload:id
    })
}
const PostCard = ({data,dispatch}) => {

    return (
        <Card
            onClick={()=>{showPostDetail(dispatch,data.postId)}}
            hoverable
            style={{
                width: 240,
                height:240,
            }}
            cover={<img alt="example" style={{height:150,width:240,objectFit:"cover"}} src={"/common/download?name="+parseStringToList(data.images)[0]}/>}
        >
            <Meta style={{overflow:"hidden",height:80}}
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                title={data.topic}
            />
        </Card>
    );
}
export default connect((PostModel)=>{return {...PostModel}})(PostCard);



