import { request } from 'umi';
export const getPosts = async (page,pageSize,selector) =>
    await request(`/api/post?currPage=${page}&pageSize=${pageSize}&order=${selector}`, {
      method: 'GET',
    }).catch((error) => console.log(error));


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
  const { postTopic, postContent, postTag, images,visible} = params;
  return  request('/api/post', {
    method: 'POST',
    data:params
  });
};

export const getPostById = (postId)=>{
  return request(`/api/post/${postId}`,{
    method:'GET',
  })
}

export const getMyPosts = async ()=>request("/api/posts",{
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
