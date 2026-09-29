<template>
  <q-page class="q-pa-md" style="width: 80%;  margin: 20px auto;">
    <q-card style="margin-top: 30px">

      <q-card-section>
        <div style="font-size: 20px; margin-top: 20px">Please enter the sequence information here. You can click the <strong>Example</strong> button below to display the sequence format:</div>
      </q-card-section>

      <q-card-section>
        <q-input
            filled
            type="textarea"
            label="Please Input FASTA"
            v-model="inputFasta"
            rows="4"
            color="orange-8"
            label-color="orange-8"
        />
      </q-card-section>

      <q-card-actions style="margin-left: 15px; width: 200px">
      <q-btn @click="getExample" label="Get Example" />
      </q-card-actions>

      <q-card-section>
        <div style="font-size: 20px">You can also upload fasta file for blast:</div>
      </q-card-section>

      <q-card-section>
        <q-uploader
          url=""
          label="Upload FASTA File"
          accept=".fasta"
          @added="handleFileUpload"
        />
      </q-card-section>


      <q-card-section>
        <div style="font-size: 20px">Please select the appropriate parameters for your BLAST search:</div>
      </q-card-section>

      <q-card-section style="width: 70%">

        <q-select
          filled
          label="Select E-value"
          v-model="selectedExpect"
          :options="expectOptions"
          option-value="value"
          option-label="label"
        />
      </q-card-section>

      <q-card-section style="width: 70%">
        <q-select
          filled
          label="Select Word Size"
          v-model="selectedWordSize"
          :options="wordSizeOptions"
          option-value="value"
          option-label="label"
        />
      </q-card-section>

      <q-card-section>
        <q-banner v-if="inputSource === 'input'" dense class="bg-grey-2 text-primary">
          Current Input Source: <strong>Manual Input</strong>
        </q-banner>
        <q-banner v-else-if="inputSource === 'upload'" dense class="bg-grey-2 text-positive">
          Current Input Source: <strong>Uploaded File</strong>
        </q-banner>
      </q-card-section>

      <q-card-actions style="width: 100px;margin-left: 15px; margin-bottom: 50px; ">
        <q-btn color="primary" :loading="isLoading" @click="getBlast" label="Go Blast" />
      </q-card-actions>
    </q-card>

    <q-card v-if="blastResult" class="q-mt-md">
      <q-card-section>
        <!-- 新增标题文字 -->
        <h6 style="margin-bottom: 20px;">Blast Result</h6>
        <!-- 用 v-html 来显示 HTML 中含有链接 -->
        <pre v-html="blastResult"></pre>
      </q-card-section>
    </q-card>

    <q-card v-if="blastData.length" class="q-mt-md">
      <q-card-section>
        <h6>Alignment Visualization</h6>
        <div id="alignmentChart" style="height: 400px;"></div>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const isLoading = ref(false);
const blastResult = ref(''); // 原文本 BLAST 输出
const blastData = ref([]);   // 用于绘图的数据
const inputFasta = ref('');
const uploadedFasta = ref('');
const inputSource = ref('');

const exampleFasta = ref(
    '>sequence_A\nGCUCCAGUGGCGCAAUCGGUUAGCGCGCGGUACUUAUAAUGCCGAGGUUGUGAGUUCGAGCCUCACCUGGAGCA'
);

const selectedExpect = ref('0.001');
const selectedWordSize = ref('28');

const expectOptions = [
  { label: '0.001', value: '0.001' },
  { label: '0.01', value: '0.01' }
];
const wordSizeOptions = [
  { label: '7', value: '7' },
  { label: '11', value: '11' },
  { label: '28', value: '28' }
];

function getExample() {
  inputFasta.value = exampleFasta.value;
  uploadedFasta.value = '';
  inputSource.value = 'input';
}

function handleFileUpload(files) {
  if (!files || files.length === 0) return;
  const file = files[0];
  const reader = new FileReader();
  reader.onload = () => {
    uploadedFasta.value = reader.result;
    inputFasta.value = '';
    inputSource.value = 'upload';
  };
  reader.readAsText(file);
}

async function getBlast() {
  isLoading.value = true;
  try {
    const fasta = inputFasta.value || uploadedFasta.value;
    if (!fasta) {
      $q.notify({ type: 'negative', message: 'Please provide a FASTA sequence!' });
      return;
    }

    // 抽取描述
    let queryDesc = '';
    const firstLine = fasta.split('\n')[0].trim();
    if (firstLine.startsWith('>')) queryDesc = firstLine.slice(1);

    const expectValue = selectedExpect.value?.value || selectedExpect.value;
    const wordSizeValue = selectedWordSize.value?.value || selectedWordSize.value;

    const response = await axios.post('http://1.12.236.3:5000/blast', {
      fasta, expect: expectValue, wordSize: wordSizeValue
    }, { headers: { 'Content-Type': 'application/json' } });

    if (Array.isArray(response.data) && response.data.length > 0) {
      blastResult.value = await formatBlastResult(response.data, queryDesc);
      blastData.value = formatBlastData(response.data, fasta);
      await nextTick();
      renderChart();
    } else {
      blastResult.value = 'No results found!';
      blastData.value = [];
    }
  } catch (error) {
    console.error(error);
    $q.notify({ type: 'negative', message: 'BLAST request failed!' });
  } finally {
    isLoading.value = false;
  }
}

