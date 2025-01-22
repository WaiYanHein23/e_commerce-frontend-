// import axios from "axios";

// export const api=axios.create({
//     baseURL:"http://127.0.0.1:8000/api"});

//     api.interceptors.request.use(
//         async (config) => {
//             config.headers = {
//                 Accept: "application/json",
//                 "Accept-Control_Allow-Origin": "*",
//                 "Content-Type": "application/json",
//             }

//             return config;
            
//         },

//         (response)=>{
//             return response;
//         },
//         (error)=>{
//             return Promise.reject(error);
//         }
//     )