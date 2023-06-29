import React, {useEffect} from 'react';
import {auth} from "../../firebaseConfig";
import {EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider} from 'firebase/auth'
import {StyledFirebaseAuth} from "react-firebaseui";
import {history} from "umi";
import {thirdPartLogin} from "../../services/userService";
import {flushSync} from "react-dom";

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
       GoogleAuthProvider.PROVIDER_ID,
        FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => {

        },
    },
};

function FirebaseUi({initialState,setInitialState}) {

/*    const init = async ()=>{
        try {
            await new Promise((resolve, reject) => {
                const unsubscribe = auth.onAuthStateChanged((user) => {
                    unsubscribe(); // 注销监听器，确保只执行一次
                    if (user) {
                        // 用户已经登录
                        console.log("当前用户不为空");
                        resolve(user);
                    } else {
                        // 用户已经退出登录
                        reject("User is null");
                    }
                });
            });
        }catch (e){
            console.log(e)
        }
    }*/

       const login = async (data)=>{
         const  res = await thirdPartLogin(data)
           if (res.code === 1) {
               localStorage.setItem('token', res.data.serverToken);
               localStorage.setItem('firebaseToken', res.data.firebaseToken);
               await fetchUserInfo();
               history.push('/home');
           } else {
               console.log('登录失败');
           }
       }
    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        console.log(userInfo)
        if (userInfo) {
            flushSync(() => {
                setInitialState((s) => ({
                    ...s,
                    currentUser: userInfo,
                }));
            });
        }
    };
/*    useEffect(()=>{
           if(auth.currentUser){
               console.log("已经登录了")
               return
           }
           init()
       },[])*/


    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} uiCallback={ui => ui.disableAutoSignIn()} />
    );
}

export default FirebaseUi;