import React from 'react';
import {Select, Space} from "antd";

function MySelector({selector,setSelector,setter}) {
    const handleChange = (value) => {
        const {setPostList,setPage,setTotal} = setter;
        setPostList([])
        setPage(0)
        setTotal(0)
        setSelector(value)

    };
    return (
        <Space wrap>
        <Select
            value={selector}
            style={{
                width: 150,
            }}
            onChange={handleChange}
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
{/*            <Select
                defaultValue="lucy"
                style={{
                    width: 150,
                }}
                onChange={handleChange}
                options={[
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },
                    {
                        value: 'Yiminghe',
                        label: 'yiminghe',
                    },
                    {
                        value: 'disabled',
                        label: 'Disabled',
                        disabled: true,
                    },
                ]}
            />*/}

         </Space>
    );
}

export default MySelector;