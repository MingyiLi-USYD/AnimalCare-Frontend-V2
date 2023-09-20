import {request} from "umi";


export const getPets = async ()=>await request("/api/pets/my",{
    method:'GET'
})

export const deletePetById = async (petId)=>await request(`/api/pet/${petId}`,{
    method:"DELETE"
})

export const updatePetById = async (petId,pet)=>await request(`/api/pet/${petId}`,{
    method:"PUT",
    data:pet
})

export const newPet = (data) => {
    return request('/api/pet', {
        method: 'POST',
        data
    });
};

export const deleteImageOfPet = async (image)=>await request("/api/pet/image",{
    method:"DELETE",
    data:image
})
export const addImageOfPet = async (petId,data)=>await request(`/api/pet/image/${petId}`,{
    method:"POST",
    data
})

export const getPetById = (id) =>
    request(`/api/pet/${id}`, {
        method: 'GET',
    });
