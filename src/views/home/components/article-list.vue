<template>
    <div class="article-list">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <van-cell v-for="item in list" :key="item" :title="item" />
</van-list>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  export default {
    name: 'ArticleList',
    components: {},
    props: {
      channel: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {},
    setup() {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };

    return {
      list,
      onLoad,
      loading,
      finished,
    };
  },
  }
  </script>
  
  <style scoped lang="less"></style>