import { nanoid } from "nanoid";

export const items = [
    {
        id: nanoid(),
        title: '个人中心',
        target: '/user',
        children:[
            [
                {
                    id:nanoid(),
                    title:'待处理订单',
                    target:'/preserve',
                },
                {
                    id:nanoid(),
                    title:'我的问答',
                    target:'/preserve',
                },
                {
                    id:nanoid(),
                    title:'降价商品',
                    target:'/preserve',
                },
                {
                    id:nanoid(),
                    title:'返修退换货',
                    target:'/preserve',
                },
                {
                    id:nanoid(),
                    title:'我的关注',
                    target:'/preserve',
                },
            ],
            [
                {
                    id:nanoid(),
                    title:'帮助中心',
                    target:'/preserve',
                },
                {
                    id:nanoid(),
                    title:'售后服务',
                    target:'/preserve',

                },
                {
                    id:nanoid(),
                    title:'在线客服',
                    target:'/preserve',
                },
                {
                    id:nanoid(),
                    title:'意见反馈',
                    target:'/preserve',
                },
                {
                    id:nanoid(),
                    title:'联系客服',
                    target:'/preserve',
                },
            ],
        ]
    },
    {
        id: nanoid(),
        title:'我的订单',
        target:'/preserve',
    },
    {
        id: nanoid(),
        title:'企业采购',
        target:'/preserve',
    },
    {
        id: nanoid(),
        title:'商家服务',
        target:'/preserve',
    },
    {
        id: nanoid(),
        title:'网站导航',
        target:'/preserve',
    },
    {
        id: nanoid(),
        title:'手机商城',
        target:'/preserve',
    },
    {
        id: nanoid(),
        title:'网站无障碍',
        target:'/preserve',
    },
].map(item=>{
    item.hasChild = (item.children)?true:false;
    return item;
});

export const navItems = [
    {
        id: nanoid(),
        title:'全部产品',
        target: '/preserve',
    },
    {
        id: nanoid(),
        title: '蛋糕系列',
        target: '/preserve',
        children: [
            {
                id: nanoid(),
                title: '新品系列',
                target: '/preserve',
            },
            {
                id: nanoid(),
                title: '经典系列',
                target: '/preserve',
            },
            {
                id: nanoid(),
                title: '儿童系列',
                target: '/preserve',
            },
            {
                id: nanoid(),
                title: '尊爱系列',
                target: '/preserve',
            },
        ],
    },
    {
        id: nanoid(),
        title: '零食糕点',
        target: '/preserve',
    },
    {
        id: nanoid(),
        title: '关于我们',
        target: '/preserve',
    }
];

export const infos = [
    {
        id: nanoid(),
        target:'/preserve',
        title: 'Copyright20333©白白白有限公司 版权没有'
    },
    {
        id: nanoid(),
        target:'/preserve',
        title: '白白白官方邮箱: info@xxx.com',
    },
    {
        id: nanoid(),
        target:'/preserve',
        title: '客服电话: abb-cdd-effg',
    },
    {
        id: nanoid(),
        title: '食品流通许可证号: xxxxxxxxxxxxxx',
        target:'/preserve',
    },
    {
        id: nanoid(),
        title:'统一社会信用代码: xxxxxxxxxxxxxxxxxxxxxxx',
        target:'/preserve',
    }
]

export const helps = [
    {
        id:nanoid(),
        title:'购物指南',
        target:'/preserve',
        children: [
            {
                id:nanoid(),
                title: '购物流程',
                target:'/preserve',
            },
            {
                id:nanoid(),
                title: '蛋糕尺寸',
                target:'/preserve',
            },
        ]
    },
    {
        id:nanoid(),
        title:'订购范围',
        target:'/preserve',
        children: [
            {
                id:nanoid(),
                title: '地图查询',
                target:'/preserve',
            },
            {
                id:nanoid(),
                title: '团购服务',
                target:'/preserve',
            },
        ]
    },
    {
        id:nanoid(),
        title:'公司服务',
        target:'/preserve',
        children: [
            {
                id:nanoid(),
                title: '附近门店',
                target:'/preserve',
            },
        ]
    },
    {
        id:nanoid(),
        title:'企业招聘',
        target:'/preserve',
        children: [
            {
                id:nanoid(),
                title: '白白招聘',
                target:'/preserve',
            },
            {
                id:nanoid(),
                title: 'baibai招聘world',
                target:'/preserve',
            },
        ]
    },
    {
        id:nanoid(),
        title:'售后服务',
        target:'/preserve',
        children: [
            {
                id:nanoid(),
                title: '投诉渠道',
                target:'/preserve',
            },
            {
                id:nanoid(),
                title: '客服中心',
                target:'/preserve',
            },
            {
                id:nanoid(),
                title:'加盟维权',
                target:'/preserve',
            }
        ]
    },

];

export const userCenterItems = [
    {
        id:nanoid(),
        title:'账户信息',
        page:'userdetail',
        iconClass:'iconfont icon-xxxx'
    },
    {
        id:nanoid(),
        title:'购买记录',
        page:'payforhis',
        iconClass:'iconfont icon-xxxx'
    },
    {
        id:nanoid(),
        title:'我的购物车',
        page:'shopcar',
        iconClass:'iconfont icon-xxxx'
    },
    {
        id:nanoid(),
        title:'我的收藏',
        page:'collect',
        iconClass:'iconfont icon-xxxx'
    },
    {
        id:nanoid(),
        title:'售后服务',
        page:'aftservices',
        iconClass:'iconfont icon-xxxx'
    },
    {
        id:nanoid(),
        title:'我的足迹',
        page:'foothis',
        iconClass:'iconfont icon-xxxx'
    },

]