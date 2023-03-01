<template>
    <div class="channel-edit">
      <van-cell :border="false">
         <div slot="title" class="title-text">我的频道</div>
         <van-button class="edit-btn" size="mini" round type="danger" plain>编辑</van-button>
      </van-cell>
      <!-- 我的频道 -->
      <van-grid class='my-grid' :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        icon="clear">
         <span class="text" :class="{active: index === active }" slot="text">
            {{ channel.name }}
         </span>
      </van-grid-item>
    </van-grid>
      <!-- /我的频道  -->
      <!-- 频道推荐 -->
      <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class='recommend-grid' :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="value in 8"
        :key="value"
        icon='plus'
        text="文字"
      />
    </van-grid>
    <!-- /频道推荐 -->

    </div>
  </template>
  
  <script>
  export default {
    name: 'ChannelEdit',
    components: {},
    props: {
        myChannels: {
            type: Array,
            required: true
        },
        active:{
            type: Number,
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
  
  <style scoped lang="less">
  .channel-edit {
    padding: 85px 0;
  
    .title-text {
      font-size: 32px;
      color: #333333;
    }
  
    .edit-btn {
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: #f85959;
      border: 1px solid #f85959;
    }
  
    /deep/ .grid-item {
      width: 160px;
      height: 86px;
      .van-grid-item__content {
        white-space: nowrap;
        background-color: #f4f5f6;
        .van-grid-item__text, .text {
          font-size: 28px;
          color: #222;
          margin-top: 0;
        }
        .active {
          color: red;
        }
        .van-grid-item__icon-wrapper {
          position: unset;
        }
      }
    }
  
    /deep/ .my-grid {
      .grid-item {
        .van-icon-clear {
          position: absolute;
          right: -10px;
          top: -10px;
          font-size: 30px;
          color: #cacaca;
          z-index: 2;
        }
      }
    }
  
    /deep/ .recommend-grid {
      .grid-item {
        .van-grid-item__content {
          flex-direction: row;
          .van-icon-plus {
            font-size: 28px;
            margin-right: 6px;
          }
        }
      }
    }
  }
  </style>