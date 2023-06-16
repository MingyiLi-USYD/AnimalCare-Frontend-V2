import {request} from "umi";

export const getPets = async ()=>await request("/api/getPetList",{
    method:'GET'
})

export const deletePetById = async (petId)=>await request(`/api/pet/${petId}`,{
    method:"DELETE"
})

export const updatePetById = async (petId,pet)=>await request(`/api/pet/${petId}`,{
    method:"PUT",
    data:pet
})

export const newPet = (params) => {
    const { petName, petDescription, category, avatar } = params;
    console.log(params);
    let fileData = new FormData();
    if (avatar) {
        avatar.map((element) => fileData.append('avatar', element.originFileObj));
    }
    return request('/api/pet', {
        method: 'POST',
/*        headers: {
            'Content-Type': 'multipart/form-data',
        },
        requestType: 'form',*/
        data: fileData,
        params: {
            petName,
            petDescription,
            category,
        },
    });
};

export const deleteImageOfPet = async (image)=>await request("/api/pet/image",{
    method:"DELETE",
    data:image
})
