<template>
  <Dialog
    :show="dialogConfig.show"
    :title="dialogConfig.title"
    :buttons="dialogConfig.buttons"
    width="1000px"
    :showCancel="false"
    @close="dialogConfig.show = false"
  >
    <div class="dialog-panel">
      <div class="bg">
        <img src="../../assets/login_bg2.png" alt="" />
      </div>
      <el-form
        class="login-register"
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        @submit.prevent
      >
        <div class="tab-panel">
          <div :class="[onType === 1 ? 'active' : '']" @click="showPanel(1)">登录</div>
          <el-divider direction="vertical" />
          <div :class="[onType === 0 ? 'active' : '']" @click="showPanel(0)">注册</div>
        </div>
        <!--邮箱输入-->
        <el-form-item prop="email">
          <el-input
            clearable
            placeholder="请输入邮箱"
            v-model.trim="formData.email"
            :maxlength="150"
            size="large"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>
        <div v-if="onType == 1">
          <el-form-item prop="password">
            <el-input
              show-password
              clearable
              placeholder="请输入密码"
              v-model.trim="formData.password"
              size="large"
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>
        </div>

        <div v-if="onType == 0">
          <el-form-item prop="nickName" v-if="onType == 0">
            <el-input
              clearable
              placeholder="请输入昵称"
              v-model.trim="formData.nickName"
              :maxlength="150"
              size="large"
            >
              <template #prefix>
                <span class="iconfont icon-account"></span>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="registerPassword">
            <el-input
              show-password
              clearable
              placeholder="请输入密码"
              v-model.trim="formData.registerPassword"
              size="large"
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="reRegisterPassword">
            <el-input
              show-password
              clearable
              placeholder="请再次输入密码"
              v-model.trim="formData.reRegisterPassword"
              size="large"
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>
        </div>

        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <div class="input">
              <el-input
                clearable
                placeholder="请输入验证码"
                v-model.trim="formData.checkCode"
                :maxlength="50"
                size="large"
              >
                <template #prefix>
                  <span class="iconfont icon-checkcode"></span>
                </template>
              </el-input>
            </div>
            <img :src="checkCodeInfo.checkCode" alt="" @click="changeCheckCode" />
          </div>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-button type="primary" @click="doSubmit" class="login-btn" size="large">
            <span v-if="onType === 0">注册</span>
            <span v-if="onType === 1">登录</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from '@/components/Dialog.vue'
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/LoginStore'
import { onMounted } from 'vue'

const { proxy } = getCurrentInstance()
const route = useRoute()
const router = useRouter()
const dialogVisible = ref(true)

const dialogConfig = reactive({
  show: true,
  title: '',
  buttons: [],
})

const loginStore = useLoginStore()
const checkCodeInfo = ref({})
const changeCheckCode = async () => {
  let result = await proxy.Request({
    url: proxy.Api.checkCode,
  })
  if (!result) {
    return
  }
  checkCodeInfo.value = result.data
}

const formData = ref({})
const formDataRef = ref()
const rules = {
  email: [
    { required: true, message: '请输入邮箱' },
    {
      validator: proxy.Vertify.email,
      message: '请输入正确的邮箱',
    },
  ],
  password: [{ required: true, message: '请输入密码' }],
  nickName: [{ required: true, message: '请输入昵称' }],
  registerPassword: [
    { required: true, message: '请输入密码' },
    {
      validator: proxy.Vertify.password,
      message: '密码只能是数字，字母，特殊字符 8-18位',
    },
  ],
  reRegisterPassword: [
    { required: true, message: '请再次输入密码' },
    {
      validator: proxy.Vertify.password,
      message: '两次输入的密码不一致',
    },
  ],
  checkCode: [{ required: true, message: '请输入验证码' }],
}
const onType = ref(1)

const resetForm = () => {
  changeCheckCode()
  nextTick(() => {
    formDataRef.value.resetFields()
    formData.value = {}
  })
}

const doSubmit = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return
    }
    let params = {}
    Object.assign(params, formData.value)
    let result = await proxy.Request({
      url: api.ss,
      params,
    })
    if (!result) {
      return
    }
  })
}

const showPanel = (type) => {
  onType.value = type
  resetForm()
}

onMounted(() => {
  resetForm(1)
})
</script>

<style lang="scss" scoped>
.dialog-panel {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .bg {
    width: 450px;
    height: 520px; //580px
    overflow: hidden;
    img {
      width: 90%;
    }
  }
  .login-register {
    width: 350px;
    .tab-panel {
      margin: 10px auto;
      display: flex;
      width: 130px;
      font-size: 18px;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      .active {
        color: var(--blue2);
      }
    }
    .no-account {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .login-btn {
      width: 100%;
    }
    .bottom-btn {
      margin-bottom: 0px;
    }
  }
}

.check-code-panel {
  display: flex;
  align-items: center;
  width: 100%;
  .input {
    flex: 1;
  }
  .right-panel {
    margin-left: 5px;
    cursor: pointer;
  }
  img {
    cursor: pointer;
  }
}
</style>
