import axios from 'axios';
import { getSessionToken, removeSessionToken } from './utils';

const requireAxiosBack = axios.create({
    baseURL:'/back'
});

requireAxiosBack.interceptors.request.use((config)=>{
    let token = getSessionToken();
    if(token&&token.length>0){
        config.headers['token'] = token;
    }
    return config;
}, (err)=>{})

requireAxiosBack.interceptors.response.use((data)=>(data
), (err)=>{
    console.log(err);
    if(err.response.status === 503){
        removeSessionToken();
    }   
    return new Promise(()=>{});
})

export const requireUserInfo = ()=>{
    return requireAxiosBack('/user', {
        method:'GET'
    })
}

export const requireLogin = (data)=>{
    return requireAxiosBack('/login', {
        method:'POST',
        data
    })
}

export const requireUpdateData = (data)=>{
    return requireAxiosBack('/user', {
        method:'POST',
        data
    })
}

export const requireBrandPages = ()=>{
    return requireAxiosBack('/brands/pages', {
        method:'GET',
    })
}

export const requireBrands = (data)=>{
    return requireAxiosBack('/brands', {
        method:'get',
        data
    })
}

export const requireDeleteBrand = (data)=>{
    return requireAxiosBack(`/brands/${data.brandId}`, {
        method:'DELETE',
    })
}

export const requireUpdateBrand = (data)=>{
    return requireAxiosBack('/brands', {
        method:'post',
        data
    })
}

export const requirePays = (data)=>{
    return requireAxiosBack('/pays', {
        method:'GET',
        data
    })
}

export const requirePayPages = ()=>{
    return requireAxiosBack('/pays/pages', {
        method:'GET'
    })
}

export const requireDeletePay = (data)=>{
    return requireAxiosBack(`/pays/${data.targetId}`, {
        method:'DELETE',
    })
}

export const requireOverview = (path)=>{
    return requireAxiosBack(path, {
        method:'get'
    })
}

export const requireGetUserPages = ()=>{
    return requireAxiosBack('/control/users/pages', {
        method:'get'
    })
}

export const requireGetUsers = (data)=>{
    return requireAxiosBack('/control/users', {
        method:'get',
        data
    })
}

export const requireDeleteUsers = (data)=>{
    return requireAxiosBack('/control/users', {
        method:'delete',
        data
    })
}

export const requireAppendUser = (data)=>{
    return requireAxiosBack('/control/users', {
        method: 'post',
        data
    })
}

export const requireGetRoots = (data)=>{
    return requireAxiosBack(`/control/roots/${data.userId}`, {
        method:'get'
    })
}

export const requireGetBaseRoots = ()=>{
    return requireAxiosBack('/control/roots/base', {
        method:'get',
    })
}

export const requireUpdateRoot = (data)=>{
    return requireAxiosBack('/control/roots', {
        method:'post',
        data
    })
}

export const requireUpdateBaseRoot = (data)=>{
    return requireAxiosBack('/control/roots/base', {
        method:'post',
        data
    })
}

export const requireDeleteRoot = (data)=>{
    return requireAxiosBack('/control/roots/base', {
        method:'DELETE',
        data
    })
}

export const requireDeleteUserRoot = (data)=>{
    return requireAxiosBack('/control/roots', {
        method: 'DELETE',
        data
    });
}

export const requireSaveAppendRoot = (data)=>{
    return requireAxiosBack('/control/roots/add', {
        method:'post',
        data
    })
}
