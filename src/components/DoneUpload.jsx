import { Button, Result } from 'antd';
import {history} from "umi";

const DoneUpload = ({path}) => (

    <Result
        status="success"
        title="Successfully Upload To Server!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
            <Button type="primary" key="console" onClick={()=>history.push(`${path}`)}>
                Go Console
            </Button>,
            <Button key="buy">Go Main</Button>,
        ]}
    />
);
export default DoneUpload;