import { request } from 'umi';

export const sendCode = async (username) => {
    return await request(`/api/oauth/code/${username}`, {
        method: 'GET',
    });
};



export const userPasswordLogin = async (body) => {
  return await request('/api/oauth/login/password', {
    method: 'POST',
    params:{
        ...body,
    }
  });
};

export const userCodeLogin = async (body) => {
    return await request('/api/oauth/login/code', {
        method: 'POST',
        params:{
            ...body,
        }
    });
};


export const googleLogin = async (googleToken) => {
    return await request('/api/oauth/login/thirdPart', {
        method: 'POST',
        params:{
            googleToken
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