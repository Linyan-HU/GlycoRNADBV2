<template>
  <div class="structure-page">
    <h5 class="title">Human glycoRNA Detailed Information</h5>
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


    <q-btn label="Go To See More HeLa Site Information" @click="openHelaStructure" class="custom-link" icon="send" />




    <H9Structure :glycoRNAID="glycoRNAID" />



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

    <q-btn label="Go To See More H9 Site Information" @click="openH9Structure" class="custom-link" icon="send" />

  </div>
</template>

<script>
import HelaDetailsCompo from "components/HelaDetailsCompo.vue";
import HelaSiteCompo from "components/HelaSiteCompo.vue";
import HelaStructure from "components/HelaStructure.vue";

import H9SiteCompo from "components/H9SiteCompo.vue";
import H9Structure from "components/H9Structure.vue";
const glycoRNAID = '1'; // 动态获取即可

export default {
  data() {
    return {
      glycoRNAID: null,
    };
  },
  created() {
    this.glycoRNAID = this.$route.params.glycoRNAID;
  },
  methods: {
    openHelaStructure() {
      if (this.glycoRNAID) {
        const url = `${window.location.origin}/#/helastructure/${this.glycoRNAID}`;
        window.open(url, '_blank');
      } else {
        console.warn('glycoRNAID is not set');
      }
    },

    openH9Structure() {
      if (this.glycoRNAID) {
        const url = `${window.location.origin}/#/h9structure/${this.glycoRNAID}`;
        window.open(url, '_blank');
      } else {
        console.warn('glycoRNAID is not set');
      }
    }

  },
  components: {
    H9Structure,
    HelaStructure,
    HelaDetailsCompo,

  }
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

/* 定义颜色 */
.same-template {
  background-color: #0c0b0b; /* 绿色 */
}

.modified-template {
  background-color: #50ff61; /* 橙色 */
}



.gly-template {
  background-color: #ffaf32; /* 红色 */
  border-radius: 50%; /* 设置圆角为50%，使其变为圆形 */
}

.structure-page{
  margin-bottom: 50px;
}

.custom-link{
  margin-left: 300px;
  margin-top: 50px;
  margin-bottom: 30px;
  background: #f9a825;
}

</style>
