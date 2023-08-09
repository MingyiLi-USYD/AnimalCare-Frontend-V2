const openDeleteModal = ()=>{
    return {
        type: 'relationModel/openModal',
    }
}

const closeDeleteModal = ()=>{
    return {
        type: 'relationModel/closeModal',
    }
}

export {openDeleteModal,closeDeleteModal}
