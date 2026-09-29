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


const RNAName = ['URS0002345EEB_9606.126054', 'URS00023473A4_9606.126055', 'URS0002347127_9606.126057', 'URS000233BC28_9606.126056', 'URS0000684D4B_9606.126089', 'URS0000691449_9606.123796', 'URS0000633947_9606.237786', 'URS000013F331_9606.121389', 'URS000047A7F4_9606.471194', 'URS00004416C5_9606.306887', 'URS000044DFF6_9606.471192']

const BED_Col9 = ['(human) HSALNT0376825', '(human) HSALNT0376829', '(human) HSALNT0376831', 'HSALNT0376830', 'RNA component of signal recognition particle 7SL2 (ENSG00000274012.1)', 'Y RNA (ENSG00000199291.1)', 'Y RNA (ENSG00000222467.1)', '(human) ribonuclease P RNA component H1 (RPPH1)', '(human) mitochondrially encoded 16S rRNA (MT-RNR2)', '(human) telomerase RNA component', '(human) mitochondrially encoded 12S rRNA (MT-RNR1)']


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
      const data = [[0, 0, 0.0], [0, 1, 0.0], [0, 2, 0.0], [0, 3, 0.0], [0, 4, 0.0], [0, 5, 0.0], [0, 6, 0.0], [0, 7, 3.53], [0, 8, 3.23], [0, 9, 5.26], [0, 10, 2.62], [1, 0, 19.05], [1, 1, 19.05], [1, 2, 19.05], [1, 3, 19.05], [1, 4, 19.05], [1, 5, 18.64], [1, 6, 18.05], [1, 7, 2.52], [1, 8, 2.79], [1, 9, 0.0], [1, 10, 2.54]]
          .map(item => [item[1], item[0], item[2] != null ? item[2] : '-']);

      const RNA_labels = RNAName.map((id, index) => `${BED_Col9[index]}_${id}`);

      myChart.setOption({
        title: {
          text: 'otherRNA'
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

      const barChartData = {'HeLa': {'Input_RPM': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 21.01, 105.84, 0.89, 126.52], 'Enriched_RPM': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 242.0, 995.25, 34.04, 775.53]}, 'H9': {'Input_RPM': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 18.82, 123.66, 0.0, 34.39], 'Enriched_RPM': [0.54, 0.54, 0.54, 0.54, 0.54, 0.41, 0.27, 107.63, 854.39, 0.0, 200.6]}}
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
