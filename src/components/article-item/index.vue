<template>
    <div class="article-item">文章列表项</div>
  </template>
  
  <script>
  export default {
    name: 'ArticleItem',
    components: {},
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    data () {
      return {}
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {}
  }
  </script>
  
  <style scoped lang="less"></style>