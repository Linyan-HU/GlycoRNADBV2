<template>
  <div>

    <div class="q-pa-md">
      <q-input
          outlined
          v-model.number="rpmThreshold"
          label="Filter by RPM"
          type="number"
          dense
          style="width: 250px;"
      />
    </div>

    <q-table
        title="GlycoRNA"
        :rows="filteredItems"
        :columns="columns"
        row-key="id"
        :visible-columns="visibleColumns"
        :rows-per-page-options="[15]"
        class="fixed-width-table"
        :filter="filter"
        :loading="loading"
    >
    </q-table>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue'


export default {
  props: {
    filterMethod: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true, // Reactive reference for loading state
      items: [],
      rpmThreshold: 0, // 默认不过滤
      columns: [
        { name: 'RNAname', label: 'RNA Name', align: 'left', field: 'RNAname' },
        { name: 'RNAtype', label: 'RNA type', align: 'left', field: 'RNAtype' },
        { name: 'pMN_WGA', label: 'pMN_WGA', align: 'left', field: 'pMN_WGA' },
        { name: 'pMN_Input', label: 'pMN_Input', align: 'left', field: 'pMN_Input' },
        { name: 'DiffHoxB8_BioPNG', label: 'DiffHoxB8_BioPNG', align: 'left', field: 'DiffHoxB8_BioPNG' },
        { name: 'DiffHoxB8_WGA', label: 'DiffHoxB8_WGA', align: 'left', field: 'DiffHoxB8_WGA' },
        { name: 'DiffHoxB8_Bio', label: 'DiffHoxB8_Bio', align: 'left', field: 'DiffHoxB8_Bio' },
        { name: 'DiffHoxB8_Input', label: 'DiffHoxB8_Input', align: 'left', field: 'DiffHoxB8_Input' },
        { name: 'HoxB8_WGA', label: 'HoxB8_WGA', align: 'left', field: 'HoxB8_WGA' },
        { name: 'HoxB8_Bio', label: 'HoxB8_Bio', align: 'left', field: 'HoxB8_Bio' },
        { name: 'HoxB8_Input', label: 'HoxB8_Input', align: 'left', field: 'HoxB8_Input' },
        { name: 'pMN_WGA_vs_pMN_Inputenriched', label: 'pMN_WGA_vs_pMN_Inputenriched', align: 'left', field: 'pMN_WGA_vs_pMN_Inputenriched' },
        { name: 'HoxB8_Bio_vs_HoxB8_Inputenriched', label: 'HoxB8_Bio_vs_HoxB8_Inputenriched', align: 'left', field: 'HoxB8_Bio_vs_HoxB8_Inputenriched' },
        { name: 'HoxB8_WGA_vs_HoxB8_Inputenriched', label: 'HoxB8_WGA_vs_HoxB8_Inputenriched', align: 'left', field: 'HoxB8_WGA_vs_HoxB8_Inputenriched' },
        { name: 'DiffHoxB8_Bio_vs_DiffHoxB8_Inputenriched', label: 'DiffHoxB8_Bio_vs_DiffHoxB8_Inputenriched', align: 'left', field: 'DiffHoxB8_Bio_vs_DiffHoxB8_Inputenriched' },
        { name: 'DiffHoxB8_WGA_vs_DiffHoxB8_Inputenriched', label: 'DiffHoxB8_WGA_vs_DiffHoxB8_Inputenriched', align: 'left', field: 'DiffHoxB8_WGA_vs_DiffHoxB8_Inputenriched' },
        { name: 'DiffHoxB8_BioPNG_vs_DiffHoxB8_Inputenriched', label: 'DiffHoxB8_BioPNG_vs_DiffHoxB8_Inputenriched BioPNG', align: 'left', field: 'DiffHoxB8_BioPNG_vs_DiffHoxB8_Inputenriched' },

      ],
      visibleColumns: [
        'RNAname','RNAtype', 'pMN_WGA_vs_pMN_Inputenriched', 'HoxB8_Bio_vs_HoxB8_Inputenriched', 'HoxB8_WGA_vs_HoxB8_Inputenriched',
        'DiffHoxB8_Bio_vs_DiffHoxB8_Inputenriched', 'DiffHoxB8_WGA_vs_DiffHoxB8_Inputenriched','DiffHoxB8_BioPNG_vs_DiffHoxB8_Inputenriched',
        'pMN_WGA','DiffHoxB8_BioPNG','DiffHoxB8_WGA','DiffHoxB8_Bio','pMN_Input','DiffHoxB8_Input','HoxB8_WGA','HoxB8_Bio','HoxB8_Input'
      ],
      filter: '',
    };
  },
  computed: {
    filteredItems() {
      let data = this.items;

      // 根据 RNA 类型过滤（已有）
      if (this.filterMethod) {
        data = data.filter(item => item.RNAtype === this.filterMethod);
      }

      // 根据 RPM 阈值过滤
      if (this.rpmThreshold > 0) {
        const rpmCols = [
          'pMN_WGA', 'pMN_Input',
          'DiffHoxB8_BioPNG', 'DiffHoxB8_WGA', 'DiffHoxB8_Bio',
          'DiffHoxB8_Input', 'HoxB8_WGA', 'HoxB8_Bio', 'HoxB8_Input'
        ];

        data = data.filter(row => {
          return rpmCols.some(col => parseFloat(row[col]) > this.rpmThreshold);
        });
      }

      return data;
    }
  },
  mounted() {
    // 发送 GET 请求获取数据
    axios.get('http://1.12.236.3:5000/mouseexp')
        .then(response => {
          this.items = response.data.map(row => {
            const boolCols = [
              'pMN_WGA_vs_pMN_Inputenriched',
              'HoxB8_Bio_vs_HoxB8_Inputenriched',
              'HoxB8_WGA_vs_HoxB8_Inputenriched',
              'DiffHoxB8_Bio_vs_DiffHoxB8_Inputenriched',
              'DiffHoxB8_WGA_vs_DiffHoxB8_Inputenriched',
              'DiffHoxB8_BioPNG_vs_DiffHoxB8_Inputenriched'
            ];
            boolCols.forEach(col => {
              row[col] = row[col] == 1 ? 'TRUE' : row[col] == 0 ? 'FALSE' : row[col];
            });
            return row;
          });
          this.loading = false;
        });
  },
};
</script>

<style scoped>

.fixed-width-table {
  width: 100%;
  margin: 0 auto;
}
</style>



