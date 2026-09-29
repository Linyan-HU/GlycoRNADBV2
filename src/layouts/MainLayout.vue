<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="toolbar-container">
        <q-toolbar-title class="custom-toolbar-title">
          GlycoRNA DataBase
        </q-toolbar-title>

        <HideButton />

        <q-btn flat round dense icon="menu" aria-label="Menu" label="Menu" @click="toggleLeftDrawer" />

      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        bordered
        side="left"
        :width="300"
        content-class="q-pa-none"
    >
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <side-menu></side-menu>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>




</template>

<script>
import SideMenu from "src/components/SideMenu.vue";
import HideButton from "components/HideButton.vue";

export default {
  name: "MainLayout",

  components: {
    SideMenu,
    HideButton,
  },

  data() {
    return {
      leftDrawerOpen: false,
      isFooterVisible: false
    };
  },

  mounted() {
    // 从 localStorage 恢复侧边菜单状态
    const leftDrawerState = localStorage.getItem("leftDrawerOpen");
    this.leftDrawerOpen = leftDrawerState === "true";
    window.addEventListener('scroll', this.handleScroll);
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
      // 将侧边菜单状态存储到 localStorage
      localStorage.setItem("leftDrawerOpen", this.leftDrawerOpen);
    },
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // When scrolled to the bottom
      if (scrollTop + clientHeight >= scrollHeight) {
        this.isFooterVisible = true;
      } else {
        this.isFooterVisible = false;
      }
    }
  },
};
</script>



<style scoped>
.custom-toolbar-title {
  font-size: 25px;
  font-weight: bold;
  white-space: nowrap; /* 避免换行 */
}

.toolbar-container {
  background-color: midnightblue;
  display: flex;
  align-items: center; /* 确保内容垂直居中 */
  flex-wrap: wrap; /* 允许按钮换行 */
}

.q-header {
  background-color: midnightblue;
}

.button-container {
  display: flex;
  align-items: center;
  gap: 40px; /* 设置按钮之间的间距 */
  flex-wrap: wrap; /* 允许按钮换行 */
  margin-right: 40px;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f8f9fa;
  padding: 10px 0;
  text-align: center;
  border-top: 1px solid #ccc;
  transition: transform 0.3s ease; /* 添加过渡效果 */
  transform: translateY(100%); /* 隐藏footer，将其移动到页面底部之外 */
}

.footer-visible {
  transform: translateY(0); /* 显示footer，将其移动到页面底部 */
}
</style>
