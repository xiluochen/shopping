import Mock from 'mockjs';
import { nanoid } from 'nanoid';

import dayjs from 'dayjs';

let userInfo = {
    name:'aaaaa',
    avator: require('../assets/logo.png'),
    phone:'12345678',
    email:'123456@123.com',
    loc:'hebei'
}

let brands = [
    {
        id:nanoid(),
        title:'小米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id:nanoid(),
        title:'塔塔米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id:nanoid(),
        title:'玉米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id:nanoid(),
        title:'糯米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id:nanoid(),
        title:'大米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id:nanoid(),
        title:'小黄米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id:nanoid(),
        title:'大黄米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id:nanoid(),
        title:'紫米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id:nanoid(),
        title:'蓝米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id:nanoid(),
        title:'粉米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id:nanoid(),
        title:'绿米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id:nanoid(),
        title:'黑米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
        id:nanoid(),
        title:'白米',
        img:'',
        description:'aaaaaaaaaaaaaaaaaaaaaaaa',
    },
];

let users = [
    {
        id:nanoid(),
        userName:'abcd',
        status:'a',
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        roots: [
            {
                id:nanoid(),
                title:"创建品牌",
                height:0,
            },
        ],
    },
    {
        id:nanoid(),
        userName:'abca',
        status:'a',
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        roots: [
            {
                id:nanoid(),
                title:"管理权限",
                height:80,
                children:[
                    {
                        id:nanoid(),
                        title:'管理用户',
                        height:0,
                    },
                    {
                        id:nanoid(),
                        title:'管理权限列表',
                        height:40,
                        children:[
                            {
                                id:nanoid(),
                                title:'修改权限列表',
                                height:0,
                            }
                        ],
                    }
                ],
            },
        ],
    },
    {
        id:nanoid(),
        userName:'cabc',
        status:'b',
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        roots: [],
    },
    {
        id:nanoid(),
        userName:'ca',
        status:'c',
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        roots: [],
    },
    {
        id:nanoid(),
        userName:'abc',
        status:'b',
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        roots: [],
    },
    {
        id:nanoid(),
        userName:'b',
        status:'c',
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        roots: [],
    },
    {
        id:nanoid(),
        userName:'a',
        status:'c',
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        roots: [],
    },
    {
        id:nanoid(),
        userName:'ac',
        status:'b',
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        roots: [],
    },
    {
        id:nanoid(),
        userName:'bc',
        status:'a',
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        roots: [

        ],
    },
    {
        id:nanoid(),
        userName:'c',
        status:'c',
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        roots: [],
    },
];

let roots = [
    {
        id:nanoid(),
        title:"创建品牌",
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        height:0,
    },
    {
        id:nanoid(),
        title:"管理订单",
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        height:20,
        children:[
            {
                id:nanoid(),
                title:'删除订单',
                generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
                height:0,
            },
        ]
    },
    {
        id:nanoid(),
        title:"管理权限",
        height:100,
        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
        children:[
            {
                id:nanoid(),
                title:'管理用户',
                height:0,
                generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
            },
            {
                id:nanoid(),
                title:'管理权限列表',
                generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
                height:50,
                children:[
                    {
                        id:nanoid(),
                        title:'查看权限',
                        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
                        height:0,
                    },
                    {
                        id:nanoid(),
                        title:'修改权限列表',
                        generateTime:dayjs().format('YYYY-MM-DD HH:mm'),
                        height:0,
                    }
                ],
            }
        ],
    },
];

let commodities = [
    {
        id:'123456',
        name:'甜品1',
        price:15,
    }
]

let pays = [
    {
        id:nanoid(),
        payName:'baibaibai',
        payForName:'甜品1',
        payForId: '123456',
        nums:10,
        loc:'hebeishandongshanxi',
    },
    {
        id:nanoid(),
        payName:'bii',
        payForName:'甜品1',
        payForId: '123456',
        nums:10,
        loc:'hebeishandongshanxi',
    },
    {
        id:nanoid(),
        payName:'hhh',
        payForName:'甜品1',
        payForId: '123456',
        nums:10,
        loc:'hebeishandongshanxi',
    },
    {
        id:nanoid(),
        payName:'ggg',
        payForName:'甜品1',
        payForId: '123456',
        nums:10,
        loc:'hebeishandongshanxi',
    },
    {
        id:nanoid(),
        payName:'fff',
        payForName:'甜品1',
        payForId: '123456',
        nums:10,
        loc:'hebeishandongshanxi',
    },
    {
        id:nanoid(),
        payName:'eee',
        payForName:'甜品1',
        payForId: '123456',
        nums:10,
        loc:'hebeishandongshanxi',
    },
    {
        id:nanoid(),
        payName:'ddd',
        payForName:'甜品1',
        payForId: '123456',
        nums:10,
        loc:'hebeishandongshanxi',
    },
    {
        id:nanoid(),
        payName:'ccc',
        payForName:'甜品1',
        payForId: '123456',
        nums:10,
        loc:'hebeishandongshanxi',
    },
    {
        id:nanoid(),
        payName:'aaa',
        payForName:'甜品1',
        payForId: '123456',
        nums:10,
        loc:'hebeishandongshanxi',
    },
    {
        id:nanoid(),
        payName:'hehehe',
        payForName:'甜品1',
        payForId: '123456',
        nums:10,
        loc:'hebeishandongshanxi',
    },
];

