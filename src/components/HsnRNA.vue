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

const RNAName = ['URS000063B690_9606.23295', 'URS00000081EA_9606.23771', 'URS00001EC8D7_9606.199773', 'URS0000AAF39E_9606.302651', 'URS0000162127_9606.24017', 'URS0000673862_9606.3400', 'URS000067B2B1_9606.10408', 'URS0000149178_9606.103029', 'URS00006E1BD2_9606.144978', 'URS00006729B1_9606.10411', 'URS00006CA71A_9606.24081', 'URS0000650B1E_9606', 'URS000035C796_9606', '/', 'URS00006ECA78_9606', 'URS000032B6B6_9606', 'URS0000734D8F_9606', 'URS000071EA53_9606', 'URS000000A142_9606', 'URS00003F07BD_9606']

const BED_Col9 = ['RNA 2C variant U1 small nuclear 31 (RNVU1-31)', 'RNA 2C variant U1 small nuclear 7 (RNVU1-7)', '(human) RNA 2C U6 small nuclear 2 (RNU6-2 2C RNU6-9)', 'U6 spliceosomal RNA (ENSG00000283418.1)', 'RNA 2C variant U1 small nuclear 1 (RNVU1-1)', 'RNA 2C U5E small nuclear 1 (ENSG00000199347.1)', 'RNA 2C U5F small nuclear 1 (ENSG00000199377.1)', 'RNA 2C U4 small nuclear 2 (RNU4-2)', 'RNA 2C U5B small nuclear 1 (ENSG00000200156.1)', 'RNA 2C U5D small nuclear 1 (ENSG00000200169.1)', '(human) RNA 2C variant U1 small nuclear 27 (RNVU1-27)', 'U3A', 'U6', '7SL-SRP', 'U12', 'U1', 'U5', '7SK', 'U11', 'U4_1']


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
      const data = [[0, 0, 21.24], [0, 1, 7.92], [0, 2, 5.86], [0, 3, 0.0], [0, 4, 0.0], [0, 5, 5.7], [0, 6, 4.58], [0, 7, 3.86], [0, 8, 3.51], [0, 9, 3.85], [0, 10, 2.48], [0, 11, 2.16], [0, 12, 1.94], [0, 13, 2.77], [0, 14, 1.82], [0, 15, 2.26], [0, 16, 0.12], [0, 17, 1.46], [0, 18, 0.42], [0, 19, 0.29], [1, 0, 23.16], [1, 1, 21.96], [1, 2, 18.05], [1, 3, 20.37], [1, 4, 20.05], [1, 5, 4.97], [1, 6, 4.75], [1, 7, 4.52], [1, 8, 3.85], [1, 9, 3.49], [1, 10, 0.0], [1, 11, 3.49], [1, 12, 3.5], [1, 13, 1.16], [1, 14, 1.81], [1, 15, 0.95], [1, 16, 2.88], [1, 17, 1.54], [1, 18, 1.51], [1, 19, 1.12]]
          .map(item => [item[1], item[0], item[2] != null ? item[2] : '-']);

      const RNA_labels = RNAName.map((id, index) => `${BED_Col9[index]}_${id}`);

      myChart.setOption({
        title: {
          text: 'snRNA'
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
          name: 'RNA ID',
          splitArea: {
            show: true
          },
          axisLabel: {
            show: false,
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
          max: 10,
          ble: true,
          orient: 'horizontal',
          calculable: true,
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

        const barChartData = {'HeLa': {'Input_RPM': [0.0, 0.22, 0.78, 0.0, 0.0, 32.8, 18.9, 6.67, 21.57, 38.25, 0.33, 42097.21, 3081.02, 1133.55, 329.34, 22914.37, 20510.68, 1759.82, 390.87, 18045.71], 'Enriched_RPM': [2.48, 53.85, 45.18, 0.0, 0.0, 1702.07, 451.2, 97.17, 246.34, 550.23, 1.86, 187700.61, 11833.67, 7736.96, 1166.23, 109587.6, 22255.54, 4847.88, 521.96, 22040.79]}, 'H9': {'Input_RPM': [0.0, 0.0, 0.0, 0.0, 0.0, 178.1, 10.09, 2.38, 40.24, 9.37, 0.0, 14700.73, 2849.03, 2586.14, 338.94, 43139.39, 9634.25, 694.21, 837.9, 12199.86], 'Enriched_RPM': [9.37, 4.07, 0.27, 1.36, 1.09, 5585.63, 271.04, 54.43, 578.73, 105.32, 0.0, 165127.3, 32170.08, 5785.83, 1190.01, 83525.14, 71104.03, 2022.6, 2385.11, 26439.95]}}
        ;
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

        // ✅ 适配 Hash 模式的完整 URL
        const fullUrl = `${window.location.origin}/#${path}`;
        window.open(fullUrl, '_blank');
      } catch (error) {
        console.error('跳转失败：', error);
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
