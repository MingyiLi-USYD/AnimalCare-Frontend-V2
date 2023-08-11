import React from 'react';
import {auth} from "@/firebaseConfig";
import {GoogleAuthProvider} from 'firebase/auth'
import {StyledFirebaseAuth} from "react-firebaseui";
import {history, useModel} from "umi";
import {thirdPartLogin} from "@/services/userService";
import {flushSync} from "react-dom";


function FirebaseUi({}) {
    const {setInitialState, initialState} = useModel('@@initialState');
    const onFinish = async (values) => {
        const res = await thirdPartLogin(values);
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
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/signedIn',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: (data) => {
                const {photoURL, uid, email, displayName} = data.user;
                const user = {
                    uuid: uid,
                    username: email,
                    nickname: displayName,
                    avatar: photoURL,
                }
                onFinish(user)
            },
        },
    };

    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} uiCallback={ui => ui.disableAutoSignIn()}/>
    );
}

export default FirebaseUi;