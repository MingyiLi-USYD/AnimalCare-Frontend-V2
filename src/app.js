import {history} from 'umi'
import {currentUser} from "./services/userService";
import responseInterceptor from "../config/responseInterceptor";
const loginPath = '/login';
import { persistEnhancer } from 'dva-model-persist';
//  使用 localStorage
import storage from 'dva-model-persist/lib/storage';
export const dva = {
  config: {
    extraEnhancers: [
      persistEnhancer(
          {
            storage,
          }
      )
    ],
  },
};

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
      const token = localStorage.getItem('access_token');
      const isLoginRequest = url.startsWith('/api/oauth');
      if (token && !isLoginRequest) {
        options.headers = {
          ...options.headers,
          Authorization: token,
        };
      }
      return {
        url,
        options,
      };
    },
  ],
  responseInterceptors: [responseInterceptor],
};
export async function getInitialState() {
  const fetchUserInfo = async () => {

    try {
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

