import {Card, Col, Row} from 'antd';
import {history, useModel} from "umi";
import {userLogin} from "@/services/userService";
import {flushSync} from "react-dom";
import FirebaseUI from "./firebaseUI";
import {useEffect} from "react";


const Login = () => {

  const { setInitialState, initialState } = useModel('@@initialState');
/*  useEffect(()=>{
    console.log(initialState.currentUser)
    if(initialState.currentUser){
      history.push('/home');
    }
  },[])*/

  const onFinish = async (values) => {
    const res = await userLogin(values);
    if (res.code === 1) {
      localStorage.setItem('serverToken', res.data.serverToken);
      await fetchUserInfo();
      history.push('/home');
    } else {
      console.log('登录失败');
    }
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
 return(
   <Row align="middle" style={{ height: '100vh', background: '#f6f6f6' }}>
     <Col span={8} offset={8}>
       <Card>
{/*         <Form
           name="normal_login"
           className="login-form"
           initialValues={{
             remember: true,
           }}
           onFinish={onFinish}
         >
           <Form.Item
             name="userName"
             rules={[
               {
                 required: true,
                 message: 'Please input your Username!',
               },
             ]}
           >
             <Input
               prefix={<UserOutlined className="site-form-item-icon" />}
               placeholder="Username"
             />
           </Form.Item>
           <Form.Item
             name="password"
             rules={[
               {
                 required: true,
                 message: 'Please input your Password!',
               },
             ]}
           >
             <Input
               prefix={<LockOutlined className="site-form-item-icon" />}
               type="password"
               placeholder="Password"
             />
           </Form.Item>

           <Form.Item>
             <Button
               type="primary"
               htmlType="submit"
               className="login-form-button"
             >
               Log in
             </Button>
             Or <a onClick={()=>history.push('/signup')}>register now!</a>
           </Form.Item>
         </Form>
         <EmailSignUp/>*/}
         <FirebaseUI initialState={initialState} setInitialState={setInitialState}/>
       </Card>
     </Col>
   </Row>
 )
};
export default Login;
