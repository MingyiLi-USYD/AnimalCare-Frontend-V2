// import React from 'react';
// import { GoogleAuthProvider,createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth";
// import {auth} from "../../firebaseConfig";
// import {Button} from "antd";
// import FirebaseUI from "./firebaseUI";
// const provider = new GoogleAuthProvider();
// function ThirdPartLogin() {
//     auth.languageCode = 'it';
//     provider.setCustomParameters({
//         'login_hint': 'user@example.com'
//     });
//
//
//     function handleGoogle() {
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 console.log(result)
//                 // This gives you a Google Access Token. You can use it to access the Google API.
//                 const credential = GoogleAuthProvider.credentialFromResult(result);
//                 const token = credential.accessToken;
//                 // The signed-in user info.
//                 const user = result.user;
//                 // IdP data available using getAdditionalUserInfo(result)
//                 // ...
//             }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.customData.email;
//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error);
//             // ...
//         });
//     }
//
//     function handleEmail() {
//         createUserWithEmailAndPassword(auth, '741917777@qq.com', '123456')
//             .then((userCredential) => {
//                 // Signed in
//                 console.log(userCredential)
//                 const user = userCredential.user;
//                 // ...
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // ..
//             });
//     }
//
//
//     function handleLogout() {
//         console.log('登出')
//         auth.signOut()
//     }
//     if(true){
//         return <FirebaseUI/>
//     }
//
//     return (
//         <div >
//              <Button onClick={handleGoogle}>Google</Button>
//             <Button onClick={handleEmail}>Email</Button>
//             <Button onClick={handleLogout}>Logout</Button>
//             <Button onClick={()=>{console.log(auth)}}>查看</Button>
//         </div>
//     );
// }
//
// export default ThirdPartLogin;