import { message } from 'antd';
import axios from 'axios'
import QS from 'qs'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// 请求拦截器
axios.interceptors.request.use(    
    config => {    
        let token = localStorage.getItem("token")
        if(token){
            config.headers.Authorization = token
        }
        // console.log(config);    
        return config;    
    },    
    error => {        
        return Promise.error(error);    
})

// 响应拦截器
axios.interceptors.response.use(    
    response => {  
        // console.log(response);
        if(response.data.status == 400){
            location.href ='#/login'
            localStorage.removeItem('token')
            message.error('非法访问!')
        }
        // console.log(response); 
        if (response.status == 200) {   
            // message.success(response.data.msg)       
            return Promise.resolve(response);        
        } else {    
            message.error(response.data.msg)        
            return Promise.reject(response);        
        }    
    }
)

export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
    })    
});}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}