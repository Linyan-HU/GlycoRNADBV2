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


const RNAName = ['URS0000D50918_9606.202749', 'URS000075DEE5_9606.450529', 'URS0000D5073B_9606.29267', 'URS000075DD29_9606.483325', 'URS000075BA3A_9606.25583', 'URS0000BB2E26_9606.25584', 'URS0000233054_9606.202979', 'URS0002311075_9606.202980', 'URS0000D53E88_9606.421038', 'URS00007E374E_9606.421039', 'URS00006FED78_9606.421037', 'URS0000B8E2B8_9606.269663', 'URS0000208A34_9606.269662', 'URS000054969A_9606.81610', 'URS0000759B7F_9606.291152', 'URS000075D26F_9606.91447', 'URS000075B7FD_9606.36007', 'URS000075EAF7_9606.310061', 'URS000075B0DE_9606.320141', 'URS000230F82E_9606.182017', 'URS00000AF93C_9606.182016', 'URS000075D1DB_9606.407843', 'URS000071B780_9606.134431', 'URS000230F9FB_9606.134432']

const BED_Col9 = ['microRNA hsa-mir-10395 precursor', '(human) microRNA hsa-mir-3651 precursor', 'microRNA hsa-mir-1843 precursor', '(human) microRNA hsa-mir-664b precursor', '(human) Hsa-Mir-92-P1d_pre stem-loop', '(human) microRNA hsa-mir-92b precursor', '(human) microRNA hsa-mir-27a precursor', 'Hsa-Mir-27-P3_pre stem-loop', '(human) microRNA 320a (ENSG00000208037.1)', 'Hsa-Mir-320-P1_pre stem-loop', 'microRNA hsa-mir-320a precursor', '(human) Hsa-Mir-10-P2c_pre stem-loop', '(human) microRNA hsa-mir-99a precursor', 'microRNA hsa-mir-100 precursor', '(human) microRNA hsa-mir-4443 precursor', '(human) microRNA hsa-mir-1291 precursor', '(human) microRNA hsa-mir-664a precursor', '(human) microRNA hsa-mir-1248 precursor', 'microRNA hsa-mir-4449 precursor', 'Hsa-Mir-21_pre stem-loop', 'microRNA hsa-mir-21 precursor', '(human) microRNA hsa-mir-3609 precursor', 'Hsa-Mir-342_pre stem-loop', 'microRNA hsa-mir-342 precursor']


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
      const data = [[0, 0, 21.82], [0, 1, 21.56], [0, 2, 22.24], [0, 3, 7.11], [0, 4, 22.82], [0, 5, 22.82], [0, 6, 22.05], [0, 7, 22.05], [0, 8, 0.0], [0, 9, 0.0], [0, 10, 0.0], [0, 11, 20.82], [0, 12, 20.82], [0, 13, 20.82], [0, 14, 0.0], [0, 15, 6.64], [0, 16, 6.81], [0, 17, 5.13], [0, 18, 0.0], [0, 19, 1.89], [0, 20, 1.89], [0, 21, 0.0], [0, 22, 0.0], [0, 23, 0.0], [1, 0, 22.88], [1, 1, 21.37], [1, 2, 20.64], [1, 3, 24.24], [1, 4, 1.91], [1, 5, 1.91], [1, 6, 0.0], [1, 7, 0.0], [1, 8, 20.86], [1, 9, 20.86], [1, 10, 20.86], [1, 11, 0.0], [1, 12, 0.0], [1, 13, 0.0], [1, 14, 19.05], [1, 15, 5.66], [1, 16, 5.07], [1, 17, 2.62], [1, 18, 2.14], [1, 19, 0.0], [1, 20, 0.0], [1, 21, 1.5], [1, 22, 1.23], [1, 23, 1.23]]

          .map(item => [item[1], item[0], item[2] != null ? item[2] : '-']);

      const RNA_labels = RNAName.map((id, index) => `${BED_Col9[index]}_${id}`);

      myChart.setOption({
        title: {
          text: 'premiRNA'
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

        const barChartData = {'HeLa': {'Input_RPM': [0.0, 0.0, 0.0, 0.44, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.45, 0.56, 5.0, 0.0, 0.33, 0.33, 0.0, 0.0, 0.0], 'Enriched_RPM': [3.71, 3.09, 4.95, 61.27, 7.43, 7.43, 4.33, 4.33, 0.0, 0.0, 0.0, 1.86, 1.86, 1.86, 0.0, 243.86, 62.51, 175.78, 0.0, 1.24, 1.24, 0.0, 0.0, 0.0]}, 'H9': {'Input_RPM': [0.0, 0.0, 0.0, 0.0, 1.01, 1.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.87, 0.87, 2.67, 3.17, 0.0, 0.0, 2.45, 0.58, 0.58], 'Enriched_RPM': [7.74, 2.71, 1.63, 19.82, 3.8, 3.8, 0.0, 0.0, 1.9, 1.9, 1.9, 0.0, 0.0, 0.0, 0.54, 94.6, 29.05, 16.42, 13.98, 0.0, 0.0, 6.92, 1.36, 1.36]}}
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
      const transcriptID = RNAName[selectedRNAIndex.value]; // 从 RNAName 数组拿到 transcriptID

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
