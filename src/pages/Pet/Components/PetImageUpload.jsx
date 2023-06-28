import { useState } from 'react';
import { Upload, message, Progress } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {storage} from "../../../firebaseConfig";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4 as uuidv4} from "uuid";
import {useModel} from "../../../.umi/exports";
import UploadingProgress from "../../../components/UploadingProgress";
import {addImageOfPet} from "../../../services/petService";


const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const PetImageUpload = ({ petId, setPet, pet }) => {
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const {initialState:{currentUser} } = useModel('@@initialState');

/*
    const handleChange = (info) => {
        if (info.event) {
            setUploadProgress(info.event.percent);
        }

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            const imageUrl = info.file.response;
            setPet({
                ...pet,
                petImageList: [...pet.petImageList, imageUrl],
            });
            setLoading(false);
        }
    };
*/

    const handleFirebaseUpload = async (file) => {
        const storageRef = ref(storage, currentUser.userName+`petImages/${petId}/${uuidv4()}`);
        //storageRef.child()
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setUploadProgress(progress);
            },
            (error) => {
                message.error('Failed to upload image');
            },
            async () => {
              const downloadURL = await getDownloadURL( uploadTask.snapshot.ref)
                message.success('Image uploaded successfully');
               console.log(downloadURL)
                const {code,data} =  await addImageOfPet(petId,downloadURL)
                if(code===1){
                    setLoading(false)
                    setPet({...pet, petImageList: [...pet.petImageList, data]});
                }
            }
        );
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleBeforeUpload = (file) => {
        if (!beforeUpload(file)) {
            return false;
        }
        handleFirebaseUpload(file);
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
