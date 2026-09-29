<template>
  <div class="details-table">
    <table class="custom-table">
      <tbody>
      <!-- GlycoRNA ID and Type -->
      <tr>
        <th>GlycoRNA ID</th>
        <td>{{ formattedGlycoRNAData[0]?.glycoRNAID || 'N/A' }}</td>
        <th>Type</th>
        <td>{{ formattedGlycoRNAData[0]?.type || 'N/A' }}</td>
      </tr>
      <!-- RTsitenumber -->
      <tr>
        <th>Source ID</th>
        <td>
          <template v-if="formattedGlycoRNAData[0]?.sourceID">
            <a
                :href="generateLink(formattedGlycoRNAData[0].sourceID)"
                target="_blank"
                class="ensembl-link"
            >
              {{ formattedGlycoRNAData[0].sourceID }}
            </a>
          </template>
          <template v-else>
            N/A
          </template>
        </td>
        <th>Source DB</th>
        <td>{{ formattedGlycoRNAData[0]?.sourceDB || 'N/A' }}</td>
      </tr>

      <!-- Position -->
      <tr>
        <th>Position</th>
        <td colspan="3">
          <q-btn
              v-if="formattedGlycoRNAData[0]?.position"
              :label="formattedGlycoRNAData[0].position"
              flat
              text-color="primary"
              style="text-transform: none;"
              @click="goToGenomeLocation(formattedGlycoRNAData[0].position)"
          />
          <span v-else>N/A</span>
        </td>
      </tr>

      <!-- Name -->
      <tr>
        <th>Name</th>
        <td colspan="3">{{ formattedGlycoRNAData[0]?.name || 'N/A' }}</td>
      </tr>

      <!-- Sequence -->
      <tr>
        <th>Sequence</th>
        <td colspan="3">
          <div class="text-content sequence-content">{{ formattedGlycoRNAData[0]?.Sequence || 'N/A' }}</div>
        </td>
      </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      glycoRNAID: null,
      glycoRNAData: [] // 存储表格的数据
    };
  },
  computed: {
    // 格式化数据
    formattedGlycoRNAData() {
      return this.glycoRNAData.map(row => ({
        ...row,
        name: row.name?.replace(/%2C/g, ','), // Replace %2C with comma
        glycoRNAID: `${String(row.glycoRNAID)}`
    }));
    }
  },
  created() {
    this.glycoRNAID = this.$route.params.glycoRNAID; // Get glycoRNAID from the route
    this.fetchGlycoRNAData();
  },
  methods: {
    // Fetch data from the server
    async fetchGlycoRNAData() {
      try {
        const response = await fetch(`http://1.12.236.3:5000/musdetails/${this.glycoRNAID}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.glycoRNAData = [data]; // Store the fetched data
      } catch (error) {
        console.error('Error fetching glycoRNA data:', error);
      }
    },
    generateLink(sourceID) {
      // 根据 sourceID 生成链接
      const parts = sourceID.split('_');
      const url = `https://rnacentral.org/rna/${parts[0]}/${parts[1]}`;
      return url;
    },
    goToGenomeLocation(position, species = 'mouse') {
      const formatNumber = (number) => {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      const regex = /chr(\d+|X|Y|M):(\d+)-(\d+)(\((-?\d+)\))?/i;
      const match = position.match(regex);

      if (match) {
        const chromosome = `chr${match[1]}`;
        const start = formatNumber(match[2]);
        const end = formatNumber(match[3]);

        const formattedLocation = `${chromosome}:${start.replace(/,/g, '')}..${end.replace(/,/g, '')}`;
        console.log(`Formatted Location: ${formattedLocation}`);

        const routeData = this.$router.resolve({
          name: 'JBrowserPage',
          query: {
            location: formattedLocation,
            returnPage: this.pagination?.page || 1,  // 如果 pagination 存在
            species: species,
          }
        });

        window.open(routeData.href, '_blank');
      } else {
        console.warn('Position 格式无法解析：', position);
      }
    }
  }
};
</script>


<style scoped>
.details-table {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-table {
  width: 70%; /* 固定表格宽度 */
  table-layout: fixed; /* 强制列宽固定 */
  border-collapse: collapse;

  font-family: Arial, sans-serif;
}

.custom-table th {
  width: 10%;
  padding: 10px;
  text-align: left;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
}

.custom-table td {
  padding: 10px;
  border: 1px solid #ccc;
  word-wrap: break-word;
}

.text-content {
  max-height: 150px; /* 限制内容最大高度 */
  overflow-y: auto; /* 垂直滚动条 */
  white-space: pre-wrap; /* 保留换行符 */
  word-wrap: break-word; /* 自动换行 */
}
.text-content {
  white-space: pre-wrap; /* Ensure the text breaks as needed */
  word-wrap: break-word; /* Allow long words to break */
  font-family: monospace; /* Use a monospace font for better alignment */
}

.sequence-content {
  max-width: 100%; /* Ensure the sequence does not overflow */
  overflow-wrap: break-word; /* Break long sequences when necessary */
}

.structure-content {
  max-width: 100%;
  overflow-wrap: break-word; /* Break long structures when necessary */
}


</style>

