# API 文档

# 商城API

## 登录

### 注册

```js
/* request */
url: '/login'
method: 'POST'
body: {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'success',
    token: {
        type:String,
        required: true
    }
}
```

&emsp;&emsp;注册后直接登录  

### 登录

```js
/* request */
url: '/login',
method: 'GET',
body: {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'success',
    token: {
        type:String,
        required: true
    }
}
```

## 用户

### 获取用户信息

```js
/* request */
url: '/user',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'userinfo success',
    data: userInfoObj
}
```

### 购物车信息

#### 获取购物车信息

```js
/* request */
url: '/user/shopcar',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'success',
    data: shopCarInfoObjArr
}
```

#### 添加购物车信息

```js
/* request */
url: '/user/shopcar',
method: 'POST',
headers:{
    token:{
        type:String,
        required: true,
    }
}，
body: {
    dataObj
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'success',
    data:"append success"
}
```


### 地址信息

#### 获取地址信息

```js
/* request */
url: '/user/locs',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'success',
    data: locsInfoObjArr
}
```

#### 添加地址

```js
/* request */
url: '/user/locs',
method: 'POST',
headers:{
    token:{
        type:String,
        required: true,
    }
}，
body: {
    dataObj
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'success',
    data:"append success"
}
```

## 商品信息

### 获取推荐商品信息

```js
/* request */
url: '/recommend',
method: 'GET',

/* redirect to /good */

/* response */
status: 200,
data: {
    code: 20000,
    msg:'success',
    data:goodsInfoObjArr
}
```

### 获取轮播图商品信息

```js
/* request */
url: '/swiper',
method: 'GET',

/* redirect to /good */

/* response */
status: 200,
data: {
    code: 20000,
    msg:'success',
    data:goodsInfoObjArr
}
```

### 通过id获取商品信息

```js
/* request */
url: '/good/:id',
method: 'GET',
params: {
    id: {
        type: String,
        required: true,
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'success',
    data:goodInfoObj
}
```

### 获取商品信息(前五)

```js
/* request */
url: '/good',
method: 'GET'

/* response */
status: 200,
data: {
    code: 20000,
    msg:'success',
    data:goodsInfoObjArr
}
```

## 发起支付账单

```js
/* request */
url: '/payfor',
method: 'POST',
headers: {
    token: {
        type: String,
        required: true
    }
},
body: {
    pays: {
        type: paysInfoObjArr,
        required:true,
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg: 'success',
    data: 'payfor success'
}
```

## 登出

```js
/* request */
url: '/payfor',
method: 'POST',
headers: {
    token: {
        type: String,
        required: true
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'logout success',
}
```

# 后台API

## 登录

### 登录

```js
/* request */
url: '/back/login',
method: 'POST',
body: {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'backmanager login success',
    token: {
        type:String,
        required: true
    }
}
```

## 用户信息

### 用户信息

```js
/* request */
url: '/back/user',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'req userinfo success',
    data: userInfoObj
}
```

### 更新用户信息

```js
/* request */
url: '/back/user',
method: 'POST',
headers:{
    token:{
        type:String,
        required: true,
    }
},
body: updateObj

/* response */
status: 200,
data: {
    code: 20000,
    msg:'update userinfo success',
    data: 'success'
}
```

## 账单信息

### 获取账单信息页数

```js
/* request */
url: '/back/pays/pages',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'get pays page success',
    data: totPagesNumber
}
```

### 获取账单信息

&emsp;&emsp;获取当前(已登录)用户的账单信息

```js
/* request */
url: '/back/pays',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
},
body: { 
    page: {
        type: Number
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'req pays success',
    data: paysInfoArr
}
```

### 删除账单信息

```js
/* request */
url: '/back/pays/:targetId',
method: 'DELETE',
headers:{
    token:{
        type:String,
        required: true,
    }
},
params: { 
    targetId: {
        type: String,
        meaning: '待删除账单的ID'
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'delete pay success',
}
```

## 品牌信息

### 获取品牌信息页数

```js
/* request */
url: '/back/brands/pages',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'req brands success',
    data: totPagesNumber
}
```

### 获取品牌列表

```js
/* request */
url: '/back/brands/pages',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
},
body{
    page: {
        type: Number
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'req brands success',
    data: brandsInfoArr
}
```

### 删除品牌信息

