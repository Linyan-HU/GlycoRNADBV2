<template>
  <div class="details-table">
    <q-table
        class="table"
        :rows="humnseqData"
        :columns="columns"
        row-key="transcriptID"
        binary-state-sort
        :sort-method="customSort"
        v-model:pagination="pagination"
    >
      <template v-slot:body-cell-location="props">
        <q-td
            :props="props"
            class="clickable-cell"
            @click.stop="goToGenomeLocation(props.row)"
        >
          {{ props.row.chromosome }}: {{ props.row.start }} - {{ props.row.end }}
        </q-td>
      </template>


    </q-table>

    <div class="table-comment">
      Detected RT stop sites of glycoRNAs during sequencing
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

export default {
  props: ['glycoRNAID'],
  setup(props) {
    const humnseqData = ref([]); // 存储第二个表格的数据

    const LOCAL_STORAGE_KEY = 'h9gly_position_table_pagination'

    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    const pagination = ref(
        saved || {
          sortBy: 'log2FC',
          descending: true,
          page: 1,
          rowsPerPage: 10
        }
    )

    const router = useRouter()
    const route  = useRoute()

    const columns = [
      { name: 'transcriptID', label: 'Transcript ID', align: 'center', field: 'transcriptID' },
      {
        name: 'location',
        label: 'Location',
        align: 'center',
        // 这里用一个函数拼接三列成一个字符串
        field: row => `${row.chromosome}:${row.start} - ${row.end}`,
        classes: 'clickable-cell'
      },
      { name: 'inputread', label: 'Input Read', align: 'center', field: 'inputread', sortable: true, sort: (a, b) => parseFloat(a) - parseFloat(b) },
      { name: 'inputRPM', label: 'Input RPM', align: 'center', field: 'inputRPM', sortable: true, sort: (a, b) => parseFloat(a) - parseFloat(b) },
      { name: 'enrichedread', label: 'Enriched Read', align: 'center', field: 'enrichedread', sortable: true, sort: (a, b) => parseFloat(a) - parseFloat(b) },
      { name: 'enrichedRPM', label: 'Enriched RPM', align: 'center', field: 'enrichedRPM', sortable: true, sort: (a, b) => parseFloat(a) - parseFloat(b) },
      { name: 'log2FC', label: 'log2 Fold Change', align: 'center', field: 'log2FC', sortable: true, sort: (a, b) => parseFloat(a) - parseFloat(b) },
      { name: 'input_coverage', label: 'Input coverage', align: 'center', field: 'input_coverage', sortable: true, sort: (a, b) => parseFloat(a) - parseFloat(b) },
      { name: 'enriched_coverage', label: 'Enriched Coverage', align: 'center', field: 'enriched_coverage', sortable: true, sort: (a, b) => parseFloat(a) - parseFloat(b) },
      { name: 'sequence', label: 'Sequence', align: 'center', field: 'sequence', sortable: true, sort: (a, b) => parseFloat(a) - parseFloat(b) },
    ];

    const customSort = (rows, sortBy, descending) => {
      const data = [...rows];

      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a;
          const y = descending ? a : b;

          // 字段是字符串类型就按字符串排序，否则按数值排序
          if (typeof x[sortBy] === 'string' && isNaN(parseFloat(x[sortBy]))) {
            return x[sortBy].localeCompare(y[sortBy]);
          } else {
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy]);
          }
        });
      }

      return data;
    };

    const fetchHumanqData = async () => {
      try {
        if (!props.glycoRNAID) {
          console.error('glycoRNAID is undefined or null');
          return;
        }

        // 直接使用 glycoRNAID 调用后端接口获取 mouseseq 数据
        const response = await axios.get(`http://1.12.236.3:5000/h9glyposition/${props.glycoRNAID}`);
        if (response.status === 200 && Array.isArray(response.data)) {
          humnseqData.value = response.data; // 将获取到的所有数据存储在 humnseqData 中
        } else {
          console.error('Failed to fetch humanseq data');
        }
      } catch (error) {
        console.error('Error fetching humanseq data:', error);
      }
    };

    /* ------------ 挂载时：恢复分页并拉数据 ------------ */
    onMounted(() => {
      // 1) 若 URL 带 returnPage，用它覆盖
      const p = parseInt(route.query.returnPage)
      if (!isNaN(p)) {
        pagination.value.page = p
      }

      // 2) 拉数据
      fetchHumanqData()
    })

    /* ------------ 监听 glycoRNAID 变化重新拉数据 ------------ */
    watch(
        () => props.glycoRNAID,
        () => {
          // 如想切回第一页，可取消注释下一行
          // pagination.value.page = 1
          fetchHumanqData()
        }
    )

    /* ------------ 监听分页并持久化到 localStorage ------------ */
    watch(
        pagination,
        val => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(val)),
        { deep: true }
    )

    const goToGenomeLocation = (row) => {
      if (!row || !row.chromosome) {
        console.error('Missing chromosome field in row:', row);
        return;
      }

      const chr = row.chromosome.startsWith('chr') ? row.chromosome : `chr${row.chromosome}`;
      const start = parseInt(row.start);
      const end = parseInt(row.end);
      const location = `${chr}:${start}..${end}`;

      // 使用 window.open 打开新标签页
      const url = router.resolve({ name: 'JBrowserPage', query: { location } }).href;
      window.open(url, '_blank');
    };


    return {
      humnseqData,
      columns,
      customSort,
      pagination,
      goToGenomeLocation
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

.clickable-cell {
  color: #0d5ea8;       /* 蓝色 */
  cursor: pointer;
  text-decoration: underline;
}

.clickable-cell:hover {
  color: #052954;       /* 深蓝 */
}
</style>

