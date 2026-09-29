<template>
  <div>
    <!-- 搜索框 -->
    <q-input
        v-model="filter"
        label="Search"
        filled
        dense
        class="q-mb-md"
        debounce="300"
    />

    <!-- 主表格 -->
    <q-table
        title="GlycoRNA"
        :rows="filteredItems"
        :columns="columns"
        row-key="ID"
        :visible-columns="visibleColumns"
        :rows-per-page-options="[15, 30, 50]"
        :filter="filter"
        :loading="loading"
        class="fixed-width-table"
        v-model:pagination="pagination"
    >
      <!-- 可点击的 RNAID -->
      <template #body-cell-RNAID="props">
        <q-td :props="props">
          <q-btn
              flat
              dense
              color="primary"
              @click="goToStructure(props.row.ID)"
          >
            {{ props.row.ID }}
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import axios from 'axios';
import { computed } from 'vue'


/* -------------------- 表格列 -------------------- */
const columns = [
  { name: 'RNAID', label: 'RNA ID', field: 'ID', align: 'left', sortable: true },
  { name: 'RNAtype', label: 'RNA type', field: 'RNAtype', align: 'left', sortable: true },
  { name: 'RNAname', label: 'RNA name', field: 'BED_Col9', align: 'left', sortable: true },
  { name: 'HeLa_logFC', label: 'HeLa_logFC', field: 'HeLa_logFC', align: 'right', sortable: true },
  { name: 'HeLa_Input', label: 'HeLa_Input', field: 'HeLa_Input', align: 'right', sortable: true },
  { name: 'HeLa_Input_RPM', label: 'HeLa_Input_RPM', field: 'HeLa_Input_RPM', align: 'right', sortable: true },
  { name: 'HeLa_Enriched', label: 'HeLa_Enriched', field: 'HeLa_Enriched', align: 'right', sortable: true },
  { name: 'HeLa_Enriched_RPM', label: 'HeLa_Enriched_RPM', field: 'HeLa_Enriched_RPM', align: 'right', sortable: true },
  { name: 'H9_logFC', label: 'H9_logFC', field: 'H9_logFC', align: 'right', sortable: true },
  { name: 'H9_Input', label: 'H9_Input', field: 'H9_Input', align: 'right', sortable: true },
  { name: 'H9_Input_RPM', label: 'H9_Input_RPM', field: 'H9_Input_RPM', align: 'right', sortable: true },
  { name: 'H9_Enriched', label: 'H9_Enriched', field: 'H9_Enriched', align: 'right', sortable: true },
  { name: 'H9_Enriched_RPM', label: 'H9_Enriched_RPM', field: 'H9_Enriched_RPM', align: 'right', sortable: true }
];

const visibleColumns = columns.map(c => c.name);

/* -------------------- 状态 -------------------- */
const $q = useQuasar();
const router = useRouter();
const loading = ref(true);
const items = ref([]);
const filter = ref(localStorage.getItem('tableFilter') || '');

/* 恢复分页状态 */
const pagination = ref(
    JSON.parse(localStorage.getItem('tablePagination') || '{}') || {
      page: 1,
      rowsPerPage: 15,
      sortBy: '',
      descending: false
    }
);

/* -------------------- 过滤 (示例保留原逻辑，可按需筛 method 等) -------------------- */
const route = useRoute();
const filterMethod = route.query.method || ''; // 如果需要通过 URL 传 filter
const filteredItems = computed(() =>
    filterMethod ? items.value.filter(r => r.method === filterMethod) : items.value
);

/* -------------------- 监听并持久化分页/搜索 -------------------- */
watch(pagination, val => {
  localStorage.setItem('tablePagination', JSON.stringify(val));
});
watch(filter, val => {
  localStorage.setItem('tableFilter', val);
});

/* -------------------- 获取数据 -------------------- */
onMounted(() => {
  axios
      .get('http://1.12.236.3:5000/humanexp')
      .then(res => {
        items.value = res.data;
      })
      .catch(err => {
        console.error(err);
        $q.notify({ type: 'negative', message: '数据获取失败' });
      })
      .finally(() => (loading.value = false));
});

/* -------------------- 点击跳转 -------------------- */
function goToStructure(transcriptID) {
  axios
      .get(`http://1.12.236.3:5000/get_glycoRNAID/${transcriptID}`)
      .then(res => {
        const id = res.data?.glycoRNAID;
        if (id) {
          router.push(`/helastructure/${id}`);
        } else {
          $q.notify({ type: 'warning', message: '未找到对应 glycoRNAID' });
        }
      })
      .catch(() => $q.notify({ type: 'negative', message: '请求失败' }));
}
</script>

<style scoped>
.fixed-width-table {
  width: 115%;
}
</style>
