import { request } from 'umi';


export const googleLogin = async () => {
    return await request('https://accounts.google.com/o/oauth2/v2/auth', {
        method: 'GET',
        params:{
            client_id:'1067998688265-29puvp1t8tlrraiufdl4aerh84vqu934.apps.googleusercontent.com',
            redirect_uri:'http://localhost:5000/login',
            scope:'https://www.googleapis.com/auth/userinfo.profile',
            response_type:'code'
        }
    });
};

export const userLogin = async (body) => {
  return await request('/api/oauth/token', {
    method: 'POST',
    params:{
        ...body,
        client_id:'cId',
        client_secret:'secret',
        grant_type:'password'
    }
  });
};
export  const initUserInfo = async () =>
    await request('/api/user/init', {
        method: 'GET',
    });

export const getProfileById =  async (id) =>
  await request(`/api/user/profile/${id}`, {
    method: 'GET',
  });

export const currentUser = async () =>
  await request('/api/user/currentUser', {
    method: 'GET',
  });

export const getLovedPosts = async () =>
  await request('/api/loves', {
    method: 'GET',
  });

export const updateUserProfile = async (user) =>
  await request('/api/profile', {
    method: 'PUT',
    data:user
  });
export const thirdPartLogin = async (user) =>
    await request('/api/login/thirdPart', {
        method: 'POST',
        data:user
    });
export const getFirebaseIdToken = async () =>
    await request('/api/token', {
        method: 'GET',
    });

export const getUsers = async (current,size,keywords) =>
    await request('/api/users', {
        method: 'GET',
        params:{
            current,
            size,
            keywords
        }
    });


export const changeUserStatus = async (userId,role,status) =>
    await request(`/api/changeUser/${userId}`, {
        method: 'GET',
        params:{
            role,
            status,
        }
    });

export const subscribeUser = async (userId) =>
    await request(`/api/subscribe/${userId}`, {
        method: 'Post',
    });
export const unsubscribeUser = async (userId) =>
    await request(`/api/subscribe/${userId}`, {
        method: 'Delete',
    });