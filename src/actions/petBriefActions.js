const openPetBriefModal = (petId)=>{
    return {
        type: 'petBriefModel/openModal',
        payload:petId,
    }
}

const closePetBriefModal = ()=>{
    return {
        type: 'petBriefModel/closeModal',
    }
}

export {openPetBriefModal,closePetBriefModal}
