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


    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(user => {
           console.log(user)
            //console.log(user.accessToken)
            if(user){
               localStorage.setItem('auth',user.accessToken)
            }else {

            }
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} uiCallback={ui => ui.disableAutoSignIn()} />
    );
}

export default FirebaseUi;