import React, {useEffect, useState} from 'react';
import {auth} from "../../firebaseConfig";
import {GoogleAuthProvider,FacebookAuthProvider,EmailAuthProvider} from 'firebase/auth'
import {StyledFirebaseAuth} from "react-firebaseui";
import {history} from "umi";
import signUp from "../SignUp/SignUp";
import {currentUser, thirdPartLogin} from "../../services/userService";
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
        signInSuccessWithAuthResult: () => false,
    },
};

function FirebaseUi({initialState,setInitialState}) {
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
    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(user => {
            console.log('firebase user is',user)
            if(user==null){
                history.push('/login')
            }else {
           const{uid,email,displayName,photoURL} = user;
           const data = {
               userName:uid,
               nickname:displayName,
               avatar:photoURL,
               uuid:uid,
               email,
           }
                login(data)

            }

        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    );
}

export default FirebaseUi;