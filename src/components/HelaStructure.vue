<template>
  <div class="iframe-container">
    <h5 class="title">Possible glycosylation sites in HeLa</h5>

    <div class="title2" style="display: flex; align-items: center; gap: 8px;">
      <span>RT stops indicating potential glycosylation sites are highlighted by</span>
      <span class="color-box gly-template"></span>
      <span>in the structure.</span>
    </div>


    <!-- 新增下载按钮 -->
    <button v-if="structureFound" @click="downloadSVG">Download SVG</button>

    <iframe
        v-if="structureFound"
        :src="`/Result_HeLa/${transcriptID}.svg`"
        allowfullscreen
        class="rdt"
    ></iframe>

    <div v-else class="notfound">
      No Detected Reads in this RNA
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'HelaStructure',
  props: {
    glycoRNAID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      transcriptID: '',
      structureFound: false, // 新增标志
    };
  },
  mounted() {
    this.fetchSourceID(this.glycoRNAID);
  },
  methods: {
    async fetchSourceID(glycoRNAID) {
      try {
        const response = await axios.get(`http://1.12.236.3:5000/get_transcriptID/${glycoRNAID}`)
        this.transcriptID = response.data.transcriptID
        // 调用检查文件存在性
        await this.checkSVGExists();
      } catch (error) {
        console.error("Failed to fetch transcriptID:", error);
        this.structureFound = false;
      }
    },

    async checkSVGExists() {
      try {
        // 用 HEAD 或 GET 请求检查文件
        const fileUrl = `/Result_HeLa/${this.transcriptID}.svg`;
        const res = await fetch(fileUrl, { method: "HEAD" });
        if (res.ok) {
          this.structureFound = true;
        } else {
          this.structureFound = false;
        }
      } catch (error) {
        this.structureFound = false;
      }
    },

    downloadSVG() {
      // 构造文件地址
      const fileUrl = `/Result_HeLa/${this.transcriptID}.svg`

      // 创建隐藏的<a>标签
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = `${this.transcriptID}.svg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
};
</script>




<style scoped>
.iframe-container {
  margin-left: 300px;
  margin-right: 25px;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 1000px;
}


iframe {
  display: block;
  margin-top: 30px;

  width: 1000px;
  height: 700px;

}


.title2{
  margin-top: 2px;
  color: rgba(155, 28, 28, 0.99);
  font-size: 16px;
}

.rdt{
  transform: scale(0.6);
  transform-origin: top left;
  width: 120%;
  height: 1400px;
}

button {
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #1557d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0e3e99;
}


.notfound {
  display: inline-block;
  padding: 5rem 6rem;  /* 上下1rem，左右2rem */
  margin-left: 300px;
  font-size: 30px;       /* 文字大一些 */
  font-weight: bold;     /* 加粗 */
  color: #0c0b0b;        /* 可以换成你喜欢的颜色，比如红色 */
  width: 500px;
  margin-top: 200px;      /* 上方间距 */
  border: 2px solid #1963ad;  /* 加边框 */
  border-radius: 8px;         /* 圆角边框 */
  background-color: #f5f7ff;  /* 淡淡的背景色（可选） */
  box-shadow: 0 0 8px rgba(198, 53, 40, 0.2); /* 轻微阴影让它更突出 */
}

.color-box {
  display: inline-block;  /* 确保是行内块元素 */
  width: 20px;            /* 宽度 */
  height: 20px;           /* 高度 */
  border: 1px solid #000; /* 让边框清晰可见，可选 */
  margin-right: 4px;      /* 与文字有点间距 */
}

.gly-template {
  background-color: #ffaf32;
  border-radius: 50%;
}
</style>
