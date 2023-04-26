export const hovershow = {
    name:'hovershow',
    mounted:function(el, binding, vnode) {
        el.style.opacity = .3;
        el.style.transition = '.5s';
    },
    updated:function(el, binding, vnode){
        if(binding.value){
            el.style.opacity = '1';
        }else {
            el.style.opacity = '0.3';
        }
    }
}