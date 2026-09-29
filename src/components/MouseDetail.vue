<template>
  <div class="structure-page">
    <h5 class="title">Mouse glycoRNA Detailed information</h5>

    <MouseDetailsCompo :glycoRNAID="glycoRNAID" />

    <div class="title">
      <h5>Detected reads for glycoRNAs</h5>
    </div>

      <MouseSiteCompo :glycoRNAID="glycoRNAID" />


    <MouseStructure :glycoRNAID="glycoRNAID" />

    <div class="legend">
      <h5>Colour Legend</h5>
      <ul>
        <li>
          <span style="color: black; font-weight: bold; font-size: 18px; margin-left: 5px; margin-right: 8px">A</span>
          Same as the template
        </li>
        <li>
          <span style="color: #50ff61; font-weight: bold; font-size: 18px; margin-left: 5px; margin-right: 8px">A</span>
          Modified compared to the template
        </li>

        <li>
          <span class="color-box gly-template"></span>
          Detected RT stop sites of glycoRNAs during sequencing
        </li>

      </ul>
    </div>



  </div>
</template>

<script>
import MouseDetailsCompo from 'components/MouseDetailsCompo.vue';
import MouseSiteCompo from 'components/MouseSiteCompo.vue';
import MouseStructure from "components/MouseStructure.vue";

export default {
  data() {
    return {
      glycoRNAID: null,
    };
  },
  created() {
    this.glycoRNAID = this.$route.params.glycoRNAID;
  },
  components: {
    MouseStructure,
    MouseDetailsCompo,
    MouseSiteCompo
  }
};
</script>


<style scoped>
.title {
  margin-left: 300px; /* 将标题向左平移20像素 */
}

/* 图例部分的样式 */
.legend {
  margin-top: 40px;
  margin-left: 500px;
}

.legend h5 {
  margin-bottom: 10px;
  font-weight: bold;
}

.legend ul {
  list-style: none;
  padding: 0;
}

.legend li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.color-box {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 1px solid #000;
}

/* 定义颜色 */
.same-template {
  background-color: #0c0b0b; /* 绿色 */
}

.modified-template {
  background-color: #0ba834; /* 橙色 */
}

.inserted-nucleotides {
  background-color: #c315ec; /* 蓝色 */
}

.repositioned-template {
  background-color: #274ba2; /* 红色 */
}

.gly-template {
  background-color: #7b99ea; /* 红色 */
  border-radius: 50%; /* 设置圆角为50%，使其变为圆形 */
}

</style>
