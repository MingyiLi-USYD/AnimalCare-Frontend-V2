import React, {useEffect, useState} from 'react';
import {Avatar, Button, Form, Input, Modal, Switch} from "antd";
import {updatePetById} from "../../../services/petService";
const { TextArea } = Input;

function PetModal({open,close,data,setData,selectedPet,notify}) {
    const pet = data[selectedPet]
    const petName = pet.petName
    const petDescription = pet.petDescription
    const checked = pet.petVisible
    const [form] = Form.useForm();
    const handleOk=  async ()=>{

        const newPet={...pet,...form.getFieldsValue()}
        console.log(newPet)
        const {code}=await updatePetById(pet.petId,newPet)
            if(code===1){
                const newData = [...data]
                newData[selectedPet]=newPet
                setData(newData)
                notify('topRight',newPet.petName)
                close()
            }else {

            }

    }
    const handleCancel=()=>{
        close()
    }
    return (
        <Modal
            title="Edit Pet"
            open={open}
            onCancel={handleCancel}
            footer={[  <Button type={'primary'} key={"Save"}  onClick={handleOk}>
                Save
            </Button>]}
        >
            <div style={{  display: 'flex',
                flexDirection: "column",
                alignItems: "center" }}>
            <Avatar size={64} src={pet.petAvatar}/>
            <h2>{pet.petName}</h2>
            <p>{pet.petDescription}</p>

            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 20,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 800,
                }}
                form={form}
            >
                <Form.Item label="Name" name={'petName'} initialValue={petName}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description"  name={'petDescription'} initialValue={petDescription}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    valuePropName="checked"
                    getValueProps={value=> value}
                    label="Public"
                    name={'petVisible'}
                    initialValue={checked}
                >
                    <Switch defaultChecked={checked} />
                </Form.Item>
            </Form >
            </div>
        </Modal>
    );
}

export default PetModal;

/*
<div style={{  display: 'flex',
    flexDirection: "column",
    justifyContent:"center",
    alignItems: "center" }}>

    <Avatar size={64} src={`/common/download?name=${pet.petAvatar}`}/>
    <h2>{pet.petName}</h2>
    <p>{pet.petDescription}</p>
    <div>
        <span style={{color:"blue"}}>PetName: </span>
        <Input value={petName} style={{width:'40%',fontsize:40}}  showCount maxLength={15} onChange={handleNameChange} />
    </div>
    <div>PetVisible to Public: <Switch defaultChecked={false} /></div>

    <label>PetDescription: </label>
    <TextArea  rows={4} value={petDescription} style={{width:'100%',fontsize:40}}   maxLength={50} onChange={handleDescriptionChange} />


</div>*/
