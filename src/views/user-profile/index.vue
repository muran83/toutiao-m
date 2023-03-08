<template>
    <div class="user-profile">
        <!-- 导航栏 -->
        <van-nav-bar
        class="page-nav-bar"
        left-arrow
        @click-left="$router.back()"
        title="个人信息"
        />
        <!-- /导航栏 -->
        <!-- 个人信息 -->
        <van-cell title="头像" is-link>
            <van-image
              class="avatar"
              fit="cover"
              round
              :src="user.photo"
            />
        </van-cell>
        <van-cell 
        title="昵称" 
        :value="user.name"
        is-link
        @click="isUpdateShow = true"
        />
        <van-cell 
        title="性别" 
        :value="user.gender === 0 ? '男' : '女' " 
        is-link
        @click="isGenderShow = true"
        />
        <van-cell 
        title="生日" 
        :value="user.birthday" 
        is-link 
        @click="isBirthdayShow = true " 
         />
        <!-- /个人信息 -->

        <!-- 编辑昵称 -->
        <van-popup
        v-model="isUpdateShow" 
        style="height: 100%;"
        position="bottom"
        >
          <update-name 
          v-if="isUpdateShow"
          v-model="user.name"
          @close="isUpdateShow = false"
          />
        </van-popup> 
        <!-- /编辑昵称 -->

        <!-- 编辑性别 -->
        <van-popup 
        v-model="isGenderShow"
        style="height: 100%;"
        position="bottom"
        >
          <update-gender 
          v-if="isGenderShow"
          v-model="user.gender"
          @close="isGenderShow = false"
          />
        </van-popup>
        <!-- /编辑性别 -->

        <!-- 编辑生日 -->
        <van-popup 
        v-model="isBirthdayShow"
        style="height: 100%;"
        position="bottom"
        >
        birthday
        </van-popup>
        <!-- /编辑生日 -->

    </div>
  </template>
  
  <script>
  import { getUserProfile } from '@/api/user'
  import UpdateName from './components/update-name'
  import UpdateGender from './components/update-gender'

  export default {
    // 组件名称
    name: 'UserProfile',
    // 局部注册的组件
    components: {
        UpdateName,
        UpdateGender,
    },
    // 组件参数 接收来自父组件的数据
    props: {},
    // 组件状态值
    data () {
      return {
        user: {}, // 用户的个人信息
        isUpdateShow: false, // 控制弹出层的状态
        isGenderShow: false, // 控制性别弹出层的状态
        isBirthdayShow: false, //控制生日弹出层的状态

      }
    },
    // 计算属性
    computed: {},
    // 侦听器
    watch: {},
    created () { 
        this.loadUserProfile()
    },
    mounted () { },
    // 组件方法
    methods: {
        async loadUserProfile() {
            try {
                const { data } = await getUserProfile()
                // console.log(data.data)
                this.user = data.data
            } catch (err) {
                this.$toast('获取数据失败')
            }
        }
    }
  }
  </script>
  
  <style scoped lang="less">
    .user-profile {
        .avatar {
            width: 80px;
            height: 60px;
        }
        .van-popup {
            background-color: #f5f7f9;
        }
    }
  </style>