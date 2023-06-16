import React, {useEffect, useState} from 'react';
import {Avatar, Button, Popconfirm, Spin} from "antd";
import {useParams, useRequest} from "umi";
import {getPetDetail} from "../../services/api";
import { Image } from 'antd';
import  './PetDetail.less'
import PetImageUpload from "./Components/PetImageUpload";
import {deleteImageOfPet} from "../../services/petService";
import {useModel} from "umi";
import BackForward from "../../components/BackForward";
import NotFoundPage from "../404";


function PetDetail() {
    const params = useParams();
    const {petId} = params
    const [loading, setLoading] = useState(true);
    const [pet,setPet] = useState({})
    const {initialState:{currentUser} } = useModel('@@initialState');
    const initData = async ()=>{
      const res =  await getPetDetail(petId);
      setPet(res.data)
      setLoading(false); // 请求结束，设置 loading 为 false
    }
    useEffect(()=>{
        initData();
    },[petId])
    const handleDelete = (image)=>{
        deleteImageOfPet(image)
      setPet({...pet,petImageList:[...pet.petImageList].filter(item=>item.id!==image.id)})

    }
    if (loading) {
        return <Spin />; // 在加载中显示 Spin 或其他加载提示
    }
    if(!pet){
        return <NotFoundPage/>
    }
/*    console.log(currentUser)
    console.log(pet)*/
    return (
        <div>
        <BackForward/>
        <div style={{ textAlign: 'center' }}>
            <div>
                <Avatar size={64} src={`/common/download?name=${pet.petAvatar}`}/>
                <h2>{pet.petName}</h2>
                <p>{pet.petDescription}</p>
            </div>
            {currentUser.id===pet.userId&&<PetImageUpload petId={pet.petId} setPet={setPet} pet={pet}/>}
            <div style={{ marginTop: '50px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {pet.petImageList.map((item) => (
                        <div key={item.id} className={'image-wrapper'}>
                            <Image  className={'imageStyle'}   src={`/common/download?name=${item.url}`}/>
                            {      currentUser.id===pet.userId&&
                                <Popconfirm
                                title="Delete image"
                                description="Are you sure to delete this image?"
                                onConfirm={()=>handleDelete(item)}
                                onCancel={()=>{}}
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
{/*                <Image.PreviewGroup
                    preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                >
                    {
                        pet.petImageList.map((item)=>
                         <Image  className={style.imageStyle}  key={item}  src={`/common/download?name=${item}`}/>

                        )

                    }

                </Image.PreviewGroup>*/}
export default PetDetail;
