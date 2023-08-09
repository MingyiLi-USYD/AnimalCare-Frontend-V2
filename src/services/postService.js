import { request } from 'umi';
export const getPosts = async (current,pageSize,order,keywords) =>
    await request('/api/posts', {
      method: 'GET',
        params:{
           current,
            pageSize,
            order,
            keywords,
        }
    })

export const getLoves = async () =>
    await request('/api/loves', {
        method: 'GET',
    });
export const love = async (postId) =>
    await request(`/api/love/${postId}`, {
      method: 'GET',
    });

export const cancelLove = async (postId) =>
    await request(`/api/love/${postId}`, {
      method: 'DELETE',
    });

export const newPost = async (params) => {
  return  request('/api/post', {
    method: 'POST',
    data:params,
  });
};

export const getPostById = (postId)=>{
  return request(`/api/post/${postId}`,{
    method:'GET',
  })
}

export const getMyPosts = async ()=>request("/api/my/posts",{
  method:'GET',
})

export const deletePostById = async (postId)=>request(`/api/post/${postId}`,{
  method:'DELETE',
})
export const setVisibility = async (postId,visibility)=>request(`/api/post/${postId}`,{
  method:'PUT',
  params:{
    visibility
  }
})

export const getAllLovesToMyPost = async (current,pageSize)=>request('/api/lovePosts',{
    method:'GET',
    params:{
        current,
        pageSize,
    }
})