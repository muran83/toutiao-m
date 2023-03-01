import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 使用中文语言包
dayjs.locale('zh-cn')

// 加载相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 定义一个全局过滤器， 然后就可以在任意组件的模板下使用了
// 过滤器相当于一个全局可用的方法（仅供模板使用）
// 参数1：过滤器的名称
// 参数2：过滤器函数
// 在组件种的使用方式：{{ 表达式 | 过滤器名称 }} // 使用的位置： 在components下的index.vue 的21行
// 表达式的值会传给过滤器名称，然后过滤器名称收集的数据会传到value形参上
// 官方一点的回答：管道符 | 前面的表达式的结果会作为参数传递到过滤器函数中
// 过滤器函数的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})