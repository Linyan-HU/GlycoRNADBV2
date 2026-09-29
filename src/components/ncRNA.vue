<template>
  <div>
    <div ref="echartsRef" style="width: 1500px; height: 300px;"></div>
    <div ref="barChartRef" style="width: 600px; height: 400px; margin-left: 450px; margin-top: 50px;"></div>
    <div style="text-align: center; margin-top: 20px;">
      <q-btn
          color="primary"
          label="go to see more details"
          @click="goToTranscriptPage"
          :disable="!currentTranscriptID"
      />
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'EChartsComponent',
  setup() {
    const echartsRef = ref(null);
    const barChartRef = ref(null);
    const currentTranscriptID = ref(null);  // 保存当前点击的 RNA ID
    const router = useRouter();
    const goToTranscriptPage = async () => {
      if (!currentTranscriptID.value) return

      const cleanedID = currentTranscriptID.value.replace(/^ncRNA__/, '')

      try {
        const response = await fetch(`http://1.12.236.3:5000/get_mouseglycoRNAID/${cleanedID}`)
        const data = await response.json()

        if (data.error) {
          alert('未找到 glycoRNAID')
          return
        }

        const glycoRNAID = data.glycoRNAID
        const fullUrl = `${window.location.origin}/#/mousestructure/${glycoRNAID}`

        window.open(fullUrl, '_blank')  // 新标签打开对应页面
      } catch (error) {
        console.error('查询出错:', error)
        alert('查询失败，请检查后端服务是否正常')
      }
    };


    onMounted(() => {
      var myChart = echarts.init(echartsRef.value);
      const RNAName = ['ncRNA__URS0000681E22_10090.16620', 'ncRNA__URS00006CD219_10090.3921', 'ncRNA__URS0000625A60_10090.15065', 'ncRNA__URS000068E3A9_10090.25016', 'ncRNA__URS0000681E22_10090.16620', 'ncRNA__URS00006CD219_10090.3921', 'ncRNA__URS00006CD219_10090.3921', 'ncRNA__URS000063B803_10090.28299', 'ncRNA__URS0000AADEF8_10090.9229', 'ncRNA__URS00006CCEA2_10090.17651', 'ncRNA__URS00006D6FF8_10090.9468', 'ncRNA__URS000069EE83_10090.3467', 'ncRNA__URS0000681E22_10090.16620', 'ncRNA__URS0000681E22_10090.16620', 'ncRNA__URS0000AADEF8_10090.9229', 'ncRNA__URS000068E3A9_10090.25016', 'ncRNA__URS0000625A60_10090.15065', 'ncRNA__URS000069EE83_10090.3467']
      const samples = ['PMN_WGA', 'HoxB8_WGA', 'HoxB8_Bio', 'DiffHoxB8_BioPNG', 'DiffHoxB8_WGA', 'DiffHoxB8_Bio']
      const data = [[0, 0, 0.0], [0, 1, 0.0], [0, 2, 1.063798307], [0, 3, 0.0], [0, 4, 0.0], [0, 5, 0.0], [0, 6, 0.0], [0, 7, 1.317739046], [0, 8, 0.0], [0, 9, 0.0], [0, 10, 0.0], [0, 11, 0.0], [0, 12, 1.209070676], [0, 13, 0.0], [0, 14, 0.0], [0, 15, 0.0], [0, 16, 1.067235093], [0, 17, 1.056842051], [1, 0, 2.681808884], [1, 1, 0.0], [1, 2, 0.0], [1, 3, 1.698649386], [1, 4, 1.93397142], [1, 5, 1.742158928], [1, 6, 1.376037849], [1, 7, 0.0], [1, 8, 1.311328753], [1, 9, 1.300018181], [1, 10, 0.0], [1, 11, 0.0], [1, 12, 0.0], [1, 13, 1.189724279], [1, 14, 0.0], [1, 15, 1.166980667], [1, 16, 0.0], [1, 17, 0.0], [2, 0, 2.680430032], [2, 1, 1.260351759], [2, 2, 1.240921307], [2, 3, 0.0], [2, 4, 0.0], [2, 5, 0.0], [2, 6, 0.0], [2, 7, 0.0], [2, 8, 0.0], [2, 9, 0.0], [2, 10, 0.0], [2, 11, 0.0], [2, 12, 0.0], [2, 13, 0.0], [2, 14, 0.0], [2, 15, 0.0], [2, 16, 0.0], [2, 17, 0.0], [3, 0, 1.580144101], [3, 1, 1.545153977], [3, 2, 1.312238998], [3, 3, 0.0], [3, 4, 0.0], [3, 5, 0.0], [3, 6, 0.0], [3, 7, 0.0], [3, 8, 0.0], [3, 9, 0.0], [3, 10, 0.0], [3, 11, 1.221396472], [3, 12, 0.0], [3, 13, 0.0], [3, 14, 0.0], [3, 15, 0.0], [3, 16, 0.0], [3, 17, 0.0], [4, 0, 1.842690014], [4, 1, 0.0], [4, 2, 0.0], [4, 3, 0.0], [4, 4, 0.0], [4, 5, 0.0], [4, 6, 0.0], [4, 7, 0.0], [4, 8, 0.0], [4, 9, 0.0], [4, 10, 1.264818901], [4, 11, 0.0], [4, 12, 0.0], [4, 13, 0.0], [4, 14, 0.0], [4, 15, 0.0], [4, 16, 0.0], [4, 17, 0.0], [5, 0, 1.939922853], [5, 1, 1.787579614], [5, 2, 0.0], [5, 3, 1.239885514], [5, 4, 0.0], [5, 5, 0.0], [5, 6, 0.0], [5, 7, 0.0], [5, 8, 0.0], [5, 9, 0.0], [5, 10, 0.0], [5, 11, 0.0], [5, 12, 0.0], [5, 13, 0.0], [5, 14, 1.175093285], [5, 15, 0.0], [5, 16, 0.0], [5, 17, 0.0]]
          .map(function (item) {
            return [item[1], item[0], item[2] != null ? item[2] : '-']; // 仅替换为 '-' 如果值为 null 或 undefined
          });
      const barChartData = {'PMN_WGA': {'Input': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'WGA': [0.0, 0.0, 10.5823932717328, 0.0, 0.0, 0.0, 0.0, 19.7844743775873, 0.0, 0.0, 0.0, 0.0, 15.18343382466, 0.0, 0.0, 0.0, 10.6744140827913, 10.3983516496157]}, 'HoxB8_WGA': {'Input': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'WGA': [479.627796194514, 0.0, 0.0, 48.9631010385179, 84.8956993813012, 54.2279506125521, 22.7704744076978, 0.0, 19.4799434239265, 18.9534584665231, 0.0, 0.0, 0.0, 14.478336328594, 0.0, 13.6886088924889, 0.0, 0.0]}, 'HoxB8_Bio': {'Input': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'Bio': [478.104259239604, 17.2117533326257, 16.4149129005597, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, 'DiffHoxB8_BioPNG': {'Input': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'BioPNG': [37.0315566191583, 34.087625339811, 19.522912694619, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 15.6493189060041, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, 'DiffHoxB8_WGA': {'Input': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'WGA': [68.6129461029266, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 17.4000456843753, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}, 'DiffHoxB8_Bio': {'Input': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'Bio': [86.0808888267127, 60.3168186044518, 0.0, 16.3734278048013, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 13.9655707746835, 0.0, 0.0, 0.0]}}
      ;
      // 设置图表的配置
      myChart.setOption({
        title: {
          text: 'nCRNA'
        },
        tooltip: {
          position: 'top',
          trigger: 'item'
        },
        grid: {
          height: '65%',
          top: '15%',

        },
        xAxis: {
          type: 'category',
          data: RNAName,
          name: 'RNAName',
          splitArea: {
            show: true
          },
          axisLabel: {
            show: false // 设置为 false 隐藏横轴标签
          },
        },
        yAxis: {
          type: 'category',
          data: samples,
          name: 'samples',
          splitArea: {
            show: true
          },

        },
        visualMap: {
          min: -2,
          max: 2,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '0%',
          inRange: {
            color: ["#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027", ]
          }
        },
        series: [{
          name: 'expression change',
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
            borderColor: '#fff', // 设置边框颜色为白色
            borderWidth: 0.05 // 设置边框宽度
          }
        }]
      });

      // 点击热图某个 RNA + sample
      myChart.on('click', function (params) {
        const sampleName = samples[params.data[1]];
        const rnaIndex = params.data[0];
        const transcriptID = RNAName[rnaIndex];
        currentTranscriptID.value = transcriptID; // 更新当前RNA ID

        const inputData = barChartData[sampleName]['Input'][rnaIndex] || 0;
        const additionalData = barChartData[sampleName]['WGA']?.[rnaIndex] ||
            barChartData[sampleName]['Bio']?.[rnaIndex] ||
            barChartData[sampleName]['BioPNG']?.[rnaIndex] || 0;

        const barChart = echarts.init(barChartRef.value);
        barChart.setOption({
          tooltip: {},
          xAxis: { type: 'category', data: ['Input', 'Enriched'] },
          yAxis: { type: 'value' },
          series: [{ type: 'bar', data: [inputData, additionalData] }],
          graphic: {
            type: 'text',
            left: 'center',
            top: 20,
            style: {
              text: `${sampleName} - ${transcriptID}`,
              font: 'bold 14px sans-serif',
              fill: '#007bff',
              cursor: 'pointer'
            },
            onclick: () => {
              goToTranscriptPage(); // 点击文字时触发跟按钮一样的逻辑
            }
          }
        });
      });

      // ✅ 默认展示 DiffHoxB8_Bio 的第一个 RNA 的柱状图，并设置 transcriptID
      const defaultSample = 'DiffHoxB8_Bio';
      const defaultRnaIndex = 0;
      const defaultTranscriptID = RNAName[defaultRnaIndex];
      currentTranscriptID.value = defaultTranscriptID; // 默认 RNA ID

      const barChart = echarts.init(barChartRef.value);
      barChart.setOption({
        tooltip: {},
        xAxis: { type: 'category', data: ['Input', 'Enriched'] },
        yAxis: { type: 'value' },
        series: [{
          type: 'bar',
          data: [
            barChartData[defaultSample]['Input'][defaultRnaIndex],
            barChartData[defaultSample]['Bio'][defaultRnaIndex]
          ]
        }],
        graphic: {
          type: 'text',
          left: 'center',
          top: 20,
          style: {
            text: `${defaultSample} - ${defaultTranscriptID}`,
            font: 'bold 14px sans-serif',
            fill: '#007bff',
            cursor: 'pointer'
          },
          onclick: () => {
            goToTranscriptPage(); // 点击文字时触发跟按钮一样的逻辑
          }
        }
      });
    });

    return {
      echartsRef,
      barChartRef,
      currentTranscriptID,
      goToTranscriptPage
    };
  }
};
</script>


<style scoped>
/* 这里可以加上一些样式 */
</style>
