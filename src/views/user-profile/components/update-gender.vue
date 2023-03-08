<template>
    <div class="update-gender">
        <van-picker
         title="性别"
         show-toolbar
         :columns="columns"
         :default-index="value"
         @confirm="onConfirm"
         @change="onChange"
         @cancel="$emit('close')"
        />
    </div>
  </template>
  
  <script>
  import { updateUserProfile } from '@/api/user'
  export default {
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data () {
      return {
        columns: ['男', '女'],
        localGender: this.value
      }
    },
    methods: {
      async onConfirm () {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true,
                duration: 0
            })
            try {
                const localGender = this.localGender
                await updateUserProfile({
                    gender: localGender
                })
                // 更新视图
                this.$emit('input', localGender)
                // 关闭弹窗
                this.$emit('close')
                // 提示成功
                this.$toast.success('更新成功')

            } catch (err) {
                this.$toast.fail('更新失败')
            }
        },
        onChange (picker, value, index) {
            this.localGender = index
        }
    }
  }
  </script>
  
  <style scoped lang='less'>
  
  </style>