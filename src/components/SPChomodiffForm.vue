<template>
  <div>
    <q-input
        filled
        v-model="filter"
        label="search"
        class="q-mb-md"
        debounce="300"
        placeholder="search"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-table
        title="GlycoRNA"
        :rows="sortedItems"
        :columns="columns"
        row-key="id"
        :visible-columns="visibleColumns"
        :rows-per-page-options="[15]"
        class="fixed-width-table"
        :filter="filter"
        :loading="loading"
        :sort-method="customSort"
        sort-by="logFC"
        :sort-desc="true"
    />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    filterMethod: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: true,
      items: [],
      filter: '',
      columns: [
        { name: 'GeneID', label: 'GeneID', align: 'left', field: 'GeneID'},
        { name: 'CC1', label: 'CC1', align: 'left', field: 'CC1' },
        { name: 'CC2', label: 'CC2', align: 'left', field: 'CC2' },
        { name: 'CC3', label: 'CC3', align: 'left', field: 'CC3' },
        { name: 'NC1', label: 'NC1', align: 'left', field: 'NC1' },
        { name: 'NC2', label: 'NC2', align: 'left', field: 'NC2' },
        { name: 'NC3', label: 'NC3', align: 'left', field: 'NC3' },
        { name: 'logFC', label: 'logFC', align: 'left', field: 'logFC', sortable: true },
        { name: 'adjPValue', label: 'adjPValue', align: 'left', field: 'adjPValue' },
        { name: 'method', label: 'method', align: 'left', field: 'method' },
      ],
      visibleColumns: [
        'GeneID', 'CC1', 'CC2', 'CC3', 'NC1',
        'NC2', 'NC3', 'logFC', 'adjPValue', 'method'
      ]
    };
  },
  computed: {
    filteredItems() {
      if (this.filterMethod) {
        return this.items.filter(item => item.method === this.filterMethod);
      } else {
        return this.items;
      }
    },
    sortedItems() {
      return [...this.filteredItems].sort((a, b) => parseFloat(b.logFC) - parseFloat(a.logFC));
    }
  },
  methods: {
    customSort(rows, sortBy, descending) {
      return [...rows].sort((a, b) => {
        const valA = parseFloat(a[sortBy]) || 0;
        const valB = parseFloat(b[sortBy]) || 0;
        return descending ? valB - valA : valA - valB;
      });
    }
  },
  mounted() {
    axios.get('http://1.12.236.3:5000/tissueexp')
        .then(response => {
          this.items = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          this.loading = false;
        });
  }
};
</script>

<style>
.fixed-width-table {
  max-width: 100%;
}
</style>
