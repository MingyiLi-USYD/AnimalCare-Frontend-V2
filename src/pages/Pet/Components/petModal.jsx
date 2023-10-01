import React from 'react';
import {Avatar, Button, Form, Input, Modal, Radio} from "antd";
import {updatePetById} from "@/services/petService";
import '../petDetail.less'
import {urlWrapper} from "@/utils/imageUtils";
const {TextArea} = Input;

function PetModal({open, close, data, setData, selectedPet, notify}) {
    const pet = data[selectedPet]
    const {petName, petDescription, petVisible, birthday} = pet
    const [form] = Form.useForm();
    const handleOk = async () => {
        const newPet = {...pet, ...form.getFieldsValue()}
        const {code} = await updatePetById( newPet)
        if (code === 1) {
            const newData = [...data]
            newData[selectedPet] = newPet
            setData(newData)
            notify('topRight', newPet.petName)
            close()
        }
    }
    const handleCancel = () => {
        close()
    }
    return (
        <Modal
            className={'edit-pet-modal'}
            title="Edit Pet"
            open={open}
            onCancel={handleCancel}
            footer={[
                <div key={'footer'} className={'footer'}>
                    <Button className={'edit-button'} danger>
                        Reset
                    </Button>
                    <Button className={'edit-button'} type={'primary'} onClick={handleOk}>
                        Save
                    </Button>
                </div>]}
        >
            <div className={'pet-edit-content'}>
                <Avatar size={64} src={urlWrapper(pet.petAvatar)}/>
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
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Description" name={'petDescription'} initialValue={petDescription}>
                        <TextArea rows={4} showCount maxLength={500}
                                  style={{
                                      height: 120,
                                      resize: 'none',
                                  }}/>
                    </Form.Item>
                    <Form.Item label={"Visibility"} name={'petVisible'} initialValue={petVisible}>
                        <Radio.Group>
                            <Radio value={true}>Public</Radio>
                            <Radio value={false}>Private</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {/*                    <Form.Item
                        label="Pet Birthday"
                        name="birthday"
                        rules={[
                            { required: true, message: 'Please fill the birthday !' },
                        ]}
                        initialValue={moment(birthday)}
                    >
                        <DatePicker />
                    </Form.Item>*/}
                </Form>
            </div>
        </Modal>
    );
}

export default PetModal;

