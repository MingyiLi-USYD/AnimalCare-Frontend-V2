import React, {useEffect} from 'react';
import {auth} from "../../firebaseConfig";
import {EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider} from 'firebase/auth'
import {StyledFirebaseAuth} from "react-firebaseui";
import {history} from "umi";
import {thirdPartLogin} from "../../services/userService";
import {flushSync} from "react-dom";



function FirebaseUi({initialState,setInitialState}) {

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
    };

       const login = async (data)=>{
         const  res = await thirdPartLogin(data)
           if (res.code === 1) {
               localStorage.setItem('token', res.data.serverToken);
               localStorage.setItem('firebaseToken', res.data.firebaseToken);
               await fetchUserInfo();
               console.log(1111)
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



    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} uiCallback={ui => ui.disableAutoSignIn()} />
    );
}

export default FirebaseUi;