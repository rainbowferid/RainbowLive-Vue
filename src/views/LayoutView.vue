<template>
  <div
    class="main-container"
    :style="{
      'max-width': proxy.bodyMaxWidth + 'px',
      'min-width': proxy.bodyMinWidth + 'px',
    }"
  >
    <div class="header">
      <LayoutHeader v-if="!showFixedHeader"></LayoutHeader>
    </div>
    <div class="header-fixed" v-if="showFixedHeader">
      <LayoutHeader theme="dark"></LayoutHeader>
    </div>
    <div class="body-inner"></div>
    <Account></Account>
  </div>
</template>

<script setup>
import Account from './account/Account.vue'
import LayoutHeader from './LayoutHeader.vue'
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from 'vue'
const { proxy } = getCurrentInstance()
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

onMounted(() => {
  window.addEventListener('scroll', windowScrollerHandler)
})
const showFixedHeader = ref(false)

const windowScrollerHandler = () => {
  var curScrollTop = window.scrollY
  if (curScrollTop <= 45) {
    showFixedHeader.value = false
  } else {
    showFixedHeader.value = true
  }
}
</script>

<style>
body {
  background: rgb(186, 186, 187) !important;
}
</style>

<style lang="scss" scoped>
.main-container {
  background: #fff;
  min-height: calc(100vh);
  margin: 0px auto;
}
.body-inner {
  height: 5000px;
}
.header-fixed {
  position: fixed;
  width: 100%;
  top: 0px;
}
.header {
  margin: 0px auto;
  background-color: #7c9ce1;
  height: 180px;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  background-image: url(../assets/banner_bg.png);
}
</style>
