import {Button, Card} from 'antd';
import {useModel} from "umi";
import {userLogin} from "@/services/userService";
import {flushSync} from "react-dom";
import './index.less'
import LoginCard from "@/pages/Login/login";
import GoogleLogin, {useGoogleLogin} from "react-google-login";
import {useEffect} from "react";


const Login = () => {

    const {setInitialState, initialState} = useModel('@@initialState');


    const onFinish = async (values) => {
        const res = await userLogin(values);
        console.log(res)

    };
    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            flushSync(() => {
                setInitialState((s) => ({
                    ...s,
                    currentUser: userInfo,
                }));
            });
        }
    };

    const param = {
        client_id: '1067998688265-29puvp1t8tlrraiufdl4aerh84vqu934.apps.googleusercontent.com',
        redirect_uri: 'http://localhost:5000/login',
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
        response_type: 'code'
    }

/*    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                client_id: '1067998688265-29puvp1t8tlrraiufdl4aerh84vqu934.apps.googleusercontent.com',
                redirect_uri: 'http://localhost:5000/login',
                scope: 'https://www.googleapis.com/auth/userinfo.profile',
                response_type: 'code'
            });
        };
        gapi.load('client:auth2', initClient);
    });*/

   const onSuccess = (v)=>{
       console.log(v)
   }
   const onFailure = (e) => {
       console.log(e)
   }

   useGoogleLogin({
       clientId: '1067998688265-29puvp1t8tlrraiufdl4aerh84vqu934.apps.googleusercontent.com',
       redirectUri: 'http://localhost:5000/login',
       scope: 'https://www.googleapis.com/auth/userinfo.profile',
       responseType: 'code'
   })

     const handleCallback = (res) => {
       console.log(res)
     }
    useEffect(()=>{

        google.accounts.id.initialize({
            client_id: '1067998688265-29puvp1t8tlrraiufdl4aerh84vqu934.apps.googleusercontent.com',
            redirect_uri:'http://localhost:5000/login',
            scope:'https://www.googleapis.com/auth/userinfo.profile',
            response_type:'code',
            login_uri:'http://localhost:5000',
            callback:handleCallback
        })
        google.accounts.id.prompt();
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme:"outline",size:"large"
            }
        )

    },[])


    return (
        <div className={'login-page'}>

            <Card className={'login-table'}>

                <LoginCard/>
            </Card>
        </div>
    )
};
export default Login;
