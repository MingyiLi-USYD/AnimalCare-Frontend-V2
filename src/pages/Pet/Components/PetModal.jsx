import React, {useEffect, useState} from 'react';
import {Avatar, Button, Form, Input, Modal, Switch} from "antd";
import {updatePetById} from "../../../services/petService";
const { TextArea } = Input;

function PetModal({open,close,data,setData,selectedPet}) {
    const [petName,setPetName]= useState("")
    const [petDescription,setPetDescription]= useState("")
    const [checked,setChecked] = useState(false)

    useEffect(()=>{
        //setPet(selectedPet)
        setPetName(data[selectedPet].petName)
        setPetDescription(data[selectedPet].petDescription)
        setChecked(data[selectedPet].petVisible)

    },[open])
    const handleNameChange = (e)=>{
        setPetName(e.target.value)
    }

    const handleDescriptionChange = (e)=>{
        setPetDescription(e.target.value)
    }
    const onChange = (e)=>{
        setChecked(e)
    }
    const handleOk=  ()=>{
        const newPet = {
            ...data[selectedPet],
            petName,
            petDescription,
            petVisible:checked
        }

        const newData = [...data]
        newData[selectedPet]=newPet
        updatePetById(data[selectedPet].petId,newPet).then(()=>setData(newData))
        close()
    }
    const handleCancel=()=>{
        close()
    }
    return (
        <Modal

            title="Edit Pet"
            open={open}
            onCancel={handleCancel}
            footer={[  <Button type={'primary'} key={"Save"} onClick={handleOk}>
                Save
            </Button>]}
        >
            <div style={{  display: 'flex',
                flexDirection: "column",
                alignItems: "center" }}>
            <Avatar size={64} src={data[selectedPet].petAvatar}/>
            <h2>{data[selectedPet].petName}</h2>
            <p>{data[selectedPet].petDescription}</p>
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
            >
                <Form.Item label="Name">
                    <Input value ={petName} onChange={handleNameChange}/>
                </Form.Item>
                <Form.Item label="Description">
                    <TextArea rows={4} value ={petDescription} onChange={handleDescriptionChange} />
                </Form.Item>
                <Form.Item label="Public">
                    <Switch checked={checked} onChange={onChange}/>
                </Form.Item>
{/*                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item>*/}
            </Form>
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
