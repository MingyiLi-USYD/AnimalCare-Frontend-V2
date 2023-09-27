import {useState} from 'react';
import {message, Upload} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {v4 as uuidv4} from "uuid";
import {useModel} from "umi";
import UploadingProgress from "../../../components/UploadingProgress";
import {addImageOfPet} from "@/services/petService";


const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
        message.error('Image must be smaller than 10MB!');
    }
    return isJpgOrPng && isLt10M;
};

const PetImageUpload = ({petId, setPet, pet}) => {
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const callback = (progressEvent) => {
        const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`上传进度: ${percentCompleted}%`);
        setUploadProgress(percentCompleted)
    }


    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    const handleBeforeUpload = async (file) => {
        if (!beforeUpload(file)) {
            return false;
        }

        const {code, data} = await addImageOfPet(petId, file,callback)
        console.log(data)
        if (code === 1) {
            setLoading(false)
            setPet({...pet, petImage: [...pet.petImage, data]});
        }
        return false; // Prevent Ant Design Upload component from uploading the file
    };

    return (
        <div>
            <Upload
                name="image"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={handleBeforeUpload}
            >
                {uploadButton}
            </Upload>
            {uploadProgress > 0 && uploadProgress < 100 && (
                <UploadingProgress percent={uploadProgress}/>
            )}
        </div>
    );
};

export default PetImageUpload;
