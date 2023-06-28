import {Avatar, Button, Image, Input, List, message, Modal, Popconfirm, Switch} from 'antd';
import BackForward from "../../components/BackForward";
import style from './PetDetail.less'
import React, {useEffect, useState} from "react";
import {deletePetById, getPets} from "../../services/petService";
import {history} from "umi";
import PetImageUpload from "./Components/PetImageUpload";
import PetModal from "./Components/PetModal";

const PetList = () => {
    const [data,setData] = useState([]);
    const [open,setOpen] = useState(false)
    const [selectedPet,setSelectedPet]= useState(0)


    const fetchData = async ()=>{
        const res = await getPets();
        setData(res.data)
    }
    useEffect(()=>{
        fetchData()
    },[])
    const confirm = async (id) => {
        const {code} = await deletePetById(id)
        if(code===1){
            const newData = [...data].filter(item=> item.petId!==id)
            setData(newData)
            message.success('Click on Yes')
        }else {
            message.error("???")
        }
    };
    const cancel = (e) => {

    };
    const handleEdit = (index)=>{
        setSelectedPet(index)
        setOpen(true)
    }

    return (

        <div>
            <BackForward/>
            <h2 style={{textAlign:"center"}}>Pet Management</h2>
            <List
                pagination={{
                    position:'bottom',
                    align:'center',
                }}
                dataSource={data}
                renderItem={(item,index) => (

                    <List.Item   actions={[
                        <Button type={"primary"}  className={style.button} key="list-loadmore-edit" onClick={()=>handleEdit(index)}>Edit</Button>,
                        <Popconfirm
                            title="Delete pet"
                            description="Are you sure to delete this pet?"
                            onConfirm={()=>confirm(item.petId)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No">
                            <Button danger className={style.button} key="list-loadmore-more">Delete</Button>
                        </Popconfirm>
                    ]}>
                        <List.Item.Meta
                            avatar={
                                <Avatar style={{cursor:"pointer"}} size={64} src={item.petAvatar} onClick={()=>{history.push(`/pet/${item.petId}`)}} />
                            }
                            title={<a onClick={()=>{history.push(`/pet/${item.petId}`)}}>{item.petName}</a>}
                            description={item.petDescription}
                        />
                    </List.Item>
                )}
            />

            {
                open&&<PetModal close={()=>{setOpen(false)}} open={open} data={data} setData={setData} selectedPet={selectedPet}  />
            }


        </div>


    );
};
export default PetList;

/*
        <div>

        </div>*/