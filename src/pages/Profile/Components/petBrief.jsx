import {Avatar, Carousel, Modal} from 'antd';
import { useEffect } from 'react';
import {useDispatch, useRequest, useSelector} from 'umi';
import { connect} from 'dva';
import {getPostById} from "@/services/postService";
import {parseStringToList} from "@/utils/arrayUtils";
import {getPetById, getPets} from "@/services/petService";
import {closePetBriefModal} from "@/actions/petBriefActions";

const carouselImageStyle = {
    objectFit: 'cover',  // 自动裁剪图片
    height: '300px',    // 设置高度为 300px
    display: 'block',   // 显示为块级元素
    margin: '0 auto',   // 水平居中
};
const PetBrief = () => {

    const { run, loading, data } = useRequest(getPetById, {
        manual: true,
    });
    const dispatch=useDispatch()
    const {open,petId} = useSelector(state => state.petBriefModel)
    useEffect(() => {

       //run(`${petId}`);
    }, [petId]);
    return (
        <>
            {data && (
                <Modal
                    footer={[]}
                    title="Post Detail Modal"
                    open={open}
                    onCancel={() => dispatch(closePetBriefModal())}
                >
                {/*    <div style={{ textAlign: 'center' }}>
                        <div>
                            <Avatar size={64} src={data.userAvatar}/>
                            <h2>{data.topic}</h2>
                            <p>{data.postContent}</p>
                        </div>

                        <div style={{ marginTop: '50px' }}>
                            <Carousel autoplay={true}>
                                {parseStringToList(data.images).map((url, index) => (
                                    <div className={"111"} key={index} style={{ height: '300px' }}>
                                        <img
                                            src={url}
                                            style={carouselImageStyle}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>*/}
                </Modal>
            )}
        </>
    );
};
export default PetBrief

