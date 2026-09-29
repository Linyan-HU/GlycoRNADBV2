<template>
  <div class="iframe-container">
    <h5 class="title">Find GlycoRNA Structure</h5>

    <div class="title2">
      <span>Possible glycosylation sites have been highlighted in the structure.</span>
    </div>


    <iframe :src="computedSvgSrc" allowfullscreen class="rdt"></iframe>
  </div>
</template>

<script>
export default {
  name: 'HumanStructure',
  props: {
    glycoRNAID: {
      type: String,
      required: true,
    },
  },
  computed: {
    computedHtmlSrc() {
      // 格式化文件名，确保按照 "0001.html" 这样的格式来加载文件
      return `/mouse/musglycoRNA${this.padWithZeros(this.glycoRNAID)}.html`;
    },
    computedSvgSrc() {
      // 格式化文件名，确保按照 "0001.svg" 这样的格式来加载文件
      return `/mouse-Result/${this.padWithZeros(this.glycoRNAID)}.svg`;
    },
  },
  methods: {
    padWithZeros(id) {
      // 将glycoRNAID转换为四位数的格式，例如把1转换成0001
      return String(id).padStart(4, '0');
    },
  },
};
</script>


<style scoped>
.iframe-container {
  margin-left: auto;
  margin-right: 25px;
  margin-top: 50px;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 950px;
}


iframe {
  display: block;
  margin-top: 40px;
  width: 600px;
  height: 700px;

}


.title2{
  margin-top: 2px;
  color: rgba(155, 28, 28, 0.99);
  font-size: 16px;
}

.rdt{
  display: block;
  height: 600px;
  transform: scale(1.3);
  transform-origin: top left;
}

</style>
