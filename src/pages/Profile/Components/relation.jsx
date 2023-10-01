import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import {getFriendshipStatus} from "@/services/friendService";
import {useDispatch, useModel, useSelector} from "umi";
import RelationDetail from "./relationDetail";
import {openDeleteModal} from "@/actions/relationActions";
import {subscribeUser} from "@/services/userService";
import {subscribeUserAction, unsubscribeUserAction} from "@/actions/postDetailActions";


function Relation(user) {
    const {userId} = user
    const {initialState: {currentUser}} = useModel('@@initialState')
    const {subscribeList} = useSelector(state => state.userModel)
    const dispatch = useDispatch()
    const myId = currentUser.userId
    const [relation, setRelation] = useState(0)
    const handleAdd = () => {
        dispatch(openDeleteModal());
    }
    const handleDelete = () => {
        dispatch(openDeleteModal());
    }

    const relationList = [null, <Button key={1} danger onClick={handleDelete}>Delete</Button>
        , <Button key={2} type={"primary"} disabled={true}>Pending</Button>
        , <Button key={3} type={"primary"} onClick={handleAdd}>Add</Button>]

    useEffect(() => {
                if (userId !== myId) {
                    handleCheckRelation(userId)
                } else {
                    setRelation(0)
                }
    }, [userId])
    const handleCheckRelation = async (toId) => {
        const res = await getFriendshipStatus(toId)
        setRelation(res.data)
    }

    const handleSubscribe = () => {
        dispatch(subscribeUserAction(userId))
    }
    const handleUnsubscribe = () => {
        dispatch(unsubscribeUserAction(userId))
    }


    return (
        <div  className={'operation'} >
            <div>
                {
                    relationList[relation]
                }
            </div>
            <div>
                {

                    userId!==myId&&(subscribeList.includes(userId)?<Button danger onClick={handleUnsubscribe}>
                            Unsubscribe
                        </Button>:
                        <Button type={"primary"} onClick={handleSubscribe}>Subscribe</Button>)

                }
            </div>
            <RelationDetail {...user} relation={relation} setRelation={setRelation}/>
        </div>

    );
}

export default Relation;