// 格式化文本输出（保留你原来的 formatBlastResult）
async function formatBlastResult(data, queryDesc) {
  let formattedResult = '';
  const lineLength = 60;
  const labelLength = 6;

  for (const result of data) {
    formattedResult += `Query= ${queryDesc}\n`;
    formattedResult += `Length=${result.length}\n\n`;
    formattedResult += `Sequences producing significant alignments:\n\n`;

    for (const alignment of result.alignments) {
      const fullTitle = alignment.title.trim();
      const transcriptID = fullTitle.split(/\s+/)[0];
      const restTitle = fullTitle.replace(transcriptID, '');

      let linkPart = transcriptID; // 默认不跳转

      try {
        const res = await axios.get(
            `http://1.12.236.3:5000/get_glycoRNAID/${transcriptID}`
        );

        const glycoRNAID = res.data?.glycoRNAID;

        if (glycoRNAID) {
          linkPart = `<a href="http://www.glycornadb.com/#/homostructure/${glycoRNAID}" target="_blank">${transcriptID}</a>`;
        }
      } catch (err) {
        console.error('Failed to get glycoRNAID:', transcriptID, err);
      }

      formattedResult += `${linkPart}${restTitle}\tScore=${alignment.hsp.score}, Expect=${alignment.hsp.expect}\n\n`;


      const qSeq = alignment.hsp.query;
      const mSeq = alignment.hsp.match;
      const sSeq = alignment.hsp.subject;
      const qStart = alignment.hsp.query_start;
      const qEnd = alignment.hsp.query_end;
      const sStart = alignment.hsp.subject_start;
      const sEnd = alignment.hsp.subject_end;

      // 按行输出，每行 lineLength 个碱基
      for (let i = 0; i < qSeq.length; i += lineLength) {
        const qSlice = qSeq.slice(i, i + lineLength);
        const mSlice = mSeq.slice(i, i + lineLength);
        const sSlice = sSeq.slice(i, i + lineLength);

        const qLineStart = qStart + i;
        const qLineEnd = qLineStart + qSlice.length - 1;
        const sLineStart = sStart + i;
        const sLineEnd = sLineStart + sSlice.length - 1;

        formattedResult += `Query ${qLineStart.toString().padStart(3)}  ${qSlice} ${qLineEnd}\n`;
        formattedResult += `${' '.repeat(labelLength + 3)}  ${mSlice}\n`;
        formattedResult += `Sbjct ${sLineStart.toString().padStart(3)}  ${sSlice} ${sLineEnd}\n\n`;
      }
    }
  }

  return formattedResult;
}


function formatBlastData(data) {
  const result = [];
  data.forEach(item => {
    item.alignments.forEach(aln => {
      result.push({
        id: aln.title,
        score: aln.hsp.score,
        expect: aln.hsp.expect,
        query_start: aln.hsp.query_start,       // 查询序列比对起点
        query_end: aln.hsp.query_end,           // 查询序列比对终点
        subject_length: aln.length,             // Subject 整条序列长度
        subject_start: aln.hsp.subject_start,   // Subject HSP 起点
        subject_end: aln.hsp.subject_end        // Subject HSP 终点
      });
    });
  });
  return result;
}

function renderChart() {
  if (!blastData.value.length) return;

  const chartDom = document.getElementById('alignmentChart');
  const chart = echarts.init(chartDom);

  const yLabels = ['Query Sequence', ...blastData.value.map(d => d.id)];
  const series = [];

  // 绘制 Query
  const firstHit = blastData.value[0];
  series.push({
    name: 'Query_blank',
    type: 'bar',
    stack: 'Query',
    data: [firstHit.subject_start - 1, ...Array(blastData.value.length).fill(0)],
    itemStyle: { color: 'transparent' }
  });
  series.push({
    name: 'Query_match',
    type: 'bar',
    stack: 'Query',
    data: [firstHit.subject_end - firstHit.subject_start + 1, ...Array(blastData.value.length).fill(0)],
    itemStyle: { color: '#4A90E2' }
  });

  // 绘制 Subject
  blastData.value.forEach((d, i) => {
    series.push({
      name: 'Subject',
      type: 'bar',
      stack: `subject_${i}`,
      data: Array(yLabels.length).fill(0).map((v, idx) => idx === i + 1 ? d.subject_length : 0),
      itemStyle: { color: '#F5A623' }
    });
  });

  chart.setOption({
    tooltip: {
      formatter: function (params) {
        const d = blastData.value[Math.floor(params.seriesIndex / 2)];
        if (params.seriesName.startsWith('Query')) {
          return `Query<br/>Start: ${d.query_start}<br/>End: ${d.query_end}`;
        } else {
          return `Subject<br/>Start: ${d.subject_start}<br/>End: ${d.subject_end}<br/>Score: ${d.score}<br/>Expect: ${d.expect}`;
        }
      }
    },
    xAxis: { type: 'value'},
    yAxis: {
      type: 'category',
      data: yLabels,
      axisLabel: {
        interval: 0,
        fontSize: 10,
        formatter: function(value) {
          // 超过 20 个字符用省略号显示
          return value.length > 20 ? value.slice(0, 25) : value;
        },
        rich: {},
      }
    },
    grid: { left: 180, right: 50, top: 50, bottom: 50 },
    series
  });

// 增加 hover tooltip 显示完整纵轴名称
  chart.on('axisLabelMouseOver', function (params) {
    chart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: params.dataIndex
    });
  });

}

</script>



<style scoped>
.darker-input .q-field__label {
  color: #333 !important;  /* 改成你喜欢的深颜色 */
  font-weight: bold;       /* 可以顺便加粗 */
}

#alignmentChart {
  transform: scale(0.9);   /* 缩小到 80% */
  transform-origin: top left; /* 从左上角缩放 */
}
</style>
