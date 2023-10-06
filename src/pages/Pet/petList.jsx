import {Avatar, Button, List, message, notification, Popconfirm, Typography} from 'antd';
import BackForward from "../../components/BackForward";
import './petDetail.less'
import React, {useEffect, useState} from "react";
import {deletePetById, getPets} from "@/services/petService";
import {history} from "umi";
import PetModal from "./Components/petModal";
import {urlWrapper} from "@/utils/imageUtils";

const {Title} = Typography;
const PetList = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false)
    const [selectedPet, setSelectedPet] = useState(0)
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, name) => {
        api.info({
            message: 'Update Notification',
            description: `Update Pet ${name} successfully`,
            placement,
        });
    };

    const fetchData = async () => {
        const res = await getPets();
        setData(res.data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    const confirm = async (id) => {
        const {code} = await deletePetById(id)
        if (code === 1) {
            const newData = [...data].filter(item => item.petId !== id)
            setData(newData)
            message.success('Click on Yes')
        } else {
            message.error("???")
        }
    };
    const cancel = (e) => {

    };
    const handleEdit = (index) => {
        setSelectedPet(index)
        setOpen(true)
    }


    return (

        <div className={'pets-page'}>
            {
                contextHolder
            }
            <BackForward/>
            <Title style={{textAlign: "center"}} level={3}>Pet Management</Title>
            <List
                pagination={{
                    position: 'bottom',
                    align: 'center',
                }}
                dataSource={data}
                renderItem={(item, index) => (

                    <List.Item actions={[
                        <Button type={"primary"} className={'edit-button'} key="list-loadmore-edit"
                                onClick={() => handleEdit(index)}>Edit</Button>,
                        <Popconfirm
                            title="Delete pet"
                            description="Are you sure to delete this pet?"
                            onConfirm={() => confirm(item.petId)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No">
                            <Button danger className={'edit-button'} key="list-loadmore-more">Delete</Button>
                        </Popconfirm>
                    ]}>
                        <List.Item.Meta
                            avatar={
                                <Avatar style={{cursor: "pointer"}} size={64} src={urlWrapper(item.petAvatar)}
                                        onClick={() => {
                                            history.push(`/pet/${item.petId}`)
                                        }}/>
                            }
                            title={<a onClick={() => {
                                history.push(`/pet/${item.petId}`)
                            }}>{item.petName}</a>}
                            description={item.petDescription}
                        />
                    </List.Item>
                )}
            />

            {
                open && <PetModal close={() => {
                    setOpen(false)
                }} open={open} data={data} setData={setData} selectedPet={selectedPet} notify={openNotification}/>
            }


        </div>


    );
};
export default PetList;

/*
        <div>

        </div>*/