<template>
  <div class="q-pa-md" style="margin-top: 20px;">
    <div class="q-pa-md">
      <q-table
        title="GlycoRNA"
        :rows="filteredTableData"
        :columns="columns"
        row-key="glycoRNAID"
        :rows-per-page-options="[15]"
        :visible-columns="visibleColumns"
        class="fixed-width-table"
        :filter="filter"
        :loading="loading"
        v-model::pagination="pagination"
        :sort-method="() => 0"

      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="th-search-container"
              style="padding-bottom: 20px; font-size: 15px; "
            >
              <template v-slot:default>
                <div class="th-label">{{ col.label }}</div>
                <div class="th-input-container" style="margin-left: 10px; display: flex; align-items: center; justify-content: center;">
                  <q-input
                    v-model="filters[col.field]"
                    outlined
                    dense
                    placeholder="Search"
                    clearable

                    style="width: 150px; max-width: 150px; height: 30px; align-items: center;"
                  />
                </div>
              </template>
            </q-th>
          </q-tr>
        </template>

        <template v-slot:top="props">
          <div class="col-2 q-table__title">Human GlycoRNA</div>
          <q-space />

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </template>

        <!-- 表格列和过滤器 -->
        <template v-for="(column, index) in columns" :key="index">
          <template v-if="column.field !== 'glycoRNAID'">
            <q-th style="font-size: 30px !important;">
              <div class="column-label">{{ column.label }}</div>
              <q-input v-model="filters[column.field]" dense outlined placeholder="Filter" clearable @input="applyFilters" />
            </q-th>
          </template>
        </template>

        <!-- 表格数据 -->
        <template v-for="(column, index) in columns" :key="index">
          <template v-if="column.field !== 'glycoRNAID'">
            <q-td>{{ column.field }}</q-td>
          </template>
        </template>

        <template v-slot:body-cell-glycoRNAID="{ row, props }">
          <q-td :props="props" class="text-center">
            <router-link
                :to="{ name: 'HomoDetailPage', params: { glycoRNAID: row.glycoRNAID }}"
                class="custom-link"
                target="_blank"
                rel="noopener"
            >
              {{ String(row.glycoRNAID) }}
            </router-link>
          </q-td>
        </template>

        <template v-slot:body-cell-glyname="{ row, props }">
          <q-td :props="props" class="text-center">
            {{ row.glyname }}
          </q-td>
        </template>

        <template v-slot:body-cell-H9RT="{ row, props }">
          <q-td :props="props" class="text-center">
            <router-link
                :to="{ name: 'H9DetailPage', params: { glycoRNAID: row.glycoRNAID }}"
                class="custom-link"
                target="_blank"
                rel="noopener"
            >
              {{ row.H9RT }}
            </router-link>
          </q-td>
        </template>

        <template v-slot:body-cell-HeLaRT="{ row, props }">
          <q-td :props="props" class="text-center">
            <router-link
                :to="{ name: 'HeLaDetailPage', params: { glycoRNAID: row.glycoRNAID }}"
                class="custom-link"
                target="_blank"
                rel="noopener"
            >
              {{ row.HeLaRT }}
            </router-link>
          </q-td>
        </template>



        <template v-slot:body-cell-position="{ row, props }">
          <q-td :props="props" @click="goToGenomeLocation(row.position)">
            <div>
              <q-btn
                  :label="row.position"
                  :class="{'clicked': selectedPosition === row.position}"

                  text-color="black"
                  style="text-transform: none;"
              />
            </div>
            <div class="my-table-details">
              {{ row.details }}
            </div>
          </q-td>
        </template>


        <template v-slot:body-cell-name="{ row, props }">
          <q-td :props="props" class="text-center">
            {{ formatName(row.name) }}
          </q-td>
        </template>

        <template v-slot:body-cell-transcriptID="{ row, props }">
          <q-td :props="props" class="text-center">
            {{ row.transcriptID }}
          </q-td>
        </template>

        <!-- 使用 body-cell 插槽自定义 sourceID 列的内容 -->
        <template v-slot:body-cell-sourceID="{ row, props }">
          <q-td :props="props">
            <!-- 生成链接 -->
            <a :href="generateLink(row.sourceID)" target="_blank" class="id-link">{{ row.sourceID }}</a>
          </q-td>
        </template>

        <template v-slot:body-cell-description="{ row, props }">
          <q-td :props="props">
            {{ row.description }}
          </q-td>
        </template>

        <template v-slot:body-cell-type="{ row, props }">
          <q-td :props="props" class="text-center">
            {{ row.type }}
          </q-td>
        </template>

        <template v-slot:body-cell-sourceDB="{ row, props }">
          <q-td :props="props">
            {{ row.sourceDB }}
          </q-td>
        </template>

        <template v-slot:body-cell-EnsemblName="{ row, props }">
          <q-td :props="props">
            {{ row.EnsemblName }}
          </q-td>
        </template>


        <template v-slot:body-cell-datasourcre="{ row, props }">
          <q-td :props="props">
            <a
                :href="`https://pubmed.ncbi.nlm.nih.gov/${row.datasourcre.replace(/^PMID:/, '')}/`"
                target="_blank"
                rel="noopener noreferrer"
            >
              {{ row.datasourcre }}
            </a>
          </q-td>
        </template>




        <!-- 渲染搜索框和相应的列 -->
        <template v-for="(column, index) in filteredColumns" :key="index">
          <template v-if="column.field !== 'glycoRNAID'">
            <div :key="`search-${index}`">
              <q-td :props="props">
                <q-input v-model="filters[column.field]" dense outlined placeholder="Search" clearable @input="applyFilters" />
              </q-td>
            </div>
          </template>
        </template>

      </q-table>

      <q-card class="q-pa-sm q-mb-md custom-card" style="margin-top: 20px; background: #deedff;">
        <div class="card-content">
          <h5 class="card-title" style="margin-left: 20px; margin-bottom: 10px;">Guide to Use GlycoRNA Table</h5>
          <p style="font-size: larger; margin-left: 20px; margin-top: 10px;">In this table we show all possible candidate glycoRNAs, the source of the data is HeLa and H9 cells (GSE136967):</p>
          <ul>
            <li><strong style="color: red">GlycoRNA ID</strong>: We give each candidate glycoRNA a unique ID for easy search.</li>
            <li><strong style="color: red">Position</strong>: The location of the RNA on the genome.<strong>You can click here to link to the Jbrowse page to see the genomic location of the RNA.</strong></li>
            <li><strong style="color: red">Type</strong>: Types of the RNA.Including ncRNAs( tRNA, snoRNA, snRNA, rRNA, miRNA, pre-miRNA, scaRNA, Y_RNA) and lncRNAs. </li>
            <li><strong style="color: red">RNA Central Name</strong>: The name of the RNA in RNA Central, and is also description of the RNA, making it easy to identify them.</li>
            <li><strong style="color: red">RT Stops in H9</strong>: Number of RT stop sites on each RNA detected in the H9 cell line.</li>
            <li><strong style="color: red">RT Stops in HeLa</strong>: Number of RT stop sites on each RNA detected in the HeLa cell line.</li>
            <strong style="color: rgba(255,0,0,0.53)">You can click both RT Stops to link to a page with detailed information about this RNA, where we have also drawn the structure of the RNA and highlighted the sites with glycosylation modifications in different celline.</strong>
            <li><strong style="color: red">Ensembl Name</strong>: Annotation of this RNA name in Ensembl.</li>
            <li><strong style="color: red">Source ID</strong>: The ID of RNA Central is shown here, and you can click here to jump to RNA Central.</li>
            <li><strong style="color: red">Transcript ID</strong>: Which transcript does it belong to?</li>
          </ul>
        </div>
      </q-card>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const LOCAL_KEY = 'glyco_overview_pagination'
    const loading = ref(true); // Reactive reference for loading state
    const tableData = ref([]);
    const columns = [
      { name: 'glycoRNAID', label: 'GlycoRNA ID', align: 'center', field: 'glycoRNAID' },

      { name: 'position', label: 'Position', align: 'center', field: 'position' },
      { name: 'type', label: 'Type', align: 'center', field: 'type' },

      { name: 'glyname', label: 'GlycoRNA DB Name', align: 'center', field: 'glyname' },
      { name: 'H9RT', label: 'RT Stops in H9', align: 'center', field: 'H9RT' },
      { name: 'HeLaRT', label: 'RT Stops in HeLa', align: 'center', field: 'HeLaRT' },
      { name: 'name', label: 'RNA Central Name', align: 'center', field: 'name' },
      { name: 'EnsemblName', label: 'Ensembl Name', align: 'center', field: 'EnsemblName' },
      { name: 'sourceID', label: 'SourceID', align: 'center', field: 'sourceID' },
      { name: 'transcriptID', label: 'transcriptID', align: 'center', field: 'transcriptID' },

      { name: 'datasourcre', label: 'Data source', align: 'center', field: 'datasourcre' },
    ];
    const visibleColumns = [
      'glycoRNAID', 'position', 'sourceID', 'type', 'sourceDB', 'transcriptID', 'name', 'H9RT', 'HeLaRT', 'EnsemblName', 'glyname', 'datasourcre'
    ];
    const filters = ref({}); // 用于存储每一列的过滤器值
    const filter = ref('');

    const fetchData = async () => {
      try {
        const response = await axios.get('http://1.12.236.3:5000/data');
        tableData.value = response.data;
        this.loading = false; // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        loading.value = false; // Set loading to false after data is fetched (success or failure)
      }
    };


    const filteredTableData = computed(() => {
      if (!Array.isArray(tableData.value)) return [];

      return tableData.value.filter(row => {
        return columns.every(column => {
          const input = filters.value[column.field];
          if (!input) return true;

          const cellValue = String(row[column.field]).toLowerCase();

          // 如果是 glycoRNAID 列，使用更严格的正则
          if (column.field === 'glycoRNAID') {
            const numPattern = /^\d+$/;
            if (numPattern.test(input)) {
              // 匹配 -14 或 -14a，但不能匹配 -140 等
              return new RegExp(`-${input}[a-zA-Z]?\\b`).test(cellValue);
            } else {
              return cellValue.includes(input.toLowerCase());
            }
          }

          return cellValue.includes(input.toLowerCase());
        });
      });
    });


    onMounted(() => {
      fetchData();
    });
    /* ---------- 分页：初始化时先读 localStorage ---------- */
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY))
    const pagination = ref(
        saved || { sortBy: 'glycoRNAID', descending: false, page: 1, rowsPerPage: 15 }
    )

    /* ---------- 如果有 ?returnPage= 覆盖页码 ---------- */
    const route = useRoute()
    onMounted(() => {
      const p = parseInt(route.query.returnPage)
      if (!isNaN(p)) pagination.value.page = p
      fetchData()          // 拉数据
    })

    /* ---------- 每次分页变化存 localStorage ---------- */
    watch(
        pagination,
        val => localStorage.setItem(LOCAL_KEY, JSON.stringify(val)),
        { deep: true }
    )

    // link to Jbrowse
    const goToGenomeLocation = (position) => {
      const formatNumber = (number) => {
        // Ensure that the number is an integer and format with commas (e.g., 1000000 => 1,000,000)
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      const regex = /chr(\d+|X|Y|M):(\d+)-(\d+)(\((-?\d+)\))?/i;
      const match = position.match(regex);

      if (match) {
        const chromosome = `chr${match[1]}`;  // 获取染色体编号
        const start = formatNumber(match[2]);  // 格式化起始位置
        const end = formatNumber(match[3]);  // 格式化结束位置

        // 格式化位置字符串，确保位置参数符合 JBrowser 的要求
        const formattedLocation = `${chromosome}:${start.replace(/,/g, '')}..${end.replace(/,/g, '')}`;

        // 打印传递的 formattedLocation，以确保它符合预期
        console.log(`Formatted Location: ${formattedLocation}`);

        // 跳转到 JBrowser 页面，传递格式化的位置信息
        const routeData = router.resolve({
          name: 'JBrowserPage',
          query: {
            location: formattedLocation,
            returnPage: pagination.value.page
          }
        })
// 新开标签页
        window.open(routeData.href, '_blank')

      }
    };


    const generateLink = (sourceID) => {
      // 根据 sourceID 生成链接
      const parts = sourceID.split('_');
      const url = `https://rnacentral.org/rna/${parts[0]}/${parts[1]}`;
      return url;
    };

    const router = useRouter(); // 使用 useRouter 获取路由实例

    const goToH9StructurePage = () => {
      router.push({ name: 'H9DetailPage' }); // 跳转到名为 'StructurePage' 的页面
    };

    const goToHeLaStructurePage = () => {
      router.push({ name: 'HeLaDetailPage' }); // 跳转到名为 'StructurePage' 的页面
    };

    const goToHomoStructurePage = () => {
      router.push({ name: 'HomoDetailPage' }); // 跳转到名为 'StructurePage' 的页面
    };

    const formatName = (name) => {
      return name.replace(/%2C/g, ',');
    };

    return {
      loading,
      tableData,
      columns,
      visibleColumns,
      filters,
      filter,
      generateLink,
      filteredTableData,
      goToH9StructurePage,
      goToHomoStructurePage,
      formatName,
      goToHeLaStructurePage,
      goToGenomeLocation,
      pagination,
    };
  },
};
</script>

