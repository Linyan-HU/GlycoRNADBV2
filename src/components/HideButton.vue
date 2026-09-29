<template>
  <div class="button-container">
    <q-btn flat dense label="Home" @click="handleButtonClick(8)" :class="{ 'active-btn': isActive === 8 }" style="font-size: 18px;"/>
    <q-btn flat dense label="DataSets" @click="handleButtonClick(1)" :class="{ 'active-btn': isActive === 1 }" style="font-size: 18px;"/>
    <q-btn-dropdown flat dense label="Sequence"  style="font-size: 18px;" :class="{ 'active-btn': isActive === 'sequence' }">
      <q-list>
        <q-item clickable v-close-popup @click="handleOptionClick('human')" class="sequence-item">
          <q-item-section>
            Human
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="handleOptionClick('mouse')" class="sequence-item">
          <q-item-section>
            Mouse
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn flat dense label="Abundance" @click="handleButtonClick(3)" :class="{ 'active-btn': isActive === 3 }" style="font-size: 18px;"/>
    <q-btn flat dense label="Blast" @click="handleButtonClick(2)" :class="{ 'active-btn': isActive === 2 }" style="font-size: 18px;"/>
    <q-btn flat dense label="JBrowse" @click="handleButtonClick(5)" :class="{ 'active-btn': isActive === 5 }" style="font-size: 18px;"/>
    <q-btn flat dense label="glycaninformation" @click="handleButtonClick(6)" :class="{ 'active-btn': isActive === 6 }" style="font-size: 16px;"/>
    <q-btn flat dense label="Download" @click="handleButtonClick(7)" :class="{ 'active-btn': isActive === 7 }" style="font-size: 18px;"/>
    <q-btn flat dense label="Help" @click="handleButtonClick(4)" :class="{ 'active-btn': isActive === 4 }" style="font-size: 18px;"/>
    <q-btn flat dense label="About" @click="handleButtonClick(9)" :class="{ 'active-btn': isActive === 9 }" style="font-size: 18px;"/>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: null
    };
  },
  created() {
    // 在组件创建时，根据当前路由设置isActive的初始值
    this.setActiveState();
  },
  methods: {
    setActiveState() {
      const path = this.$route.path;
      switch(path) {
        case '/dataset':
          this.isActive = 1;
          break;
        case '/blast':
          this.isActive = 2;
          break;
        case '/expression':
          this.isActive = 3;
          break;
        case '/help':
          this.isActive = 4;
          break;
        case '/jbrowser':
          this.isActive = 5;
          break;
        case '/glypage':
          this.isActive = 6;
          break;
        case '/download':
          this.isActive = 7;
          break;
        case '/':
          this.isActive = 8;
          break;
        case '/aboutus':
          this.isActive = 9;
          break;
        case '/human':
        case '/mouse':
          this.isActive = 'sequence';
          break;
        default:
          this.isActive = null;
          break;
      }
    },
    handleButtonClick(index) {
      this.isActive = index;
      switch(index) {
        case 1:
          this.$router.push({ path: '/dataset' });
          break;
        case 2:
          this.$router.push({ path: '/blast' });
          break;
        case 3:
          this.$router.push({ path: '/expression' });
          break;
        case 4:
          this.$router.push({ path: '/help' });
          break;
        case 5:
          this.$router.push({ path: '/jbrowser' });
          break;
        case 6:
          this.$router.push({ path: '/glypage' });
          break;
        case 7:
          this.$router.push({ path: '/download' });
          break;
        case 8:
          this.$router.push({ path: '/' });
          break;
        case 9:
          this.$router.push({ path: '/aboutus' });
          break;
        default:
          break;
      }
    },
    handleOptionClick(option) {
      if (option === 'human' || option === 'mouse') {
        this.isActive = 'sequence'; // 将 sequence 设置为活动状态
        if (option === 'human') {
          this.$router.push({ path: '/human' });
        } else if (option === 'mouse') {
          this.$router.push({ path: '/mouse' });
        }
      }
    },
  },
  watch: {
    '$route'(to, from) {
      // 路由变化时重新设置isActive
      this.setActiveState();
    }
  }
}
</script>


<style scoped>
.sequence-item {
  font-size: 18px; /* 调整文字大小 */
}
.active-btn {
  background-color: #ffffff; /* 改变背景颜色 */
  border-color: #ccc; /* 改变边框颜色 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  color: #333; /* 改变文字颜色 */
}


</style>






