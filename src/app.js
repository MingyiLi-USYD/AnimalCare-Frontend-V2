
import {history} from 'umi'
import {currentUser} from "./services/userService";
import {auth} from "./firebaseConfig";

const loginPath = '/login';

export const request = {
  timeout: 60000,
  errorConfig: {
    errorHandler(res) {
      // console.log(res)
    },
    errorThrower(res) {
      //console.log(res)
    },
  },
  requestInterceptors: [
    (url, options) => {
      const token = localStorage.getItem('token');
      const isLoginRequest = url.includes('/api/login');
      if (token && !isLoginRequest) {
        options.headers = {
          ...options.headers,
          auth: token,
        };
      }
      return {
        url,
        options,
      };
    },
  ],
  responseInterceptors: [
    (response, options) => {
      return response;
    },
  ],
};
export async function getInitialState() {
/*  const firebaseUser = new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // 注销监听器，确保只执行一次
      if (user) {
        // 用户已经登录
        console.log("当前用户不为空");
        resolve(user);
      } else {
        // 用户已经退出登录
        console.log("当前用户为空");
        reject("当前用户为空");
      }
    });
  });*/

/*
  try {
        const res = await firebaseUser

  }catch (e){
    console.log(e)
    history.push(loginPath);
  }*/
  const fetchUserInfo = async () => {

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
            console.log("当前用户为空");
            reject("当前用户为空");
          }
        });
      });
      const msg = await currentUser();
      return msg.data;
    } catch (error) {
      console.log(error)
      history.push(loginPath);
    }
    return undefined;
  }
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
    };
  }
  return {
    fetchUserInfo,
  };
}

