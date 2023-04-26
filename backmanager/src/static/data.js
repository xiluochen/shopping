import { nanoid } from "nanoid"

export const initLeftItems = [
    {
        id:nanoid(),
        title:'概览',
        target:'/home/total',
        icon:'icon-shouyegailan',
    },
    {
        id:nanoid(),
        title:'权限管理',
        target:'/home/control',
        icon:'icon-jichu',
        children:[
            {
                id:nanoid(),
                title:'用户管理',
                target:'/home/control/user',
            },
            {
                id:nanoid(),
                title:'权限管理',
                target:'/home/control/root',
            },
        ],
    },
    {
        id:nanoid(),
        title:'订单管理',
        target:'/home/pay',
        icon:'icon-dingdan',
    },
    {
        id:nanoid(),
        title:'品牌管理',
        target:'/home/brand',
        icon:'icon-pinpaitemai',
    },
    {
        id:nanoid(),
        title:'设置',
        target:'/home/setting',
        icon:'icon-shezhi',
    },

];

export const initTitItems = [
    '序号','买家姓名','商品名',
    '商品单价','购买数量','总价',
    '配送地址','操作'
  ];