```js
/* request */
url: '/back/brands/:targetId',
method: 'DELETE',
headers:{
    token:{
        type:String,
        required: true,
    }
},
params{
    targetId: {
        type: String,
        meaning:'待删除的品牌信息ID'
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'delete brand success',
}
```

### 修改品牌信息

```js
/* request */
url: '/back/brands',
method: 'POST',
headers:{
    token:{
        type:String,
        required: true,
    }
},
body:updateData

/* response */
status: 200,
data: {
    code: 20000,
    msg:'update brands success',
}
```

## 总览信息

### 获取账单的统计信息

```js
/* request */
url: '/back/overlist/pay',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'get overlist/pay success',
    data: paysInfoSortArrOf5
}
```

### 获取品牌的统计信息

```js
/* request */
url: '/back/overlist/brand',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'get overlist/brand success',
    data: brandsInfoArrOf5
}
```

### 获取该用户总收入

```js
/* request */
url: '/back/overlist/income',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'get overlist/income success',
    data: totIncomeNumberOfFloat
}
```

## 用户管理

### 获取用户页数

&emsp;&emsp;对于超级用户`status===0`, 获取除超级用户外全部用户的列表  

```js
/* request */
url: '/back/control/users',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'req users pages success',
    data: totPagesNumber
}
```

### 获取用户列表

```js
/* request */
url: '/back/control/users',
method: 'GET',
headers:{
    token:{
        type:String,
        required: true,
    }
},
body: { 
    page: {
        type: Number
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'req users success',
    data: usersInfoArr
}
```

&emsp;&emsp;返回的用户信息不包含：品牌、账单及商品信息

### 删除用户

```js
/* request */
url: '/back/control/users',
method: 'DELETE',
headers:{
    token:{
        type:String,
        required: true,
    }
},
body: { 
    ids: {
        type: ArrayofIdStr
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'delete ids success',
    data:'success'
}
```

### 添加用户

```js
/* request */
url: '/back/control/users',
method: 'POST',
headers:{
    token:{
        type:String,
        required: true,
    }
},
body: { 
    userInfo: {
        type: Object,
        exam: {
            name: String,
            pwd: String,
            status: String
        }
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'append user success',
    data:'success'
}
```

## 权限信息

### 获取基础权限

```js
/* request */
url: '/back/control/roots/base',
method: 'GET',

/* response */
status: 200,
data: {
    code: 20000,
    msg:'req basic roots success',
    data: rootsArr
}
```

### 修改基础权限

```js
/* request */
url: '/back/control/roots/base',
method: 'POST',
headers: {
    token: {
        type: String
    }
},
body: {
    roots: {
        type: newRootInfoObj
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'update base roots success',
    data: 'success'
}
```

### 删除基础权限

```js
/* request */
url: '/back/control/roots/base',
method: 'POST',
headers: {
    token: {
        type: String
    }
},
body: {
    id: {
        type: String
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'delete root by id success',
    data: 'success'
}
```

### 添加基础权限

```js
/* request */
url: '/back/control/roots/add',
method: 'POST',
headers: {
    token: {
        type: String
    }
},
body: {
    root: {
        type: rootObj,
        exam: {
            title: String,
            path: '/xxx/xxx/...'
        }
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'append root success',
    data: 'success'
}
```

### 获取用户权限

```js
/* request */
url: '/back/control/roots/:userId',
method: 'GET',
headers: {
    token: {
        type: String
    }
},
params: {
    userId: {
        type: String
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'req roots success',
    data: userRootsInfoArr
}
```

### 修改用户权限

```js
/* request */
url: '/back/control/roots',
method: 'POST',
headers: {
    token: {
        type: String
    }
},
body: {
    id: {
        type: String,
        meaning: '用户ID'
    },
    roots: {
        type: Array,
        meaning: '更新后的权限列表'
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'update target roots success',
    data: 'success'
}
```

### 删除用户权限

```js
/* request */
url: '/back/control/roots',
method: 'DELETE',
headers: {
    token: {
        type: String
    }
},
body: {
    id: {
        type: String,
        meaning: '待删除的权限ID'
    },
    userId: {
        type: String,
        meaning: '用户ID'
    }
}

/* response */
status: 200,
data: {
    code: 20000,
    msg:'delete user root success',
    data: 'success'
}
```
