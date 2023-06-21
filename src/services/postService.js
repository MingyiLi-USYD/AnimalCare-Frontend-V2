import { request } from 'umi';
export const getPosts = async (url) =>
  await request(url, {
    method: 'GET',
  }).catch((error) => console.log(error));
export const love = async (postId) =>
  await request(`/api/love/${postId}`, {
    method: 'GET',
  });

export const cancelLove = async (postId) =>
  await request(`/api/love/${postId}`, {
    method: 'DELETE',
  });

export const newPost = async (params,onUploadProgress) => {
  const { postTopic, postContent, postTag, images,visible} = params;
  let formData = new FormData();

  if (images) {
    images.map((element) => formData.append('images', element.originFileObj));
  }
  return  request('/api/post', {
    method: 'POST',
    data: formData,
    params: {
      postTopic,
      postContent,
      postTag,
      visible
    },
    onUploadProgress,
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
