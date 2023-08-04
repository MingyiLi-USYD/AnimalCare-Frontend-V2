import React, {useEffect, useState} from 'react';
import {Avatar, Button, Input, message, Popconfirm, Select, Space, Table, Tag} from 'antd';
import {changeUserStatus, getUsers} from "@/services/userService";
import { cloneDeep } from 'lodash';
import './admin.less'
import {history, useAccess} from "umi";
const {Search} = Input;

const PAGE_SIZE = 10; // 每页显示的数量

const App = () => {

    const [searchText, setSearchText] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [records, setRecords] = useState([])
    const [originalRecord,setOriginalRecord]=useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const {hasPermission,thanUser,thanAdmin,thanSuperAdmin}=useAccess()

    const info = () => {
        messageApi.info('Update Success');
    };

    const options = [
        {
            value: 'User',
            label: 'User',
            disabled:!thanUser,
        },
        {
            value: 'Admin',
            label: 'Admin',
            disabled:!thanAdmin,
        },
        {
            value: 'SuperAdmin',
            label: 'SuperAdmin',
            disabled:!thanSuperAdmin,
        },
    ]
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
            render: (text,item) => <a onClick={()=>{history.push(`/profile/${item.userId}`)}}>{text}</a>,
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
                            <Button danger onClick={item => handleDisable(record.userId)} disabled={!hasPermission(record.role)}>Disable</Button>
                            : <Button type={"primary"}
                                      onClick={item => handleEnable(record.userId)} disabled={!hasPermission(record.role)}>Enable</Button>
                    }
                    {

                            <Select
                                value={record.role}
                                style={{
                                    width: 120,
                                }}
                                allowClear={false}
                                options={options}
                                onChange={(value)=> handleSelectRole(value,record.userId)}
                                disabled={!hasPermission(record.role)}
                            />
                    }
                </Space>
            ),
        },
        {
            title: 'ConfirmChange',
            dataIndex: 'confirm',
            key: 'confirm',
            render: (_, record)=><Space size="middle" className={"operation"}>{
                hasChange(record,originalRecord)&& <Button type={"primary"} onClick={()=>handleSave(record)}>Confirm</Button>
            }
            </Space>
        },

    ];
    const hasChange = (target,originalList)=>{
         const find = originalList.find(item=>item.userId===target.userId);
         return find?find.status!==target.status||find.role!==target.role:false
    }
    const handleSave =async (user)=>{
        const {userId,role,status} = user
      const {code}= await changeUserStatus(userId,role,status)
        if(code===1){
         const newOriginalRecord   = [...originalRecord]
           setOriginalRecord(newOriginalRecord.map(item=>item.userId===userId?user:item))
            info()
        }

    }
   const  handleSelectRole = (value,id)=>{
       const newRecords = [...records]
       setRecords(newRecords.map(record => {
                   if (record.userId === id) {
                       record.role = value
                       record.isChanged = true;
                   }
                   return record
               }
           )
       )
    }

    const handleDisable = (id) => {

        const newRecords = [...records]
        setRecords(newRecords.map(record => {
                    if (record.userId === id) {
                        record.status = 0
                        record.isChanged = true;
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
                        record.isChanged = true;
                    }
                    return record
                }
            )
        )

    }

    const fetchData = async () => {
        const {data: {records, total, current, pages}, code} = await getUsers(currentPage, PAGE_SIZE, searchText);
        if (code === 1) {
            setRecords(records);
            setCurrentPage(current)
            setTotal(total)
            setOriginalRecord(cloneDeep(records))
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
            {contextHolder}
            <Search
                placeholder="Search username"
                allowClear
                enterButton="Search"
                size="middle"
                onSearch={handleSearch}
                style={{marginBottom: 16}}
            />
            <Table  columns={columns} dataSource={records} rowKey={item => item.userId}
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