import React, {useEffect, useState} from 'react';
import {Avatar, Button, Input, Select, Space, Table, Tag} from 'antd';
import {getUsers} from "@/services/userService";
import './admin.less'
const {Search} = Input;

const PAGE_SIZE = 5; // 每页显示的数量
const options = [
    {
        value: 'User',
        label: 'User',
    },
    {
        value: 'Admin',
        label: 'Admin',
    },
    {
        value: 'SuperAdmin',
        label: 'SuperAdmin',
    },
]
const App = () => {
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => <Avatar src={avatar}/>
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Tag
                color={status === 1 ? 'green' : 'red'}>{status === 1 ? 'Enabled' : 'Disabled'}</Tag>
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" className={"operation"}>
                    {
                        record.status === 1 ?
                            <Button danger onClick={item => handleDisable(record.userId)}>Disable</Button>
                            : <Button type={"primary"}
                                      onClick={item => handleEnable(record.userId)}>Enable</Button>
                    }
                    {
                        <Select
                            defaultValue={record.role}
                            style={{
                                width: 120,
                            }}
                            allowClear={true}
                            options={options}
                        />
                    }
                </Space>
            ),
        },

    ];

    const handleDisable = (id) => {

        const newRecords = [...records]
        setRecords(newRecords.map(record => {
                    if (record.userId === id) {
                        record.status = 0
                    }
                    return record
                }
            )
        )
    }
    const handleEnable = (id) => {
        const newRecords = [...records]
        setRecords(newRecords.map(record => {
                    if (record.userId === id) {
                        record.status = 1
                    }
                    return record
                }
            )
        )

    }
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [records, setRecords] = useState([])
    const fetchData = async () => {
        const {data: {records, total, current, pages}, code} = await getUsers(currentPage, PAGE_SIZE, searchText);
        if (code === 1) {
            setRecords(records);
            setCurrentPage(current)
            setTotal(total)
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, searchText]);

    const handleSearch = (value) => {
        setSearchText(value);
    };

    return (
        <div>
            <Search
                placeholder="Search username"
                allowClear
                enterButton="Search"
                size="middle"
                onSearch={handleSearch}
                style={{marginBottom: 16}}
            />
            <Table columns={columns} dataSource={records} rowKey={item => item.userId}
                   pagination={{
                       pageSize: PAGE_SIZE,
                       current: currentPage,
                       total,
                       onChange: (page) => setCurrentPage(page)
                   }}
                   size={"large"}
            />
        </div>
    );
};

export default App;