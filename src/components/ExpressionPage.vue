<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <div class="select-row">
        <q-btn-toggle
            v-model="model"
            spread
            no-caps
            toggle-color="blue-10"
            color="white"
            text-color="black"
            style="width: 700px; margin-left: 70px;"
            :options="[
            { label: 'Human', value: 'human' },
            { label: 'Mouse', value: 'mouse' }
          ]"
            @input="toggleHumanOption"
        />

        <div v-if="model === 'human'" class="custom-select" style="margin-top: 40px;">
          <span style="font-size: x-large">Celline：</span>
          <select v-model="humanOption" @change="toggleHumanOption">
            <option value="celline">H9 & HeLa</option>
            <option value="tissue">cancer cells＆normal cells</option>
          </select>
        </div>

        <div class="custom-select">
          <span for="view-option" style="font-size: x-large">View : </span>
          <select id="view-option" v-model="selectedOption" @change="toggleView">
            <option value="form">Form</option>
            <option value="heatmap">Heatmap</option>
          </select>
        </div>

        <div v-if="model === 'human' && selectedOption === 'form' && humanOption === 'tissue'" class="custom-select" style="margin-top: 40px;">
          <span style="font-size: x-large">Method：</span>
          <select v-model="humanMethod">
            <option value="SPCgRNA method">SPCgRNA</option>
            <option value="traditional method-kit">Traditional kit</option>
          </select>
        </div>



        <div v-if="model === 'human' && selectedOption === 'heatmap' && humanOption === 'celline'" class="custom-select" style="margin-top: 40px;">
          <span style="font-size: x-large">RNA Type：</span>
          <select v-model="selectedRNA" style="font-size: 18px;width: 200px;">
            <option value="snRNA">snRNA</option>
            <option value="miRNA">miRNA</option>
            <option value="pre_miRNA">pre_miRNA</option>
            <option value="snoRNA">snoRNA</option>
            <option value="scaRNA">scaRNA</option>
            <option value="otherRNA">otherRNA</option>
            <option value="tRNA">tRNA</option>
            <option value="RepeatRNA">Repetitive RNA</option>
          </select>
        </div>


        <div v-if="model === 'mouse' && selectedOption === 'heatmap'" class="custom-select" style="margin-top: 40px;">
          <span for="mouse-rna-type" style="font-size: x-large">RNA Type : </span>
          <select id="mouse-rna-type" v-model="selectedmouseRNA">
            <option value="tRNA">tRNA</option>
            <option value="Y_RNA">Y_RNA</option>
            <option value="miRNA">miRNA</option>
            <option value="ncRNA">ncRNA</option>
            <option value="pre_miRNA">pre_miRNA</option>
            <option value="rRNA">rRNA</option>
            <option value="sRNA">sRNA</option>
            <option value="snRNA">snRNA</option>
            <option value="snoRNA">snoRNA</option>
            <option value="other RNA">other RNA</option>
          </select>
        </div>






      </div>
    </div>



    <div class="content-container">
      <div class="side-card">
        <q-card class="my-card" style="margin-left: 70px; width: 230px">
          <q-card-section>
            <div class="text-h6">Abundance Guide</div>
            <div class="text-subtitle2">This page show abundance of glycoRNAs in both mouse and human.</div>
            <div class="text-subtitle2">For the mouse, abundance data are derived from neutrophils.</div>
            <div class="text-subtitle2">For the human, two datasets are included: </div>
            <div class="text-subtitle2"> 1. Ac4ManNAz-enriched small RNAs from HeLa and H9 cell lines.</div>
            <div class="text-subtitle2"> 2. SPCgRNA method enriched miRNAs in hTERT-HPNE and MIA PaCa-2 cancer cells.</div>
          </q-card-section>

          <q-tabs v-model="tab" class="text-teal">
            <q-tab label="Heatmap" name="one" />
            <q-tab label="Form" name="two" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="one">
              <div class="text-subtitle3" v-if="model === 'human' && humanOption === 'celline'">
                In the heatmaps for <strong>HeLa and H9</strong>, the <strong>x-axis</strong> represents <strong>RNA name and ID</strong>, and the <strong>y-axis</strong> corresponds to the two cell lines: <strong>H9 and HeLa</strong>.
                For each cell line, we calculated the RNA abundance in both input and enriched samples, and computed the <strong>log₂ fold change (log₂FC)</strong>.
                By clicking on the heatmap, you can switch between different RNAs and view their detailed <strong>RPM (Reads Per Million) values</strong>.
              </div>

              <div class="text-subtitle3" style="margin-top: 10px"  v-else-if="model === 'human' && humanOption === 'tissue'">
                In the heatmap for <strong>hTERT-HPNE cells (normal cells, NC, n = 3) and MIA PaCa-2 cells (cancer cells, CC, n = 3)</strong>,
                the x-axis represents miRNA names, and the y-axis means different samples.
                Click any point to view <strong>BaseMean, logFC, P.Value, and adj.P.Val.</strong>
                Red indicates higher abundance, blue indicates lower abundance.
              </div>

              <div class="text-subtitle3" style="margin-top: 10px"  v-if="model === 'mouse'">
                The heatmap displays detected abundance of glycoRNAs in <strong>mouse</strong>.
                The <strong>y-axis</strong> represents six distinct samples, including <strong>primary neutrophils (PMNs) from mouse BM</strong>, and differentiated or undifferentiated <strong>
                HOXB8 cell lines</strong>, treated with <strong>Biotin</strong>, <strong>WGA</strong>, or <strong>Biotin purified and PNGase digested (BioPNG)</strong> protocols.
                The <strong>x-axis</strong> represents RNA IDs.
                By clicking on the heatmap, you can switch between different RNAs and view their detailed <strong>RPM (Reads Per Million)</strong> values.
              </div>



            </q-tab-panel>

            <q-tab-panel name="two">
              <div class="text-subtitle3" v-if="model === 'human' && humanOption === 'celline'">
                In the <strong>H9 and HeLa form</strong>, we show the <strong>raw read counts</strong>, as well as the <strong>RPM</strong> and <strong>log2FC</strong> values.
                Each RNA is also annotated with its <strong>RNAcentral ID, type, and name</strong>.
              </div>

              <div class="text-subtitle3" v-else-if="model === 'human' && humanOption === 'tissue'">
                The form for <strong>hTERT-HPNE and MIA PaCa-2 cells</strong> displays the abundance of different miRNAs across three replicates for each cell line,
                including <strong>raw read counts, log₂ fold changes (log₂FC)</strong>, and <strong>adjusted P-values (adj.P.Val)</strong>.
              </div>

              <div class="text-subtitle3" v-else-if="model === 'mouse'">
                The form displays abundance of glycoRNAs in mouse. The table shows whether glycoRNAs are enriched or not <strong>(1-enriched, 0-not enriched)</strong>
                in different enrichment methods with different cell lines, and their <strong>p-values</strong>.
              </div>
            </q-tab-panel>

          </q-tab-panels>
        </q-card>
      </div>




      <div class="main-content" style="width: 1350px">
        <div v-if="model === 'mouse' && selectedOption === 'heatmap'" class="heatmap-container" style="margin-top: 50px">
          <heatmap1 v-if="selectedmouseRNA === 'tRNA'"></heatmap1>
          <heatmap2 v-if="selectedmouseRNA === 'Y_RNA'"></heatmap2>
          <heatmap3 v-if="selectedmouseRNA === 'miRNA'"></heatmap3>
          <heatmap6 v-if="selectedmouseRNA === 'ncRNA'"></heatmap6>
          <heatmap7 v-if="selectedmouseRNA === 'pre_miRNA'"></heatmap7>
          <heatmap8 v-if="selectedmouseRNA === 'rRNA'"></heatmap8>
          <heatmap9 v-if="selectedmouseRNA === 'sRNA'"></heatmap9>
          <heatmap10 v-if="selectedmouseRNA === 'snRNA'"></heatmap10>
          <heatmap11 v-if="selectedmouseRNA === 'snoRNA'"></heatmap11>
          <heatmap12 v-if="selectedmouseRNA === 'other RNA'"></heatmap12>
        </div>

        <div v-if="model === 'human' && selectedOption === 'heatmap' && humanOption === 'celline'" class="heatmap-container"  style="margin-top: 50px">
          <heatmap13 v-if="selectedRNA === 'snRNA'" :initialRNA="initialRNAId" />
          <heatmap14 v-if="selectedRNA === 'miRNA'"></heatmap14>
          <heatmap15 v-if="selectedRNA === 'pre_miRNA'"></heatmap15>
          <heatmap16 v-if="selectedRNA === 'rRNA'"></heatmap16>
          <heatmap17 v-if="selectedRNA === 'snoRNA'"></heatmap17>
          <heatmap18 v-if="selectedRNA === 'scaRNA'"></heatmap18>
          <heatmap19 v-if="selectedRNA === 'otherRNA'"></heatmap19>
          <heatmap20 v-if="selectedRNA === 'tRNA'"></heatmap20>
          <heatmap21 v-if="selectedRNA === 'RepeatRNA'"></heatmap21>
        </div>

        <div v-if="model === 'human' && selectedOption === 'heatmap' && humanOption === 'tissue'" class="heatmap-container" style="margin-top: 20px;">
          <heatmap4></heatmap4>
          <heatmap5></heatmap5>
        </div>

        <div v-else-if="model === 'mouse' && selectedOption === 'form' && !showMouse" class="form-container" style="margin-top: 20px">
          <FormComponent></FormComponent>
        </div>

        <div v-else-if="model === 'human' && selectedOption === 'form' && humanOption === 'tissue' && !showTable" class="form-container" style="margin-top: 20px">
          <FormHuman></FormHuman>
        </div>

        <div v-else-if="model === 'human' && selectedOption === 'form' && humanOption === 'celline'" class="form-container" style="margin-top: 20px">
          <FormCell></FormCell>
        </div>

        <div v-else-if="showTable" class="table-container" style="margin-top: 20px">
          <TableComponent :filter-method="humanMethod"></TableComponent>
        </div>

        <div v-else-if="showMouse" class="table-container" style="margin-top: 20px">
          <MouseTable :filter-method="mouseRNAType"></MouseTable>
        </div>
      </div>
    </div>
  </div>


