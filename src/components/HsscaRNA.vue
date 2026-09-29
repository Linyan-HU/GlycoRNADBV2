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


const RNAName = ['URS00005C0742_9606.25755', 'URS00006B01A6_9606.145096', 'URS000021BC29_9606.6615', 'URS000070F968_9606.472950', 'URS00003B6A48_9606.313714', 'URS000015F227_9606.185750', 'URS0000466492_9606.473266', 'URS0000648DBA_9606.29268', 'URS000023DE4C_9606.20332', 'URS0000759B0C_9606.367637', 'URS00008E3964_9606.407844', 'URS000026BDF0_9606.133544', 'URS00005172B7_9606.148542', 'URS00002E82E5_9606.77444', 'URS000023DE4C_9606.20330', 'URS00008E3A3C_9606.25730', 'URS0000608804_9606.442157', 'URS00006C9D52_9606.85596', 'URS00005A2612_9606.349670']

const BED_Col9 = ['(human) small Cajal body-specific RNA 4 (SCARNA4)', 'small Cajal body-specific RNA 14 (ENSG00000252712.1)', 'small Cajal body-specific RNA 1 (SCARNA1)', 'snoRNA (ENSG00000201882.1)', 'small Cajal body-specific RNA 22 (SCARNA22)', 'small Cajal body-specific RNA 16 (SCARNA16)', 'small Cajal body-specific RNA 23 (SCARNA23)', 'small Cajal body-specific RNA 3 (ENSG00000252906.1)', '(human) small Cajal body-specific RNA 2 (SCARNA2)', '(human) small Cajal body-specific RNA 27 (SCARNA27)', 'small Cajal body-specific RNA 28 (SCARNA28)', 'small Cajal body-specific RNA 13 (SCARNA13)', 'small Cajal body-specific RNA 15 (SCARNA15)', '(human) small Cajal body-specific RNA 9', '(human) small Cajal body-specific RNA 2 (SCARNA2)', 'small Cajal body-specific RNA 26A (SCARNA26A)', 'small Cajal body-specific RNA 8 (SCARNA8)', '(human) small Cajal body-specific RNA 11 (ENSG00000251898.1)', 'small Cajal body-specific RNA 18 (SCARNA18)']

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
      const data = [[0, 0, 23.99], [0, 1, 22.24], [0, 2, 21.56], [0, 3, 21.82], [0, 4, 22.05], [0, 5, 20.82], [0, 6, 24.1], [0, 7, 5.87], [0, 8, 23.56], [0, 9, 23.05], [0, 10, 23.33], [0, 11, 3.4], [0, 12, 21.24], [0, 13, 0.0], [0, 14, 0.0], [0, 15, 0.0], [0, 16, 6.3], [0, 17, 4.65], [0, 18, 0.0], [1, 0, 23.07], [1, 1, 23.9], [1, 2, 21.75], [1, 3, 21.37], [1, 4, 18.05], [1, 5, 19.05], [1, 6, 5.56], [1, 7, 22.3], [1, 8, 4.44], [1, 9, 2.91], [1, 10, 1.86], [1, 11, 19.64], [1, 12, 0.0], [1, 13, 19.86], [1, 14, 19.64], [1, 15, 18.64], [1, 16, 3.67], [1, 17, 4.27], [1, 18, 3.5]]
          .map(item => [item[1], item[0], item[2] != null ? item[2] : '-']);

      const RNA_labels = RNAName.map((id, index) => `${BED_Col9[index]}_${id}`);

      myChart.setOption({
        title: {
          text: 'scaRNA'
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
          min: 5,
          max: 25,
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

      const barChartData = {'HeLa': {'Input_RPM': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.22, 0.0, 0.0, 0.0, 1.11, 0.0, 0.0, 0.0, 0.0, 0.56, 0.67, 0.0], 'Enriched_RPM': [16.71, 4.95, 3.09, 3.71, 4.33, 1.86, 17.95, 13.0, 12.38, 8.67, 10.52, 11.76, 2.48, 0.0, 0.0, 0.0, 43.94, 16.71, 0.0]}, 'H9': {'Input_RPM': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.14, 0.0, 0.29, 0.22, 3.24, 0.0, 0.0, 0.0, 0.0, 0.0, 0.87, 0.29, 0.22], 'Enriched_RPM': [8.82, 15.61, 3.53, 2.71, 0.27, 0.54, 6.79, 5.16, 6.24, 1.63, 11.81, 0.81, 0.0, 0.95, 0.81, 0.41, 10.99, 5.56, 2.44]}}
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
