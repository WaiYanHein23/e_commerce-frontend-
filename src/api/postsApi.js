//  import { api } from "./apiClient";

export const getAllPosts =async  (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
  
};

export const registerUser=async(url,data)=>{
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to register user');
  }

  return response.json();
  
}
