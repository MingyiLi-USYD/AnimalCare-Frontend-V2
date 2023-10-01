import {request} from "umi";
import axios from "axios";
export const newPet = async (value,callback) => {
    const { avatar, petName, petDescription, category, petVisible,birthday } = value;

    const formData = new FormData();

    formData.append('avatar', avatar[0].originFileObj);

    formData.append('petName', petName);
    formData.append('petDescription', petDescription);
    formData.append('category', category);
    formData.append('petVisible', petVisible);
    formData.append('birthday', birthday);

    try {
        const response = await axios.post('/api/pet', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('access_token'),
            },
            onUploadProgress:callback,

        });

        return response.data; // 返回响应数据
    } catch (error) {
        console.error('上传失败', error);
        throw error; // 处理上传失败的情况
    }
};

export const getPets = async ()=>await request("/api/pets/my",{
    method:'GET'
})

export const deletePetById = async (petId)=>await request(`/api/pet/${petId}`,{
    method:"DELETE"
})

export const updatePetById = async (pet)=>await request('/api/pet',{
    method:"PUT",
    data:pet
})



export const deleteImageOfPet = async (imageId)=>await request(`/api/pet/image/${imageId}`,{
    method:"DELETE",
})


export const addImageOfPet = async (petId,image,callback) => {


    const formData = new FormData();
    formData.append('image', image);

    try {
        const response = await axios.post(`/api/pet/image/${petId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('access_token'),
            },
            onUploadProgress:callback,

        });

        return response.data; // 返回响应数据
    } catch (error) {
        console.error('上传失败', error);
        throw error; // 处理上传失败的情况
    }
};

export const getPetById = (id) =>
    request(`/api/pet/${id}`, {
        method: 'GET',
    });
