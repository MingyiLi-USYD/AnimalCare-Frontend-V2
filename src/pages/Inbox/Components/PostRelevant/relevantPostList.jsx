import React from 'react';
import {List} from "antd";

function RelevantPostList(props) {
    const data= [{},{},{},{}]

    return (
        <div
            id="scrollableDivRecent"
            style={{borderRight: '3px solid black', height: '100%'}}
        >
            <List

                dataSource={[...data,...data,...data]}
                renderItem={(item, index) => (
                    <List.Item key={index}>
                        <div>11111</div>
                    </List.Item>
                )}
            />
        </div>
    );
    
}

export default RelevantPostList;