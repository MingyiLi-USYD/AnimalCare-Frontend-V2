import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import {getFriendshipStatus} from "@/services/friendService";
import {useDispatch, useModel, useSelector} from "umi";
import RelationDetail from "./relationDetail";


function Relation(user) {
    const {userId} = user
    const {initialState: {currentUser}} = useModel('@@initialState')
    const {subscribeList} = useSelector(state => state.userModel)
    const dispatch = useDispatch()
    const myId = currentUser.userId
    const [relation, setRelation] = useState(0)
    const handleAdd = () => {
        dispatch({
            type: 'RelationModel/openModal',
        });
    }
    const handleDelete = () => {
        dispatch({
            type: 'RelationModel/openModal',
        });
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


    return (
        <div  className={'operation'} >
            <div>
                {
                    relationList[relation]
                }
            </div>
            <div>

                {

                    userId!==myId&&(subscribeList.includes(userId)?<Button danger>
                            Unsubscribe
                        </Button>:
                        <Button type={"primary"}>Subscribe</Button>)

                }
            </div>
            <RelationDetail {...user} relation={relation} setRelation={setRelation}/>
        </div>

    );
}

export default Relation;