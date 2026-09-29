<template>
  <div>
    <!-- 搜索框 -->
    <q-input
        filled
        dense
        debounce="300"
        v-model="filter"
        label="Search"
        class="q-mb-md"
        clearable
        clear-icon="close"
        style="width: 95%; margin-left: 40px; margin-top: 20px"
    />


    <q-table
        :rows="tableData"
        :columns="columns"
        row-key="id"
        class="fixed-width-table"
        :rows-per-page-options="[10]"
        :loading="loading"
        :filter="filter"
    >
    <template v-slot:body-cell-picture="props">
      <q-td :props="props">
        <q-btn @click="openImageDialog(props.row.picture)" label="Load Images" color="primary" />
      </q-td>
    </template>
    </q-table>

    <!-- Dialog for displaying images -->
    <q-dialog v-model="dialog" persistent class="custom-dialog">
      <q-card style="min-width: 800px; max-width: 1200px; position: relative;">
        <q-btn
            icon="close"
            dense
            flat
            round
            color="grey-7"
            style="position: absolute; top: 8px; right: 8px; z-index: 10;"
            @click="dialog = false"
        />
        <q-card-section>
          <div class="image-container">
            <div v-for="image in imageList" :key="image" class="image-item">
              <img :src="image" class="loaded-image" />
            </div>
          </div>
        </q-card-section>
        <div class="header-image-container text-center">
          <q-img src="icons/glystructure.png" alt="Header Image" class="header-img" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>




<script>
export default {
  props: {
    tissue: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tableData: [],
      imageList: [], // To store the list of image URLs
      filter: '',        // 搜索关键词
      columns: [
        { name: 'SpectrumIndex', required: true, label: 'SpectrumIndex', align: 'left', field: row => row.SpectrumIndex },
        { name: 'MolFormula', label: 'MolFormula', align: 'left', field: row => row.MolFormula },
        { name: 'Composition', required: true, label: 'Composition', align: 'left', field: row => row.Composition },
        { name: 'Linkage', label: 'Linkage', align: 'left', field: row => row.Linkage },
        { name: 'picture', required: true, label: 'gly-information', align: 'left', field: row => row.picture }
      ],
      loading: false,
      dialog: false // 控制弹框状态
    };
  },
  watch: {
    tissue: 'fetchData'
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const response = await fetch(`http://1.12.236.3:5000/get_tissue_data?tissue=${this.tissue.toLowerCase()}`);
        const data = await response.json();
        this.tableData = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    openImageDialog(pictureName) {
      this.imageList = []; // 清空现有图片
      for (let i = 1; i <= 3; i++) {
        const imagePath = `/tissuepic/${pictureName}_Image${i}.jpg`;
        this.imageList.push(imagePath);
      }
      this.dialog = true; // 打开弹框
    }
  },
  created() {
    this.fetchData();
  },

    openImageDialog(picture) {
      this.imageList = Array.isArray(picture) ? picture : [picture]
      this.dialog = true
    },
    // 可选：自定义搜索函数，默认是包含匹配所有字段
    customFilter(rows, terms, cols, getCellValue) {
      if (!terms) return rows
      const term = terms.toLowerCase()
      return rows.filter(row => {
        return cols.some(col => {
          const val = (getCellValue(row, col) || '').toString().toLowerCase()
          return val.indexOf(term) !== -1
        })
      })
    }

};
</script>

<style scoped>
.header-image-container {
  margin-bottom: 0; /* Adjust the space between the header image and the icons */
}

.header-img {
  width: 800px; /* Adjust the width of the header image */
  height: 200px; /* Maintain the aspect ratio of the image */
}

.fixed-width-table {
  width: 95%;
  margin: 0 auto;

  margin-bottom: 10px;
}

.image-container {
  display: flex;
  justify-content: center; /* 居中对齐 */
  flex-wrap: wrap; /* 允许换行 */
}


.image-item {
  margin: 10px;
}

.loaded-image {
  max-width: 100%; /* 使图片自适应宽度 */
  max-height: 800px; /* 设置最大高度 */
  object-fit: contain; /* 保持比例 */
  display: block;
  margin: 0 auto;
}
</style>