<style scoped>

.fixed-width-table .q-table .q-th,
.fixed-width-table .q-table .q-td {
  width: 150px;

  border-right: 1px solid #ccc; /* 添加竖直分隔线 */
  border-bottom: 1px solid #ccc; /* 添加水平分隔线 */
}

.fixed-width-table .q-table .q-th,
.fixed-width-table .q-table .q-td {
  font-size: 15px; /* 调整表格中字体的大小 */
}

.fixed-width-table .q-table .q-th:last-child,
.fixed-width-table .q-table .q-td:last-child {
  border-right: none; /* 移除每行最后一个单元格的竖直分隔线 */
}

.fixed-width-table .q-table .q-tr:last-child .q-td {
  border-bottom: none; /* 移除最后一行的水平分隔线 */
}

/* 自定义链接样式 */
.id-link {
  color: #487dc2;
  font-size: 15px;
  text-decoration: none; /* 去掉下划线 */
}

.id-link:hover {
    text-decoration: underline;
}

/* 自定义单元格样式 */
.my-table-details {
  font-size: 15px;
  color: #666;
  margin-top: 2px;
}

.column-label {
  font-size: 30px;
}

.q-table th.filter-th {
  font-size: 30px !important;
}

.custom-link {
  color: #eaa05e; /* 蓝色 */
  font-weight: bold; /* 加粗 */
  text-decoration: none; /* 去掉下划线 */
  transition: color 0.3s ease; /* 添加过渡效果 */
}

.custom-link:hover {
  color: #674507; /* 悬停时颜色更深 */
  text-decoration: underline; /* 悬停时添加下划线 */
}


</style>

