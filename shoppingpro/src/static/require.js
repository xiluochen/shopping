import axios from "axios";

const shopAxios = axios.create({
    method:'GET',
    baseURL:'/shop',
})

const checkImg = (data)=>{
    if(Array.isArray(data)) {
        data = data.map(item=>{
            return checkImg(item);
        });
    }else if(typeof data === 'object'){
        if(data._id)
            data.id = data._id;
        if(data.hasOwnProperty('img')||data.hasOwnProperty('imgUrl')||data.hasOwnProperty('avator')){
            if(data.img)data.img = '/shop/img/'+data.img;
            if(data.imgUrl)data.imgUrl = '/shop/img/'+data.imgUrl;
            if(data.avator)data.avator = '/shop/img/'+data.avator;
        }else {
            data = Object.keys(data).reduce((prev,key)=>{
                prev[key] = (typeof data[key] === 'object')?checkImg(data[key]):data[key];
                return prev;
            }, {});
        }
    }
    return data;
}

shopAxios.interceptors.request.use((config)=>{
    if(config.url.includes('/user') || config.url.includes('/payfor') || config.url==='/logout'){
        Object.assign(config.headers, {
            token:window.sessionStorage.getItem('token')||'',
        });
    }
    return config;
})

shopAxios.interceptors.response.use((res)=>{
    res.data.data = checkImg(res.data.data);
    return res;
},(err)=>{
    if(err.response.status === 504||err.response.status === 404){
        window.sessionStorage.removeItem('token');
    }
    return err;
})

export const requireCommodityInfo = ({id}) => {
    return shopAxios(`/good/${id}`, {
        method:'GET',
    });
}

export const requireRecommend = () => {
    return shopAxios('/recommend', {
        method:'GET',
    });
}

export const requireRegister = (data)=>{
    return shopAxios('/login', {
        method:'POST',
        data
    })
}

export const requireLogin = (data)=>{
    return shopAxios('/login', {
        method:'GET',
        params:data,
    })
}

export const requireLogout = ()=>{
    return shopAxios('/logout', {
        method:'POST',
    })
}

export const requireUserInfo = ()=>{
    return shopAxios('/user', {
        method:'GET'
    })
}

export const requireAppendShopCar = ({id, num}) => {
    return shopAxios('/user/shopcar', {
        method:'POST',
        data: {
            target:id,
            num:num,
        }
    });
}

export const requireSwiperData = ()=>{
    return shopAxios('/swiper', {});
}

export const requireShopCar = () => {
    return shopAxios('/user/shopcar', {
        method:'GET',
    })
}

export const requirePay = ( data) => {
    return shopAxios('/payfor', {
        method:'post',
        data
    })
}

export const requireLocs = ()=>{
    return shopAxios('/user/locs', {
        method:'GET'
    })
}