<template>
   <!--
    只有 List 在可视范围内才会检查滚动位置触发 onLoad
   -->
  <div class="comments-container">
    <van-list
     v-model="loading"
     :finished="finished"
     finished-text="没有更多了"
     :error.sync="error"
     error-text="加载失败，请点击重试"
     :immediate-check="false"
     @load="onLoad"
    >
    <comment-item 
    v-for="(item, index) in list" 
    :key="index" 
    :comment="item" 
    @reply-click="$emit('reply-click', $event)"
    />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  // 组件名称
  name: 'CommentList',
  // 局部注册的组件
  components: {
    CommentItem
  },
  // 组件参数 接收来自父组件的数据
  props: {
    source: {
        type: [String, Number, Object],
        required: true
    },
    list: {
      type: Array,
      // default, 默认值, 如果是数组或者对象，需要通过函数的形式返回
      default: () => []
    },
    type: {
      type: String,
      // 自定义type参数，默认值为a， 取值范围只能是a或者c
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  // 组件状态值
  data () {
    return {
      // list: [], // 文章的评论数组
      loading: false,
      finished: false,
      offset: null, // 获取下一页的数据
      limit: 10,
      error: false,

    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子请自行删除
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，el属性还不存在
  */
  created () {
    // 页面一加载，就获取评论的数量
    // 当你手动初始 onLoad 的话，它不会自动开始初始的 loading
    // 所以我们要手动的开启初始 loading
    this.loading = true
    this.onLoad()
  },
  /**
  * el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.el 也在文档内。
  */
  mounted () {},
  // 组件方法
  methods: {
   async onLoad() {
      // 1、异步更新数据
      try {
        const { data } = await getComments({
            type: this.type, // 评论类型，a-对文章（article）的评论，c-对评论（comment）的回复
            source: this.source.toString(), // 源id，文章id或评论id(特别注意：需要手动加上toString()，否则会在source的值两边加上双引号，导致id不是一个有效的整形)
            offset: this.offset,
            limit: this.limit // 获取评论偏移量的数据，一开始为null
        })
        // console.log(data,'请求文章评论的数据显示')
        const { results } = data.data 
        // console.log(results,'请求文章评论的数据显示')
        // 2、将数据追加push到数组当中
        this.list.push(...results)
       // 加载状态结束
       this.loading = false
        // 将含有评论数量的数据传回父组件
        this.$emit('onload-success', data.data)
        // console.log(data.data, '1212121111111111111')
       if(results.length) {
         // 有就去请求下一页的页码
            this.offset = data.data.last_id
       } else {
        //  没有就将 finish 设置为true
        this.finished = true
       }
      } catch (err) {
        console.log(err, "文章数据请求失败！")
        this.error = true
        this.loading = false
      }
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    },
  }
}
</script>

<style scoped lang="less">

</style>
