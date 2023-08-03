import React from 'react';
import {Select, Space} from "antd";
import {useDispatch, useSelector} from "umi";

function MySelector() {
    const {selector} = useSelector(state => state.homeModel)
    const dispatch = useDispatch();
    const handleChange = (value) => {
        dispatch({
            type: 'homeModel/changeSelector',
            payload: value
        })
    };
    return (
        <Space wrap>
        <Select
            value={selector}
            style={{
                width: 150,
            }}
            onChange={handleChange}
            allowClear={true}
            options={[
                {
                    value: 0,
                    label: 'All',
                },
                {
                    value: 1,
                    label: 'Latest',
                },
                {
                    value: 2,
                    label: 'Hottest',
                }
            ]}
        />
         </Space>
    );
}

export default MySelector;