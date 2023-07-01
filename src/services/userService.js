import { request } from 'umi';

export const userLogin = async (body) => {
  return await request('/api/login', {
    method: 'POST',
    data: body,
  });
};
export const getProfile = async () =>
  await request('/api/profile', {
    method: 'GET',
  });
export const getProfileById =  async (id) =>
  await request(`/api/profile/${id}`, {
    method: 'GET',
  });

export const currentUser = async () =>
  await request('/api/currentUser', {
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