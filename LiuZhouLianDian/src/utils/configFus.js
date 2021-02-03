// 给object中的string去除空格
export const toObjstrTrim = (obj) => {
    if (obj && typeof obj === "object") {
        for (const key in obj) {
            if (obj[key] && typeof obj[key] === 'string') {
                object[key] = object[key].trim();
            }
        }
        return obj;
    } else {
        return null;
    }
}
/**
 * this.$data // 组件当前data对象
this.$options.data() // 组件初始化状态下的data对象

Object.assign(this.$data, this.$options.data()) // 重置data对象到初始化状态
 */