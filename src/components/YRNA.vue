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

      const cleanedID = currentTranscriptID.value.replace(/^Y_RNA__/, '')

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
      const RNAName = ['Y_RNA__URS0000A82E31_10090.13410', 'Y_RNA__URS0000A921B8_10090.18130', 'Y_RNA__URS0000672DAF_10090.18588', 'Y_RNA__URS0000A900C0_10090.4207', 'Y_RNA__URS0000A900C0_10090.4207', 'Y_RNA__URS000069BBC6_10090.25494', 'Y_RNA__URS0000A82E31_10090.13410', 'Y_RNA__URS00006BC0AD_10090.7142', 'Y_RNA__URS000063047C_10090.13398', 'Y_RNA__URS0000672DAF_10090.18588', 'Y_RNA__URS00006785BC_10090.16268', 'Y_RNA__URS00006BC0AD_10090.7142', 'Y_RNA__URS0000672DAF_10090.18588', 'Y_RNA__URS00006C5601_10090.9912', 'Y_RNA__URS0000A921B8_10090.18130']
      const samples = ['PMN_WGA', 'HoxB8_WGA', 'HoxB8_Bio', 'DiffHoxB8_BioPNG', 'DiffHoxB8_WGA', 'DiffHoxB8_Bio']
      const data = [[0, 0, 0.0], [0, 1, 0.0], [0, 2, 0.0], [0, 3, 0.0], [0, 4, 0.0], [0, 5, 0.0], [0, 6, 0.0], [0, 7, 0.0], [0, 8, 0.0], [0, 9, 1.188851663], [0, 10, 1.103346719], [0, 11, 1.090559935], [0, 12, 1.732425825], [0, 13, 1.732425825], [0, 14, 1.304066554], [1, 0, 0.0], [1, 1, 1.513072333], [1, 2, 0.0], [1, 3, 0.0], [1, 4, 1.401715945], [1, 5, 0.0], [1, 6, 0.0], [1, 7, 0.0], [1, 8, 0.0], [1, 9, 0.0], [1, 10, 0.0], [1, 11, 0.0], [1, 12, -0.510042308], [1, 13, -0.510042308], [1, 14, -0.674374673], [2, 0, 1.240921307], [2, 1, 1.346273845], [2, 2, 1.467867264], [2, 3, 0.0], [2, 4, 0.0], [2, 5, 0.0], [2, 6, 0.0], [2, 7, 0.0], [2, 8, 0.0], [2, 9, 0.0], [2, 10, 0.0], [2, 11, 0.0], [2, 12, -0.714222898], [2, 13, -0.714222898], [2, 14, -1.036473842], [3, 0, 1.535457508], [3, 1, 0.0], [3, 2, 0.0], [3, 3, 0.0], [3, 4, 0.0], [3, 5, 0.0], [3, 6, 1.241148801], [3, 7, 0.0], [3, 8, 0.0], [3, 9, 0.0], [3, 10, 0.0], [3, 11, 0.0], [3, 12, -0.208253829], [3, 13, -0.208253829], [3, 14, -0.919953009], [4, 0, 1.386025451], [4, 1, 0.0], [4, 2, 0.0], [4, 3, 1.723893259], [4, 4, 0.0], [4, 5, 0.0], [4, 6, 0.0], [4, 7, 0.0], [4, 8, 0.0], [4, 9, 0.0], [4, 10, 0.0], [4, 11, 0.0], [4, 12, 0.043929654], [4, 13, 0.043929654], [4, 14, -0.269350152], [5, 0, 1.442906219], [5, 1, 0.0], [5, 2, 1.227677381], [5, 3, 0.0], [5, 4, 0.0], [5, 5, 1.257577426], [5, 6, 0.0], [5, 7, 1.239885514], [5, 8, 1.205450857], [5, 9, 0.0], [5, 10, 0.0], [5, 11, 0.0], [5, 12, -0.339031395], [5, 13, -0.339031395], [5, 14, -0.416113085]]
          .map(function (item) {
            return [item[1], item[0], item[2] != null ? item[2] : '-']; // 仅替换为 '-' 如果值为 null 或 undefined
          });
      const barChartData = {'PMN_WGA': {'Input': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'WGA': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 14.4472673361917, 11.6866430044353, 11.3185597602011, 53.0039871697224, 53.0039871697224, 19.1403287001775]}, 'HoxB8_WGA': {'Input': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 844.358135107482, 844.358135107482, 457.069023149114], 'WGA': [0.0, 31.5890974442051, 0.0, 0.0, 24.2183080405572, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 260.215190196639, 260.215190196639, 95.951883486773]}, 'HoxB8_Bio': {'Input': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 844.358135107482, 844.358135107482, 457.069023149114], 'Bio': [16.4149129005597, 21.1959554929558, 28.3675193815498, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 162.236711968639, 162.236711968639, 41.1169662946059]}, 'DiffHoxB8_BioPNG': {'Input': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 236.129731459637, 236.129731459637, 138.756646321642], 'BioPNG': [33.312906582088, 0.0, 0.0, 0.0, 0.0, 0.0, 16.4240376637271, 0.0, 0.0, 0.0, 0.0, 0.0, 145.802070203464, 145.802070203464, 15.8042626575487]}, 'DiffHoxB8_WGA': {'Input': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 236.129731459637, 236.129731459637, 138.756646321642], 'WGA': [23.3234654918222, 0.0, 0.0, 51.9533278944822, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 261.370899003594, 261.370899003594, 74.166152172408]}, 'DiffHoxB8_Bio': {'Input': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 236.129731459637, 236.129731459637, 138.756646321642], 'Bio': [26.727213034308, 0.0, 15.8918563987777, 0.0, 0.0, 17.0957849138366, 0.0, 16.3734278048013, 15.0491064382365, 0.0, 0.0, 0.0, 107.631209246267, 107.631209246267, 52.6116761080747]}}
      ;
      // 设置图表的配置
      myChart.setOption({
        title: {
          text: 'YRNA'
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
