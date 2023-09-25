import {Card} from 'antd';
import './index.less'
import LoginCard from "@/pages/Login/login";


const Login = () => {


    return (
        <div className={'login-page'}>

            <Card className={'login-table'}>
                <LoginCard/>
            </Card>
        </div>
    )
};
export default Login;
