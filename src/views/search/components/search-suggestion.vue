<template>
    <div class="search-suggestion">
      <van-cell 
      v-for="(suggestion, index) in suggestions" 
      :key="index" 
      icon="search"
      @click="$emit('search', suggestion)">
      <div slot="title" v-html="highLight(suggestion)"></div>
      </van-cell>
    </div>
  </template>
  
  <script>
  import { searchSuggestions } from '@/api/search'
  import { debounce } from 'lodash'
  export default {
    name: 'SearchSuggestion',
    components: {},
    props: {
      searchText: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        suggestions: []
      }
    },
    computed: {},
    watch: {
      searchText: {
        // handler 的另一种写法
        handler: debounce (function(val) {
          this.loadSearchSuggestions(val)
        }, 300),
        // handler (val) {
        //   this.loadSearchSuggestions(val)
        // }
        immediate: true // 首次监视触发 ，第一次往输入框输入一个字符的时候才渲染出搜索建议组件然后才调用，immediate可以立即调用
      }
    },
    created () {},
    mounted () {},
    methods: {
      async loadSearchSuggestions (q) {
        try {
          const { data } = await searchSuggestions(q)
          console.log(data,'搜索联想建议')
          this.suggestions = data.data.options
        } catch (err) {
          this.$toast('获取搜索建议失败，请稍后再试')
        }
      },
      highLight(suggestion) {
        if(!suggestion) return
        // 难点：？利用replace()方法去将suggestion里的searchText替换成带有class样式的html标签
        // 在字符串中找出固定字符，大家首先想到的就应该是使用 -》 正则表达式， 简单使用正则（suggestion.replace(/匹配的内容/gi, 替换成highlightStr)） , 无法插入响应式数据
        const highLightStr = `<span class="active">${this.searchText}</span>` // 将搜索框的输入值替换成 html结构
        const reg = new RegExp(this.searchText, 'gi') // 因为replace方法的第一项参数可以是正则表达式，但是不能直接写入/this.searchText/gi,所以我们使用了 RegExp 对象。RegExp 构造函数创建了一个正则表达式对象，用于将文本与一个模式匹配。
        return suggestion.replace(reg, highLightStr) // 5. 通过 RegExp 来完成响应式数据的正则匹配
      },
    }
  }
  </script>
  
  <style scoped lang="less">
    .search-suggestion {
      /deep/ span.active {
      color: #3296fa;
  }
}
  </style>