const deleteTargetId = (objs, targetId)=>{
    let newObjs = objs.filter(item=>item.id!==targetId);
    if(newObjs.length === objs.length){
        newObjs.forEach(item=>{
            item.children = deleteTargetId(item.children, targetId);
        })
    }
    return newObjs;
}

Mock.mock('/login', 'post', (require)=>{
    const {userName, passWord} = JSON.parse(require.body);
    if(userName==='admin'&&passWord==='123'){
        return Mock.mock('success');
    }
});

Mock.mock('/userinfo', 'get', (require)=>{
    const { token } = JSON.parse(require.body);
    return Mock.mock(userInfo)
})

Mock.mock('/updateinfo', 'post', (require)=>{
    const changedInfo = JSON.parse(require.body);
    Object.keys(changedInfo).forEach(key=>{
        userInfo[key] = changedInfo[key];
    })
    return 'success'; 
})

Mock.mock('/getbrandpages', 'get', (require)=>{
    const {token} = JSON.parse(require.body);
    return Mock.mock(Math.ceil(brands.length/5));
})

Mock.mock('/getbrands', 'get', (require)=>{
    const { token, page } = JSON.parse(require.body);
    return Mock.mock(brands.filter((_,index)=>index>=(page-1)*5&&index<page*5));
})

Mock.mock('/getbrand', 'get', (require)=>{
    const {token, id} = JSON.parse(require.body);
    return
})

Mock.mock('/deletebrand', 'post', (require)=>{
    const {token, brandId} = JSON.parse(require.body);
    brands = brands.filter(item=>item.id!==brandId);
    return 'success';
})

Mock.mock('/updatebrand', 'post', (require)=>{
    const {token, brandInfo} = JSON.parse(require.body);
    let target = brands.filter(item=>item.id===brandInfo.id)[0];
    Object.keys(brandInfo).forEach(key=>{
        target[key] = brandInfo[key];
    })
    return Mock.mock('success');
})

Mock.mock('/getpays', 'get', (require)=>{
    const {token, page} = JSON.parse(require.body);
    return pays.filter((_,index)=>(index>=(page-1)*8&&index<page*8)).map(item=>{
        item['payForInfo'] = commodities.filter(commo=>commo.id===item.payForId)[0];
        return item;
    });
})

Mock.mock('/getpaypages', 'get', (require)=>{
    const {token} = JSON.parse(require.body);
    return Mock.mock(Math.ceil(pays.length/8));
})

Mock.mock('/deletepay', 'post', (require)=>{
    const {token, targetId} = JSON.parse(require.body);
    pays = pays.filter(item=>item.id!==targetId);
    return Mock.mock('success');
})

Mock.mock('/overlistpay', 'get', (require)=>{
    const { token } = JSON.parse(require.body);
    return Mock.mock(pays.filter((_,index)=>(index<5)).map(item=>{
        item['payForInfo'] = commodities.filter(commo=>commo.id===item.payForId)[0];
        return item;
    }));
})

Mock.mock('/overlistbrand', 'get', (require)=>{
    const { token } = JSON.parse(require.body);
    return Mock.mock(brands.filter((_,index)=>(index<5)));
})

Mock.mock('/overlistincome', 'get', (require)=>{
    const { token } = JSON.parse(require.body);
    return Mock.mock(pays.reduce((prev,item)=>{
        let price = commodities.filter(comm=>comm.id===item.payForId)[0].price;
        return prev+= price*item.nums;
    },0))
})

Mock.mock('/getuserpages', 'get', (require)=>{
    const {token, page} = JSON.parse(require.body);
    return Mock.mock(Math.ceil(users.length/5));
})

Mock.mock('/getusers', 'get', (require)=>{
    const {token, page} = JSON.parse(require.body);
    return Mock.mock(users.filter((_,index)=>index>=(page-1)*5&&index<page*5));
})

Mock.mock('/deleteuser', 'post', (require)=>{
    const {token, id} = JSON.parse(require.body);
    users = users.filter(item=>item.id!==id);
    return 'success';
})

Mock.mock('/deleteusers', 'post', (require)=>{
    const {token, ids} = JSON.parse(require.body);
    console.log(ids)
    users = users.filter(item=>!ids.includes(item.id));
    return 'success';
})

Mock.mock('/getroots', 'get', (require)=>{
    const {token} = JSON.parse(require.body);
    return Mock.mock(roots);
})

Mock.mock('/updaterootbyid', 'post', (require)=>{
    const { token, id, roots } = JSON.parse(require.body);
    users.filter(item=>item.id===id)[0].roots = [...roots];
    return 'success';
})

Mock.mock('/deleterootbyid', 'post', (require)=>{
    const { token, id } = JSON.parse(require.body);
    roots = deleteTargetId(roots, id);
    return 'success';
})

Mock.mock('/appendroot', 'post', (require)=>{
    const { token, root } = JSON.parse(require.body);
    roots.push(root);
    return 'success';
})