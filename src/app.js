
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
  console.log(auth)
  console.log(auth.currentUser)
  const fetchUserInfo = async () => {

    try {

      const msg = await currentUser();

      return msg.data;
    } catch (error) {
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

