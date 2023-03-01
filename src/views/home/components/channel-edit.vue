<template>
    <div class="channel-edit">
      <van-cell :border="false">
         <div slot="title" class="title-text">我的频道</div>
         <van-button 
         class="edit-btn" 
         size="mini" 
         round 
         type="danger" 
         plain
         @click="isEdit = !isEdit"
         >{{ isEdit ? '完成' :'编辑' }}</van-button>
      </van-cell>
      <!-- 我的频道 -->
      <van-grid class='my-grid' :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        icon="clear"
        @click="onMyChannelClick(channel, index)"
        >
        <van-icon
          v-show="isEdit && 
          !fixedChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
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
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon='plus'
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->

    </div>
  </template>
  
  <script>
  import { getAllChannels } from '@/api/channel.js'
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
      return {
        allChannels: [], // 所有频道
        isEdit: false,// 控制编辑状态的显示
        fixedChannels: [0] // 固定频道的id，不允许删除

      }
    },
    computed: {
        recommendChannels () {
        const channels = []
        // find 遍历数组， 找到满足条件的元素项，如果没找到则返回undefined,找到返回的是数组下标
        // 先所有频道数组遍历，然后嵌套遍历，在我的数组中查找与正在遍历的当前元素相同的id
        // 如果查不到，则返回的是undefine，证明此channel不在myChannel中，则在if中将其push进channels中
        this.allChannels.forEach(channel => {
            const ret = this.myChannels.find(myChannel =>{
                return myChannel.id === channel.id
            })
            if(!ret) {
              channels.push(channel)
            }
        })
        return channels
}

    },
    watch: {},
    created () {
        this.loadAllChannels()
    },
    mounted () {},
    methods: {
        // 加载所有频道
        async loadAllChannels () {
            try {
                const { data } = await getAllChannels()
                this.allChannels = data.data.channels
            } catch (err) {
                console.log(err)
                this.$toast("获取频道列表失败")
            }
        },
        onAddChannel (channel) {
            this.myChannels.push(channel)
        },
        onMyChannelClick(channel, index) {
            if (this.isEdit) {
                //编辑状态 删除频道
                this.myChannels.splice(index,1)
                // 如果删除的激活频道之前的频道，则更新激活的频道项

                // 参数1：要删除的元素的开始索引（包括）
                // 参数2：删除的个数，如果不指定，则从参数1开始一直删除到最后
                if (index <= this.active) {
                    // 让激活频道的索引 - 1
                    this.$emit('update-active', this.active - 1, true)
                }
            } else {
                //非编辑状态，执行切换频道
                this.$emit('update-active', index, false)
            }
        }

    }
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