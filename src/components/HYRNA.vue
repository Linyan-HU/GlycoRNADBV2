<template>
  <div>
    <div ref="echartsRef" style="width: 1500px; height: 300px;"></div>
    <div ref="barChartRef" style="width: 600px; height: 400px; margin: 50px auto;"></div>

    <div v-if="showButton" style="text-align: center; margin-top: 20px;">
      <q-btn color="primary" label="go to see more details" @click="goToDetail" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const RNAName = ['URS0000650B1E_9606', 'URS000035C796_9606', '/', 'URS00006ECA78_9606', 'URS000032B6B6_9606', 'URS0000734D8F_9606', 'URS000071EA53_9606', 'URS00005CF03F_9606', 'URS00004A2461_9606', 'URS0000103047_9606', 'URS000000A142_9606', 'URS00003F07BD_9606', 'URS0000007D24_9606'];

const BED_Col9 = ['U3A (human small nucleolar RNA, C/D box 3B-1 (SNORD3B-1, SNORD3B-2))', 'U6', '7SL-SRP', 'U12', 'U1', '7SK', 'U5', 'Y3 (Homo sapiens (human) RNA, Ro60-associated Y3 (RNY3))', 'Y5 (Homo sapiens (human) RNA, Ro60-associated Y5 (RNY5))', 'Y1 (Homo sapiens (human) RNA, Ro60-associated Y1 (RNY1))', 'U11', 'U4_1', 'Y4 (RNA, Ro60-associated Y4 (RNY4))']

export default {
  name: 'EChartsComponent',
  setup() {
    const echartsRef = ref(null);
    const barChartRef = ref(null);
    const router = useRouter();

    const selectedRNAIndex = ref(null);
    const selectedSample = ref('');
    const showButton = ref(false);

    onMounted(() => {
      const myChart = echarts.init(echartsRef.value);

      const samples = ['HeLa', 'H9'];
      const data = [[0, 0, 2.16], [0, 1, 1.94], [0, 2, 2.77], [0, 3, 1.82], [0, 4, 2.26], [0, 5, 1.46], [0, 6, 0.12], [0, 7, 0.83], [0, 8, 1.02], [0, 9, 0.07], [0, 10, 0.42], [0, 11, 0.29], [0, 12, 0.04], [1, 0, 3.49], [1, 1, 3.5], [1, 2, 1.16], [1, 3, 1.81], [1, 4, 0.95], [1, 5, 1.54], [1, 6, 2.88], [1, 7, 1.89], [1, 8, 1.56], [1, 9, 2.21], [1, 10, 1.51], [1, 11, 1.12], [1, 12, 1.04]]
          .map(item => [item[1], item[0], item[2] != null ? item[2] : '-']);

      const RNA_labels = RNAName.map((id, index) => `${BED_Col9[index]}_${id}`);

      myChart.setOption({
        title: {
          text: 'Repetitive RNA'
        },
        tooltip: {
          position: 'top',
          trigger: 'item'
        },
        grid: {
          height: '60%',
          top: '20%'
        },
        xAxis: {
          type: 'category',
          data: RNA_labels,
          name: 'RNAName',
          splitArea: {
            show: true
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: samples,
          name: 'samples',
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 3,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '0%',
          inRange: {
            color: ["#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027"]
          }
        },
        series: [{
          name: 'log2 FoldChange',
          type: 'heatmap',
          data: data,
          label: {},
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 0.05
          }
        }]
      });

      myChart.on('click', function (params) {
        const sampleName = samples[params.data[1]];
        const rnaIndex = params.data[0];
        updateBarChart(sampleName, rnaIndex);
      });

      //  页面加载默认显示 HeLa 样本第一个 RNA
      updateBarChart('HeLa', 0);
    });


    const updateBarChart = (sampleName, rnaIndex) => {
      selectedSample.value = sampleName;
      selectedRNAIndex.value = rnaIndex;
      showButton.value = true;

      const barChartData = {'HeLa': {'Input_RPM': [42097.21, 3081.02, 1133.55, 329.34, 22914.37, 1759.82, 20510.68, 502.95, 29298.27, 452.4, 390.87, 18045.71, 1008.71], 'Enriched_RPM': [187700.61, 11833.67, 7736.96, 1166.23, 109587.6, 4847.88, 22255.54, 892.73, 59348.44, 475.74, 521.96, 22040.79, 1037.18]}, 'H9': {'Input_RPM': [14700.73, 2849.03, 2586.14, 338.94, 43139.39, 694.21, 9634.25, 438.66, 10143.59, 475.29, 837.9, 12199.86, 503.16], 'Enriched_RPM': [165127.3, 32170.08, 5785.83, 1190.01, 83525.14, 2022.6, 71104.03, 1625.09, 29995.98, 2191.61, 2385.11, 26439.95, 1035.33]}}

      const bars = [
        barChartData['HeLa']['Input_RPM'][rnaIndex] || 0,
        barChartData['HeLa']['Enriched_RPM'][rnaIndex] || 0,
        barChartData['H9']['Input_RPM'][rnaIndex] || 0,
        barChartData['H9']['Enriched_RPM'][rnaIndex] || 0
      ];

      const bedCol9 = BED_Col9[rnaIndex];

      const barChart = echarts.init(barChartRef.value);
      barChart.setOption({

        tooltip: { trigger: 'axis' },
        grid: { bottom: 60 },
        xAxis: {
          type: 'category',
          data: [
            'HeLa_Input_RPM',
            'HeLa_Enriched_RPM',
            'H9_Input_RPM',
            'H9_Enriched_RPM'
          ],
          axisLabel: {
            show: true,
            rotate: 30,
            fontSize: 10,
            color: '#000'
          }
        },
        yAxis: { type: 'value' },
        series: [{
          type: 'bar',
          data: bars
        }],
        graphic: {
          type: 'text',
          left: 'center',
          top: 20,
          style: {
            text: bedCol9,
            font: 'bold 14px sans-serif',
            fill: '#007bff',
            cursor: 'pointer'
          },
          onclick: () => {
            goToDetail(); // 点击文字时触发跟按钮一样的逻辑
          }
        }
      });
    };

    const goToDetail = async () => {
      const transcriptID = RNAName[selectedRNAIndex.value];

      try {
        const response = await axios.get(`http://1.12.236.3:5000/get_glycoRNAID/${transcriptID}`);
        const glycoRNAID = response.data.glycoRNAID;

        let path = '';
        if (selectedSample.value === 'HeLa') {
          path = `/helastructure/${glycoRNAID}`;
        } else if (selectedSample.value === 'H9') {
          path = `/h9structure/${glycoRNAID}`;
        }

        const fullUrl = `${window.location.origin}/#${path}`;
        window.open(fullUrl, '_blank');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert('No matching annotation found.');
        }
      }
    };


    return {
      echartsRef,
      barChartRef,
      goToDetail,
      showButton,
      selectedSample
    };
  }
};
</script>