</template>


<script>
import Heatmap1 from './tRNA.vue'
import Heatmap2 from './YRNA.vue'
import Heatmap3 from './miRNA.vue'
import FormComponent from './MouseForm.vue'
import Heatmap4 from './HumanSPC.vue'
import Heatmap5 from './HumanTrad.vue'
import Heatmap6 from './ncRNA.vue'
import Heatmap7 from './premiRNA.vue'
import Heatmap8 from './rRNA.vue'
import Heatmap9 from './sRNA.vue'
import Heatmap10 from './snRNA.vue'
import Heatmap11 from './snoRNA.vue'
import Heatmap12 from './otherRNA.vue'
import Heatmap13 from './HsnRNA.vue'
import Heatmap14 from './HmiRNA.vue'
import Heatmap15 from './HpremiRNA.vue'
import Heatmap16 from './HrRNA.vue'
import Heatmap17 from './HsnoRNA.vue'
import Heatmap18 from './HsscaRNA.vue'
import Heatmap19 from './HotherRNA.vue'
import Heatmap20 from './HtRNA.vue'
import Heatmap21 from './HYRNA.vue'
import FormHuman from './SPChomodiffForm.vue'
import FormCell from './H9HelaForm.vue'
import { useRoute } from 'vue-router';
import TableComponent from './SPChomodiffForm.vue' // 导入表格组件
import MouseTable from './MouseForm.vue' // 导入表格组件
import { ref, watch } from 'vue'

