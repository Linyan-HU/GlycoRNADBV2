<template>
  <div class="structure-page">
    <h5 class="title">Hela glycoRNA Detailed Information</h5>
    <HelaDetailsCompo :glycoRNAID="glycoRNAID" />


    <HelaStructure :glycoRNAID="glycoRNAID" />

    <!-- 添加颜色图例部分 -->
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
          <span style="color: #e35de7; font-weight: bold; font-size: 18px; margin-left: 5px; margin-right: 8px">A</span>
          Inserted nucleotides
        </li>
        <li>
          <span style="color: #2448ff; font-weight: bold; font-size: 18px; margin-left: 5px; margin-right: 8px">A</span>
          Repositioned compared to the template
        </li>

        <li>
          <span class="color-box gly-template"></span>
          Detected RT stop sites of glycoRNAs during sequencing
        </li>
        <li>
          <span class="color-box" style="background: linear-gradient(to right, #fff5a0, #ff4500); width: 60px;"></span>
          Darker color indicates higher glycosylation probability
        </li>
      </ul>
    </div>



    <div class="title">
      <h5>Detected RT stop sites for HeLa glycoRNA</h5>
    </div>

    <HelaSiteCompo :glycoRNAID="glycoRNAID" />


  </div>
</template>

<script>
import HelaDetailsCompo from "components/HelaDetailsCompo.vue";
import HelaSiteCompo from "components/HelaSiteCompo.vue";
import HelaStructure from "components/HelaStructure.vue";

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
    HelaStructure,
    HelaDetailsCompo,
    HelaSiteCompo,
  },
};
</script>

<style scoped>
/* 页面标题样式 */
.title {
  margin-left: 300px; /* 将标题向左平移300像素 */
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
  margin-right: 8px;
  text-align: center;
  color: white;
  font-size: 12px;
  line-height: 20px;
  font-weight: bold;
}


.gly-template {
  background-color: #ffaf32;
  border-radius: 50%; /* 设置圆角为50%，使其变为圆形 */
}

.structure-page{
  margin-bottom: 50px;
}
</style>
