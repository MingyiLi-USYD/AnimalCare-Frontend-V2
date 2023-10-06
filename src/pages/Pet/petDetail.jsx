import React, {useEffect, useState} from 'react';
import {Avatar, Button, Image, Popconfirm, Space,Typography} from "antd";
import {useModel, useParams} from "umi";
import './petDetail.less'
import PetImageUpload from "./Components/petImageUpload";
import {deleteImageOfPet, getPetById} from "@/services/petService";
import BackForward from "../../components/BackForward";
import NotFoundPage from "../404";
import Loading from "../../components/Loading";
import {urlWrapper} from "@/utils/imageUtils";
const { Title } = Typography;
function PetDetail() {
    const params = useParams();
    const {petId} = params
    const [loading, setLoading] = useState(true);
    const [pet, setPet] = useState({})
    const {initialState: {currentUser}} = useModel('@@initialState');
    const initData = async () => {
        const res = await getPetById(petId);
        setPet(res.data)
        setLoading(false); // 请求结束，设置 loading 为 false
    }
    useEffect(() => {
        initData();
    }, [petId])
    const handleDelete = (image) => {
        deleteImageOfPet(image.imageId)
        setPet({...pet, petImage: [...pet.petImage].filter(item => item.imageId !== image.imageId)})
    }
    if (loading) {
        return <Loading/>; // 在加载中显示 Spin 或其他加载提示
    }
    if (!pet) {
        return <NotFoundPage/>
    }
    return (
        <div className={'pet-detail'}>
            <BackForward/>
            <div style={{textAlign: 'center'}}>
                <Space direction={"vertical"} align={"center"} style={{marginBottom:50}}>
                    <Avatar size={64} src={urlWrapper(pet.petAvatar)}/>
                    <Title level={3}>{pet.petName}</Title>
                    <Title level={5} color={'blue'}>{pet.petDescription}</Title>
                </Space>
                {currentUser.userId === pet.userId && <PetImageUpload petId={pet.petId} setPet={setPet} pet={pet}/>}
                <div style={{marginTop: '50px'}}>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {pet.petImage.map((item) => (
                            <div key={item.imageId} className={'image-wrapper'}>
                                <Image className={'imageStyle'} src={urlWrapper(item.imageUrl)}/>
                                {currentUser.userId === pet.userId &&
                                    <Popconfirm
                                        title="Delete image"
                                        description="Are you sure to delete this image?"
                                        onConfirm={() => handleDelete(item)}
                                        onCancel={() => {
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className={"delete-button"}
                                            size={"small"}
                                            danger
                                        >
                                            Delete
                                        </Button>
                                    </Popconfirm>
                                }

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PetDetail;
