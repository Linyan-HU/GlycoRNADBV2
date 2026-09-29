<template>
  <div>
    <!-- 热图容器 -->
    <div ref="echartsRef" style="width: 1500px; height: 400px;"></div>

    <!-- Quasar 对话框组件 -->
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 400px; max-width: 500px;">
        <!-- Title Section -->
        <q-card-section>
          <div class="row items-center no-wrap">
            <q-icon name="mdi-dna" size="md" class="text-primary" />
            <div class="text-h6 q-ml-sm">{{ selectedRNA }} - {{ selectedSample }} Details</div>
          </div>
        </q-card-section>

        <!-- Separator -->
        <q-separator />

        <!-- Details Section -->
        <q-card-section>
          <div class="q-py-sm">
            <div class="q-mb-sm"><strong>BaseMean:</strong> <span class="text-primary">{{ selectedDetails.baseMean }}</span></div>
            <div class="q-mb-sm"><strong>logFC:</strong> <span class="text-primary">{{ selectedDetails.logFC }}</span></div>
            <div class="q-mb-sm"><strong>P.Value:</strong> <span class="text-primary">{{ selectedDetails.PValue }}</span></div>
            <div><strong>adj.P.Val:</strong> <span class="text-primary">{{ selectedDetails.adjPVal }}</span></div>
          </div>
        </q-card-section>

        <!-- Separator -->
        <q-separator />

        <!-- Actions Section -->
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

