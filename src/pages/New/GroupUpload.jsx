import React, {useState} from 'react';
import {message, Upload,Form} from 'antd';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';

const MultipleImageUpload = ({limit,name,round}) => {
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList.filter((file) =>handleBeforeUpload(file) )
    };

    const [fileList, setFileList] = useState([]);

    const handleUpload = (info) => {

        let fileList = [...info.fileList];
        fileList = fileList.slice(-limit); // 限制上传的文件数量
        fileList = fileList.filter((file) =>handleBeforeUpload(file) )
        setFileList(fileList);
    };

    const handleRemove = (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    };

    const handleBeforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传 JPG/PNG 格式的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('图片大小不能超过 10MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const uploadButton = (
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
    );


    return (
        <Form.Item
            label="Upload" valuePropName="fileList" getValueFromEvent={normFile} name={name} rules={[{ required: true, message: 'Must have image' }]}
        >
            <Upload
                fileList={fileList}
                onChange={handleUpload}
                onRemove={handleRemove}
                beforeUpload={()=>false}
                listType={round?"picture-circle":"picture-card"}
            >
                {console.log(fileList.length,limit)}
                {fileList.length >= limit ? null : uploadButton}
            </Upload>
        </Form.Item>
    );
};

export default MultipleImageUpload;