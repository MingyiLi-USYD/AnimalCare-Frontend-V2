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
    const { petName, petDescription, category,petVisible,image } = params;
    return request('/api/pet', {
        method: 'POST',
        params: {
            petName,
            petDescription,
            category,
            petVisible,
            image
        },
    });
};

export const deleteImageOfPet = async (image)=>await request("/api/pet/image",{
    method:"DELETE",
    data:image
})
