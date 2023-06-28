import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Upload, message, Progress} from 'antd';
import { useState } from 'react';
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const PetImageUpload = ({petId,setPet,pet}) => {
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const handleChange = (info) => {
        console.log(info)
        if (info.event){
            setUploadProgress(info.event.percent)
        }

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
              const res = JSON.parse(info.file.xhr.response);
              setPet({...pet
                  ,petImageList:[...pet.petImageList,res.data]})
              setLoading(false);
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <div>
            <Upload
                name="image"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action={`/api/pet/image/${petId}`}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                headers={{auth:localStorage.getItem('token')}}
            >
                {uploadButton}
            </Upload>
            {uploadProgress > 0 && uploadProgress < 100 && (
                <Progress percent={uploadProgress} />
            )}
        </div>


    );
};
export default PetImageUpload;