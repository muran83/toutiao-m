<template>
    <div class="search-history">
      <van-cell title="搜索历史">
        <div v-if="isDeleteShow">
          <span @click="searchHistories.splice(0)">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </div>
        <van-icon @click="isDeleteShow = true" v-else name="delete" />
      </van-cell>
      <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="onSearchItemClick(item, index)"
      >
        <van-icon v-show="isDeleteShow" name="close" />
      </van-cell>
    </div>
  </template>
  
  <script>

  export default {
    name: 'SearchHistory',
    components: {},
    props: {
      searchHistories: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        isDeleteShow: false // 控制删除状态
        
      }
    },
    computed: {},
    watch: {
    },
    created () {},
    mounted () {},
    methods: {
      onSearchItemClick(item, index) {
        if(this.isDeleteShow) {
          // 如果是在删除状态下，点击就删除
          this.searchHistories.splice(index, 1)
        } else {
           // 非删除状态，触发父组件的onSearch事件
           this.$emit('search', item)
        }
       
        
      }
    }
  }
  </script>
  
  <style scoped lang="less"></style>