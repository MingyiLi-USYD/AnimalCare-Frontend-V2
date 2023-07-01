import React from 'react';
import {auth} from "../../firebaseConfig";
import {EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider} from 'firebase/auth'
import {StyledFirebaseAuth} from "react-firebaseui";
import {history, useModel} from "umi";
import {thirdPartLogin} from "../../services/userService";
import {flushSync} from "react-dom";


function FirebaseUi({}) {
    const { setInitialState, initialState } = useModel('@@initialState');
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
            EmailAuthProvider.PROVIDER_ID,
            GoogleAuthProvider.PROVIDER_ID,
            FacebookAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: (data) => {
                console.log("登陆成功")
                const {photoURL,uid,email,displayName} = data.user;
                const user = {
                  uuid:uid,
                    userName:uid,
                    nickname:displayName,
                    avatar:photoURL,
                    email,
                }
                onFinish(user)
            },
        },
    };

    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} uiCallback={ui => ui.disableAutoSignIn()} />
    );
}

export default FirebaseUi;