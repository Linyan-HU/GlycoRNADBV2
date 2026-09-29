<template>
  <div class="details-table">
    <q-table
      class="table"
      :rows="mouseseqData"
      :columns="columns"
      row-key="transcriptID"
    />
    <div class="table-comment">
      Read sequence means the site of the glycosylation modification
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

export default {
  props: ['glycoRNAID'],
  setup(props) {
    const mouseseqData = ref([]); // 存储第二个表格的数据
    const columns = [
      { name: 'transcriptID', label: 'Transcript ID', align: 'center', field: 'transcriptID' },
      { name: 'readseq', label: 'Read Sequence', align: 'center', field: 'readseq' },
      { name: 'start', label: 'Start', align: 'center', field: 'start' },
      { name: 'end', label: 'End', align: 'center', field: 'end' },
      { name: 'readlength', label: 'Read Length', align: 'center', field: 'readlength' },
      { name: 'depth', label: 'Read Depth', align: 'center', field: 'depth' },
      { name: 'coverage', label: 'Read Coverage', align: 'center', field: 'coverage' }
    ];

    const fetchMouseData = async () => {
      try {
        if (!props.glycoRNAID) {
          console.error('glycoRNAID is undefined or null');
          return;
        }

        // 直接使用 glycoRNAID 调用后端接口获取 mouseseq 数据
        const response = await axios.get(`http://1.12.236.3:5000/musglyposition/${props.glycoRNAID}`);
        if (response.status === 200 && Array.isArray(response.data)) {
          mouseseqData.value = response.data;
        } else {
          console.error('Failed to fetch mouseseq data');
        }
      } catch (error) {
        console.error('Error fetching mouseseq data:', error);
      }
    };

    onMounted(fetchMouseData);
    watch(() => props.glycoRNAID, fetchMouseData);

    return {
      mouseseqData,
      columns
    };
  }
};
</script>





<style scoped>
.details-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.table {
  width: 70%; /* 设置表格宽度为父容器宽度的70% */
}

.bordered-image {
  border: 2px solid #617da7; /* 设置边框样式和颜色 */
  max-width: 800px; /* 限制图片的最大宽度 */
  max-height: 800px; /* 限制图片的最大高度 */
  margin-top: 80px; /* 设置顶部边距 */
}

.table-comment {
  margin-top: 10px; /* 调整注释文字与表格之间的间距 */
  text-align: left !important; /* 确保文字左对齐，并且具有高优先级 */
  font-style: italic; /* 可选：斜体样式 */
  color: #666; /* 可选：自定义颜色 */
}
</style>