export default {
  components: {
    Heatmap1,
    Heatmap2,
    Heatmap3,
    FormComponent,
    Heatmap4,
    Heatmap5,
    Heatmap6,
    Heatmap7,
    Heatmap8,
    Heatmap9,
    Heatmap10,
    Heatmap11,
    Heatmap12,
    Heatmap13,
    Heatmap14,
    Heatmap15,
    Heatmap16,
    Heatmap17,
    Heatmap18,
    Heatmap19,
    Heatmap20,
    Heatmap21,
    FormHuman,
    FormCell,
    TableComponent, // 注册表格组件
    MouseTable,
  },
  setup() {
    const model = ref(localStorage.getItem('model') || 'human');
    const selectedOption = ref(localStorage.getItem('selectedOption') || 'heatmap');
    const humanOption = ref(localStorage.getItem('humanOption') || 'celline');
    const humanMethod = ref(localStorage.getItem('humanMethod') || '');
    const mouseRNAType = ref(localStorage.getItem('mouseRNAType') || '');
    const showTable = ref(false);
    const showMouse = ref(false);
    const selectedRNA =  ref(localStorage.getItem('selectedRNA') || 'snRNA');
    const selectedmouseRNA = ref(localStorage.getItem('selectedmouseRNA') || 'Y_RNA');
    const route = useRoute();
    const initialRNAId = route.query.rna || null;

    //让用户刷新页面后保留选择
    watch(selectedRNA, (newVal) => {
      localStorage.setItem('selectedRNA', newVal);
    });
    watch(model, (val) => localStorage.setItem('model', val));
    watch(selectedOption, (val) => localStorage.setItem('selectedOption', val));
    watch(humanOption, (val) => localStorage.setItem('humanOption', val));
    watch(humanMethod, (val) => localStorage.setItem('humanMethod', val));
    watch(mouseRNAType, (val) => localStorage.setItem('mouseRNAType', val));
    watch(selectedRNA, (val) => localStorage.setItem('selectedRNA', val));
    watch(selectedmouseRNA, (val) => localStorage.setItem('selectedmouseRNA', val));


    const toggleHumanOption = () => {
      // Handle the toggle logic for human option
    };

    const toggleView = () => {
      // Handle the toggle logic here
    };

    watch([model, selectedOption, humanOption, humanMethod], () => {
      showTable.value = model.value === 'human' && selectedOption.value === 'form' && humanOption.value === 'tissue' && humanMethod.value !== '';
    });

    watch([model, selectedOption, mouseRNAType], () => {
      showMouse.value = model.value === 'mouse' && selectedOption.value === 'form' && mouseRNAType.value !== '';
    });



    return {
      model,
      selectedOption,
      humanOption,
      humanMethod,
      showTable,
      toggleView,
      toggleHumanOption,
      mouseRNAType,
      MouseTable,
      showMouse,
      selectedRNA, // 默认选择 snRNA
      selectedmouseRNA,
      initialRNAId,
      tab: ref('one')
    };
  },
};
</script>



<style scoped>
.q-pa-md {
  margin-top: 20px;
}

.content-container {
  display: flex;
}

.my-card {
  flex: 0 0 120px; /* 固定宽度为200px */
  margin-right: 30px; /* 卡片与主内容间距 */
}

.heatmap-container,
.form-container,
.table-container {
  flex: 1;
  margin-bottom: 50px;
}

.custom-select {
  position: relative;
  display: inline-block;
  margin-left: 70px;
  margin-top: 20px;
}

.custom-select select {
  padding: 12px 35px 12px 15px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  width: 180px;
}

.my-card {
  width: 100%;
  margin-top: 20px;
}



@media (max-width: 768px) {
  .content-container {
    flex-direction: column; /* 在小屏幕上垂直排列 */
  }

  .side-card {
    margin-right: 0; /* 取消卡片与主内容间距 */
  }

  .main-content {
    flex: 1 1 100%; /* 主内容区域在小屏幕上占据100%宽度 */
  }
}


</style>
