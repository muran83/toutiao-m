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
        <input
        type="file"
        hidden
        ref="file"
        @change="onFileChange"
        />

        <!-- 个人信息 -->
        <van-cell
        class="photo-cell"
        title="头像"
        is-link
        center
        @click="$refs.file.click()"
        >
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
        <update-birthday
        v-if="isBirthdayShow"
        v-model="user.birthday"
        @close="isBirthdayShow = false "
        />
        </van-popup>
        <!-- /编辑生日 -->

        <!-- 编辑头像 -->
        <van-popup
        v-model="isPhotoShow"
        style="height: 100%;"
        position="bottom"
        >
        <update-photo
        :img="img"
        @close="isPhotoShow = false"
        />
        </van-popup>
        <!-- /编辑头像 -->

    </div>
  </template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'

export default {
  // 组件名称
  name: 'UserProfile',
  // 局部注册的组件
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data () {
    return {
      user: {}, // 用户的个人信息
      isUpdateShow: false, // 控制弹出层的状态
      isGenderShow: false, // 控制性别弹出层的状态
      isBirthdayShow: false, // 控制生日弹出层的状态
      isPhotoShow: false, // 控制头像弹出层的状态
      img: null

    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {

  },
  // 组件方法
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        // console.log(data.data)
        this.user = data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)
      // 展示图片弹出层
      this.isPhotoShow = true
      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法是 每次使用完毕主动清空其value
      this.$refs.file.value = ''
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
        .photo-cell {
         .van-cell__value {
           display: flex;
           flex-direction: row-reverse;
        }
      }
    }
  </style>
