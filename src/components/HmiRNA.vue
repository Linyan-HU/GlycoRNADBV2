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


const RNAName = ['URS0000259AE4_9606.36010', 'URS000047E28E_9606.91448', 'URS000042B108_9606.483326', 'URS0000D53F1E_9606.202751', 'URS000006F90B_9606.407845', 'URS000042A57E_9606.421041', 'URS0000057A7C_9606.310063'];

const BED_Col9 = ['(human) hsa-miR-664a-5p', 'hsa-miR-1291', '(human) hsa-miR-664b-5p', '(human) hsa-miR-10395-5p', '(human) hsa-miR-3609', '(human) hsa-miR-320a-5p', 'hsa-miR-1248']


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
      const data = [[0, 0, 25.1], [0, 1, 6.3], [0, 2, 6.72], [0, 3, 0.0], [0, 4, 0.0], [0, 5, 0.0], [0, 6, 6.51], [1, 0, 6.3], [1, 1, 24.42], [1, 2, 23.9], [1, 3, 21.44], [1, 4, 21.22], [1, 5, 20.86], [1, 6, 4.39]]
          .map(item => [item[1], item[0], item[2] != null ? item[2] : '-']);

      const RNA_labels = RNAName.map((id, index) => `${BED_Col9[index]}_${id}`);

      myChart.setOption({
        title: {
          text: 'miRNA'
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
          name: 'RNA ID + Name',
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
          max: 20,
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

        const barChartData = {'HeLa': {'Input_RPM': [0.0, 0.56, 0.44, 0.0, 0.0, 0.0, 0.56], 'Enriched_RPM': [35.9, 43.94, 47.04, 0.0, 0.0, 0.0, 50.75]}, 'H9': {'Input_RPM': [0.29, 0.0, 0.0, 0.0, 0.0, 0.0, 0.43], 'Enriched_RPM': [22.8, 22.39, 15.61, 2.85, 2.44, 1.9, 9.09]}}

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