export default {
  name: 'EChartsComponent',
  setup() {
    const echartsRef = ref(null);
    const dialog = ref(false);
    const selectedRNA = ref('');
    const selectedSample = ref('');
    const selectedDetails = ref({});

    const rnaDetails = [
      { rna_names: "hsa-miR-769-5p", baseMean: 140.08, logFC: 7.955, PValue: 0.0, adjPVal: 0.0 },
      { rna_names: "hsa-miR-186-5p", baseMean: 85.77, logFC: 6.325, PValue: 0.0, adjPVal: 0.001 },
      { rna_names: "hsa-miR-1307-3p", baseMean: 789.68, logFC: 6.241, PValue: 0.0, adjPVal: 0.0 },
      { rna_names: "hsa-miR-320a-3p", baseMean: 123.15, logFC: 6.135, PValue: 0.0, adjPVal: 0.005 },
      { rna_names: "hsa-miR-486-5p", baseMean: 4753.14, logFC: 5.902, PValue: 0.0, adjPVal: 0.0 },
      { rna_names: "hsa-miR-486-3p", baseMean: 4753.24, logFC: 5.901, PValue: 0.0, adjPVal: 0.0 },
      { rna_names: "hsa-miR-106b-5p", baseMean: 316.42, logFC: 5.537, PValue: 0.0, adjPVal: 0.001 },
      { rna_names: "hsa-miR-425-5p", baseMean: 6.307, logFC: 5.455, PValue: 0.0, adjPVal: 0.004 },
      { rna_names: "hsa-miR-935", baseMean: 27.49, logFC: 5.455, PValue: 0.0, adjPVal: 0.004 },
      { rna_names: "hsa-miR-3677-3p", baseMean: 19.86, logFC: 5.071, PValue: 0.001, adjPVal: 0.007 },
      { rna_names: "hsa-miR-1180-3p", baseMean: 17.97, logFC: 5.011, PValue: 0.001, adjPVal: 0.007 },
      { rna_names: "hsa-miR-92a-3p", baseMean: 15.57, logFC: 4.768, PValue: 0.001, adjPVal: 0.012 },
      { rna_names: "hsa-miR-32-5p", baseMean: 26.9, logFC: 4.327, PValue: 0.005, adjPVal: 0.028 },
      { rna_names: "hsa-miR-326", baseMean: 11.66, logFC: 4.261, PValue: 0.004, adjPVal: 0.027 },
      { rna_names: "hsa-miR-5008-3p", baseMean: 11.81, logFC: 4.246, PValue: 0.004, adjPVal: 0.027 },
      { rna_names: "hsa-miR-766-3p", baseMean: 10.61, logFC: 4.131, PValue: 0.005, adjPVal: 0.028 },
      { rna_names: "hsa-miR-2277-3p", baseMean: 8.8, logFC: 4.08, PValue: 0.005, adjPVal: 0.028 },
      { rna_names: "hsa-let-7b-5p", baseMean: 15.56, logFC: 3.954, PValue: 0.009, adjPVal: 0.043 },
      { rna_names: "hsa-miR-219a-3p", baseMean: 7.63, logFC: 3.854, PValue: 0.008, adjPVal: 0.042 },
      { rna_names: "hsa-miR-378a-3p", baseMean: 317.97, logFC: 3.63, PValue: 0.015, adjPVal: 0.066 },
      { rna_names: "hsa-miR-192-5p", baseMean: 8.51, logFC: 3.608, PValue: 0.01, adjPVal: 0.049 },
      { rna_names: "hsa-miR-33b-5p", baseMean: 8.21, logFC: 3.382, PValue: 0.022, adjPVal: 0.095 },
      { rna_names: "hsa-miR-1269b", baseMean: 3.83, logFC: 3.115, PValue: 0.031, adjPVal: 0.118 },
      { rna_names: "hsa-miR-2277-5p", baseMean: 5.75, logFC: 3.007, PValue: 0.04, adjPVal: 0.131 },
      { rna_names: "hsa-miR-148b-3p", baseMean: 9.12, logFC: 2.808, PValue: 0.039, adjPVal: 0.131 },
      { rna_names: "hsa-miR-92a-2-3p", baseMean: 16.59, logFC: 2.773, PValue: 0.036, adjPVal: 0.13 },
      { rna_names: "hsa-miR-100-5p", baseMean: 134.56, logFC: -2.575, PValue: 0.043, adjPVal: 0.136 },
      { rna_names: "hsa-miR-4755-3p", baseMean: 34.35, logFC: -2.654, PValue: 0.041, adjPVal: 0.131 },
      { rna_names: "hsa-miR-4755-5p", baseMean: 34.77, logFC: -2.676, PValue: 0.039, adjPVal: 0.131 },
      { rna_names: "hsa-miR-199a-3p", baseMean: 44.45, logFC: -2.8, PValue: 0.032, adjPVal: 0.118 },
      { rna_names: "hsa-miR-199a-5p", baseMean: 44.45, logFC: -2.8, PValue: 0.032, adjPVal: 0.118 },
      { rna_names: "hsa-miR-143-3p", baseMean: 304.22, logFC: -2.881, PValue: 0.011, adjPVal: 0.053 },
      { rna_names: "hsa-miR-4284", baseMean: 5.94, logFC: -3.046, PValue: 0.038, adjPVal: 0.131 },
      { rna_names: "hsa-miR-105-5p", baseMean: 3.62, logFC: -3.127, PValue: 0.03, adjPVal: 0 },
      { rna_names: "hsa-miR-503-5p", baseMean: 6.53, logFC: -3.227, PValue: 0.029, adjPVal: 0.115 },
      { rna_names: "hsa-miR-370-3p", baseMean: 55.4, logFC: -3.234, PValue: 0.019, adjPVal: 0.083 },
      { rna_names: "hsa-miR-483-5p", baseMean: 7.82, logFC: -3.353, PValue: 0.023, adjPVal: 0.097 },
      { rna_names: "hsa-miR-130b-3p", baseMean: 56.54, logFC: -3.608, PValue: 0.004, adjPVal: 0.027 },
      { rna_names: "hsa-miR-146a-5p", baseMean: 66.45, logFC: -3.677, PValue: 0.005, adjPVal: 0.028 },
      { rna_names: "hsa-miR-299-3p", baseMean: 16.36, logFC: -4.009, PValue: 0.008, adjPVal: 0.042 },
      { rna_names: "hsa-miR-151b", baseMean: 23.83, logFC: -4.344, PValue: 0.005, adjPVal: 0.028 },
      { rna_names: "hsa-miR-550a-3-3p", baseMean: 10.03, logFC: -4.363, PValue: 0.003, adjPVal: 0.022 },
      { rna_names: "hsa-miR-296-3p", baseMean: 29.63, logFC: -4.367, PValue: 0.002, adjPVal: 0.016 },
      { rna_names: "hsa-miR-10400-5p", baseMean: 31.97, logFC: -4.505, PValue: 0.004, adjPVal: 0.027 },
      { rna_names: "hsa-miR-618", baseMean: 13.31, logFC: -4.606, PValue: 0.002, adjPVal: 0.016 },
      { rna_names: "hsa-miR-199b-3p", baseMean: 36.858, logFC: -5.537, PValue: 0.0, adjPVal: 0.001 },
      { rna_names: "hsa-miR-125a-5p", baseMean: 729.86, logFC: -5.569, PValue: 0.0, adjPVal: 0.0 },
      { rna_names: "hsa-miR-221-5p", baseMean: 72.08, logFC: -6.899, PValue: 0.0, adjPVal: 0.0 },
      { rna_names: "hsa-miR-21-5p", baseMean: 1634.99, logFC: -13.452, PValue: 0.0, adjPVal: 0.0 },
    ];

    onMounted(() => {
      var myChart = echarts.init(echartsRef.value);
      const RNAName = ['hsa-miR-769-5p', 'hsa-miR-186-5p', 'hsa-miR-1307-3p', 'hsa-miR-320a-3p', 'hsa-miR-486-5p', 'hsa-miR-486-3p', 'hsa-miR-106b-5p', 'hsa-miR-425-5p', 'hsa-miR-935', 'hsa-miR-3677-3p', 'hsa-miR-1180-3p', 'hsa-miR-92a-3p', 'hsa-miR-32-5p', 'hsa-miR-326', 'hsa-miR-5008-3p', 'hsa-miR-766-3p', 'hsa-miR-2277-3p', 'hsa-let-7b-5p', 'hsa-miR-219a-3p', 'hsa-miR-378a-3p', 'hsa-miR-192-5p', 'hsa-miR-33b-5p', 'hsa-miR-1269b', 'hsa-miR-2277-5p', 'hsa-miR-148b-3p', 'hsa-miR-92a-2-3p', 'hsa-miR-100-5p', 'hsa-miR-4755-3p', 'hsa-miR-4755-5p', 'hsa-miR-199a-3p', 'hsa-miR-199a-5p', 'hsa-miR-143-3p', 'hsa-miR-4284', 'hsa-miR-105-5p', 'hsa-miR-503-5p', 'hsa-miR-370-3p', 'hsa-miR-483-5p', 'hsa-miR-130b-3p', 'hsa-miR-146a-5p', 'hsa-miR-299-3p', 'hsa-miR-151b', 'hsa-miR-550a-3-3p', 'hsa-miR-296-3p', 'hsa-miR-10400-5p', 'hsa-miR-199b-3p', 'hsa-miR-618', 'hsa-miR-125a-5p', 'hsa-miR-221-5p', 'hsa-miR-21-5p']
      const samples = ['CC1', 'CC2', 'CC3', 'NC1', 'NC2', 'NC3']
      const data = [[0, 0, 0.956533403], [0, 1, 0.960364912], [0, 2, 1.079769901], [0, 3, -0.6453637], [0, 4, 1.026523657], [0, 5, 1.026931142], [0, 6, 0.95199161], [0, 7, -0.746186297], [0, 8, 1.042151081], [0, 9, 0.996589279], [0, 10, 0.839100699], [0, 11, 0.754770041], [0, 12, 0.871614189], [0, 13, 0.857056262], [0, 14, 1.198042393], [0, 15, 1.088119224], [0, 16, 1.227616359], [0, 17, -0.645459074], [0, 18, 0.47462243], [0, 19, -0.840629555], [0, 20, 1.048755001], [0, 21, -0.644803741], [0, 22, 0.640926831], [0, 23, 1.612538527], [0, 24, 0.728457831], [0, 25, 0.667927198], [0, 26, -1.415407575], [0, 27, -0.137893775], [0, 28, -0.148643728], [0, 29, -0.902811436], [0, 30, -0.902811436], [0, 31, -1.301290002], [0, 32, -0.555749211], [0, 33, -0.903590139], [0, 34, -0.631111011], [0, 35, -1.1964915], [0, 36, -0.635353313], [0, 37, -1.27821303], [0, 38, -0.361460013], [0, 39, -0.63507989], [0, 40, -0.645355527], [0, 41, -0.885220469], [0, 42, -0.538597764], [0, 43, -0.614068151], [0, 44, -0.890325147], [0, 45, -0.861179826], [0, 46, -0.906680347], [0, 47, -0.896665108], [0, 48, -0.907263463], [1, 0, 1.125586365], [1, 1, 1.181931907], [1, 2, 1.174085777], [1, 3, 1.258568917], [1, 4, 0.850362092], [1, 5, 0.850448836], [1, 6, 0.990501093], [1, 7, 1.202232966], [1, 8, 1.028877743], [1, 9, 1.036952521], [1, 10, 0.989191887], [1, 11, 1.175691431], [1, 12, 1.634178519], [1, 13, 1.441324665], [1, 14, 1.252214514], [1, 15, 1.343442435], [1, 16, 0.891405973], [1, 17, 1.273727917], [1, 18, 0.189447846], [1, 19, 1.32701831], [1, 20, 0.984137543], [1, 21, 1.216335285], [1, 22, 1.360527006], [1, 23, -0.629074452], [1, 24, 0.903959246], [1, 25, 1.177319879], [1, 26, -1.110649595], [1, 27, -1.510441312], [1, 28, -1.520332767], [1, 29, -1.448030274], [1, 30, -1.448030274], [1, 31, -1.137660455], [1, 32, -0.555749211], [1, 33, -0.903590139], [1, 34, -0.631111011], [1, 35, -1.1964915], [1, 36, -0.635353313], [1, 37, -0.45543389], [1, 38, -1.468080742], [1, 39, -0.63507989], [1, 40, -0.645355527], [1, 41, -0.885220469], [1, 42, -1.070140378], [1, 43, -0.614068151], [1, 44, -1.460002757], [1, 45, -0.861179826], [1, 46, -1.202580794], [1, 47, -0.896665108], [1, 48, -0.907263463], [2, 0, 0.619961236], [2, 1, 0.520310555], [2, 2, 0.375103963], [2, 3, 1.322885883], [2, 4, 0.834283922], [2, 5, 0.834341392], [2, 6, 0.656066085], [2, 7, 1.338915122], [2, 8, 0.63865155], [2, 9, 0.684630543], [2, 10, 0.90722502], [2, 11, 0.777266016], [2, 12, -0.626448177], [2, 13, 0.231971126], [2, 14, -0.00282237], [2, 15, 0.024388766], [2, 16, 0.557370063], [2, 17, 1.308108379], [2, 18, 1.697164332], [2, 19, 1.047541095], [2, 20, 0.637813012], [2, 21, 1.362879678], [2, 22, 0.640926831], [2, 23, 0.903759279], [2, 24, 0.872293588], [2, 25, 0.695151486], [2, 26, 0.317598836], [2, 27, -0.520756228], [2, 28, -0.531266709], [2, 29, 0.14943205], [2, 30, 0.14943205], [2, 31, -0.000512316], [2, 32, -0.555749211], [2, 33, -0.903590139], [2, 34, -0.631111011], [2, 35, 0.05809678], [2, 36, -0.635353313], [2, 37, -0.776972268], [2, 38, -0.694586047], [2, 39, -0.63507989], [2, 40, -0.645355527], [2, 41, -0.885220469], [2, 42, -1.070140378], [2, 43, -0.614068151], [2, 44, 0.20912247], [2, 45, -0.861179826], [2, 46, -0.461727213], [2, 47, -0.896665108], [2, 48, -0.907263463], [3, 0, -0.900693668], [3, 1, -0.975904136], [3, 2, -0.814004562], [3, 3, -0.6453637], [3, 4, -0.991297022], [3, 5, -0.994563436], [3, 6, -1.298840976], [3, 7, -0.746186297], [3, 8, -0.903226792], [3, 9, -0.906057448], [3, 10, -0.911839202], [3, 11, -0.902575829], [3, 12, -0.626448177], [3, 13, -0.843450684], [3, 14, -0.815811512], [3, 15, -0.818650142], [3, 16, -0.892130798], [3, 17, -0.645459074], [3, 18, -0.787078203], [3, 19, -0.840629555], [3, 20, -1.046879554], [3, 21, -0.644803741], [3, 22, -0.880793556], [3, 23, -0.629074452], [3, 24, -1.200079067], [3, 25, -0.308251684], [3, 26, 0.602715558], [3, 27, 0.0210085], [3, 28, 0.075176368], [3, 29, 0.223089867], [3, 30, 0.223089867], [3, 31, 0.78135546], [3, 32, 0.307224285], [3, 33, 1.118436361], [3, 34, -0.631111011], [3, 35, 0.588667497], [3, 36, -0.635353313], [3, 37, 0.317902235], [3, 38, 0.672675344], [3, 39, -0.63507989], [3, 40, 1.257583131], [3, 41, 0.445529209], [3, 42, 1.025202397], [3, 43, 1.715498423], [3, 44, 0.286084611], [3, 45, 0.267716592], [3, 46, 0.406557674], [3, 47, 0.634612985], [3, 48, 0.711081882], [4, 0, -0.900693668], [4, 1, -0.975904136], [4, 2, -0.856086053], [4, 3, -0.6453637], [4, 4, -0.679031542], [4, 5, -0.681729406], [4, 6, -0.924245288], [4, 7, -0.746186297], [4, 8, -0.903226792], [4, 9, -0.906057448], [4, 10, -0.911839202], [4, 11, -0.902575829], [4, 12, -0.626448177], [4, 13, -0.843450684], [4, 14, -0.815811512], [4, 15, -0.818650142], [4, 16, -0.892130798], [4, 17, -0.645459074], [4, 18, -0.787078203], [4, 19, -0.840629555], [4, 20, -0.576946447], [4, 21, -0.644803741], [4, 22, -0.880793556], [4, 23, -0.629074452], [4, 24, -1.200079067], [4, 25, -0.894379247], [4, 26, 0.733090025], [4, 27, 0.828283346], [4, 28, 0.816929072], [4, 29, 0.817162503], [4, 30, 0.817162503], [4, 31, 0.712442182], [4, 32, -0.555749211], [4, 33, 0.922481746], [4, 34, 0.930268187], [4, 35, 0.510982583], [4, 36, 1.54991444], [4, 37, 1.254472148], [4, 38, 1.106290743], [4, 39, 1.553075318], [4, 40, 1.323838979], [4, 41, 1.040584615], [4, 42, 0.802866439], [4, 43, -0.614068151], [4, 44, 0.588886647], [4, 45, 1.262596519], [4, 46, 1.155934191], [4, 47, 1.218666472], [4, 48, 1.04723048], [5, 0, -0.900693668], [5, 1, -0.710799102], [5, 2, -0.958869026], [5, 3, -0.6453637], [5, 4, -1.040841107], [5, 5, -1.035428528], [5, 6, -0.375472524], [5, 7, -0.302589198], [5, 8, -0.903226792], [5, 9, -0.906057448], [5, 10, -0.911839202], [5, 11, -0.902575829], [5, 12, -0.626448177], [5, 13, -0.843450684], [5, 14, -0.815811512], [5, 15, -0.818650142], [5, 16, -0.892130798], [5, 17, -0.645459074], [5, 18, -0.787078203], [5, 19, 0.147329261], [5, 20, -1.046879554], [5, 21, -0.644803741], [5, 22, -0.880793556], [5, 23, -0.629074452], [5, 24, -0.104552531], [5, 25, -1.337767632], [5, 26, 0.872652751], [5, 27, 1.31979947], [5, 28, 1.308137764], [5, 29, 1.161157291], [5, 30, 1.161157291], [5, 31, 0.945665131], [5, 32, 1.915772559], [5, 33, 0.66985231], [5, 34, 1.594175858], [5, 35, 1.23523614], [5, 36, 0.991498813], [5, 37, 0.938244806], [5, 38, 0.745160715], [5, 39, 0.987244241], [5, 40, -0.645355527], [5, 41, 1.169547583], [5, 42, 0.850809683], [5, 43, 0.74077418], [5, 44, 1.266234176], [5, 45, 1.053226366], [5, 46, 1.008496489], [5, 47, 0.836715866], [5, 48, 0.963478026]]
          .map(function (item) {
            return [item[1], item[0], item[2] != null ? item[2] : '-'];
          });
      // 设置图表的配置
      myChart.setOption({
        title: {
          text: 'SPCgRNA method'
        },
        tooltip: {
          position: 'top',
          trigger: 'item'
        },
        grid: {
          height: '50%',
          top: '20%',

        },
        xAxis: {
          type: 'category',
          data: RNAName,
          name: 'miRNAName',
          splitArea: {
            show: true
          },
          axisLabel: {
            show: false // 设置为 false 隐藏横轴标签
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
          min: -1.5,
          max: 1.5,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '10%',
          inRange: {
            color: ["#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43","#f64e46"]
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
        }]
      });

      // 添加点击事件监听
      myChart.on('click', function (params) {
        const clickedRNA = RNAName[params.value[0]];
        const clickedSample = samples[params.value[1]];

        // 查找对应的 RNA 详细信息
        const details = rnaDetails.find(item => item.rna_names === clickedRNA);
        if (details) {
          selectedRNA.value = clickedRNA;
          selectedSample.value = clickedSample;
          selectedDetails.value = details;
          dialog.value = true;
        }
      });
    });

    return { echartsRef, dialog, selectedRNA, selectedSample, selectedDetails };
  }
};
</script>


<style scoped>
/* 这里可以加上一些样式 */
</style>

