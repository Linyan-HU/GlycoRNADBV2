<template>
  <div>
    <q-btn @click="loadHuman" label="Human" color="primary" style="margin-top: 30px; margin-left: 20px; margin-bottom: 10px; width: 100px;"/>
    <q-btn @click="loadMouse" label="Mouse" color="secondary" style="margin-top: 30px; margin-left: 20px; margin-bottom: 10px;" />

    <div>
      <iframe :src="iframeSrc" width="100%" height="1000px" frameborder="0" :loading="loading ? 'lazy' : ''"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iframeSrc: '',  // 初始化为空，等待定位后设置
      loading: true,
    };
  },

  watch: {
    '$route.query.location'(newLocation) {
      this.updateIframeSrc(newLocation);
    },
  },

  methods: {
    updateIframeSrc(location) {
      this.loading = true;

      const species = this.$route.query.species || 'human';
      const basePath = species === 'mouse' ? '/MouseJbrowser.html' : '/Jbrowser.html';

      const loc = location || 'chr17:19061912-19062098';  // 默认位置
      this.iframeSrc = `${basePath}?location=${encodeURIComponent(loc)}`;
    },

    loadHuman() {
      const loc = this.$route.query.location || 'chr17:19061912-19062098';
      this.iframeSrc = `/Jbrowser.html?location=${encodeURIComponent(loc)}`;
    },

    loadMouse() {
      const loc = this.$route.query.location || 'chr1:3,172,239..3,172,348';
      this.iframeSrc = `/MouseJbrowser.html?location=${encodeURIComponent(loc)}`;
    },
  },

  mounted() {
    const loc = this.$route.query.location || 'chr17:19061912-19062098';
    this.updateIframeSrc(loc);
  },
};
</script>

