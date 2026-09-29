<template>
  <div class="container download-page">
  <q-splitter v-model="splitterModel" style="height: 250px">
      <template v-slot:before>
        <div class="q-pa-md">
          <q-tree
              :nodes="simple"
              node-key="label"
              selected-color="primary"
              v-model:selected="selected"
              default-expand-all
              :no-nodes-label="false"
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
            v-model="selected"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
        >
          <q-tab-panel name="Sequence">
            <div class="text-h4 q-mb-md">Sequence</div>
            <p>Here, we provide sequence data from our own analyses and the results from articles on human and mouse.</p>
            <q-btn label="Download Sequence Data" color="primary" :href="sequenceDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="Our process for mouse">
            <div class="text-h4 q-mb-md">Our process for mouse</div>
            <p>Here, we provide glycoRNA-seq data results from our own analyses of GSE224128 datasets.</p>
            <q-btn label="Download Mouse Data" color="primary" :href="mouseDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="Human GlycoRNA annotation">
            <div class="text-h4 q-mb-md">Human GlycoRNA annotation</div>
            <p>Here we provide an exhaustive annotation of all glycoRNAs using both RNA Central as
              well as the annotation information in ensembl.The zip file includes both non-repeat RNA and repeat RNAs.</p>
            <q-btn label="Download Human GlycoRNA annotation" color="primary" :href="humanDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="Human RT stop file">
            <div class="text-h4 q-mb-md">Human RT stop file</div>
            <p>Here, we provide the raw files of RT stop sites identified from the human dataset GSE136967 using Fasta-iCLIP analysis.</p>
            <q-btn label="Download Human Data" color="primary" :href="humanDownloadLink1" download/>
          </q-tab-panel>

          <q-tab-panel name="Mouse">
            <div class="text-h4 q-mb-md">Mouse</div>
            <p>Here, we provide glycoRNA-seq data results of GSE224128 datasets.</p>
            <q-btn label="Download Mouse Data" color="primary" :href="mouseDownloadLink1" download/>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>

    <!-- 第二个树结构 -->
    <q-splitter v-model="splitterModel2" style="height: 300px">
      <template v-slot:before>
        <div class="q-pa-md">
          <q-tree
              :nodes="simple2"
              node-key="label"
              selected-color="primary"
              v-model:selected="selected2"
              default-expand-all
              :no-nodes-label="false"
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
            v-model="selected2"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
        >
          <q-tab-panel name="Expression">
            <div class="text-h4 q-mb-md">Expression</div>
            <p>Here we provide data on the different methods used and the differential expression of RNA in different species.</p>
            <q-btn label="Download all expression Data" color="primary" :href="ExpressionDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="Human H9 and Hela differential expression RNA">
            <div class="text-h4 q-mb-md">Human H9 and Hela differential expression RNA</div>
            <p>Here, we provide the differential expression data of small RNAs enriched using the Ac4ManNAz method in HeLa and H9 cells.</p>
            <q-btn label="Download Human differential expression RNA Data" color="primary" :href="ExpressionHumanDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="Human 12 tissue differential expression RNA">
            <div class="text-h4 q-mb-md">Human 12 tissue differential expression RNA</div>
            <p>Here, we provide differential expression data of glycosylated-miRNA by SPCgRNA method.</p>
            <q-btn label="Download Human 12 tissue differential expression RNA Data" color="primary" :href="ExpressionHumanDownloadLink1" download/>
          </q-tab-panel>

          <q-tab-panel name="Mouse differential expression RNA">
            <div class="text-h4 q-mb-md">Mouse differential expression RNA</div>
            <p>Here, we provide different small RNAs differentially expressed in mouse neutrophil.</p>
            <q-btn label="Download Mouse differential expression RNA Data" color="primary" :href="ExpressionMouseDownloadLink" download/>
          </q-tab-panel>


        </q-tab-panels>
      </template>
    </q-splitter>


    <!-- 第三个树结构 -->
    <q-splitter v-model="splitterModel3" style="height: 300px">
      <template v-slot:before>
        <div class="q-pa-md">
          <q-tree
              :nodes="simple3"
              node-key="label"
              selected-color="primary"
              v-model:selected="selected3"
              default-expand-all
              :no-nodes-label="false"
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
            v-model="selected3"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
        >
          <q-tab-panel name="Glycaninformation">
            <div class="text-h4 q-mb-md">Glycaninformation</div>
            <p>Here, we provide mass spectrometry data and sugar structure information of N-glycoRNA from 12 different organs.</p>
            <q-btn label="Download Another Sequence Data" color="primary" :href="GlycaninformationDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="brain">
            <div class="text-h4 q-mb-md">brain</div>
            <p>N-glycans of glycoRNA in brain.</p>
            <q-btn label="Download brain Data" color="primary" :href="brainDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="colon">
            <div class="text-h4 q-mb-md">colon</div>
            <p>N-glycans of glycoRNA in colon.</p>
            <q-btn label="Download colon Data" color="primary" :href="colonDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="fat">
            <div class="text-h4 q-mb-md">fat</div>
            <p>N-glycans of glycoRNA in fat.</p>
            <q-btn label="Download fat Data" color="primary" :href="fatDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="heart">
            <div class="text-h4 q-mb-md">heart</div>
            <p>N-glycans of glycoRNA in heart.</p>
            <q-btn label="Download heart Data" color="primary" :href="heartDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="intestine">
            <div class="text-h4 q-mb-md">intestine</div>
            <p>N-glycans of glycoRNA in intestine.</p>
            <q-btn label="Download intestine Data" color="primary" :href="intestineDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="kidney">
            <div class="text-h4 q-mb-md">kidney</div>
            <p>N-glycans of glycoRNA in kidney.</p>
            <q-btn label="Download kidney Data" color="primary" :href="kidneyDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="liver">
            <div class="text-h4 q-mb-md">liver</div>
            <p>N-glycans of glycoRNA in liver.</p>
            <q-btn label="Download liver Data" color="primary" :href="liverDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="lung">
            <div class="text-h4 q-mb-md">lung</div>
            <p>N-glycans of glycoRNA in lung.</p>
            <q-btn label="Download lung Data" color="primary" :href="lungDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="muscle">
            <div class="text-h4 q-mb-md">muscle</div>
            <p>N-glycans of glycoRNA in muscle.</p>
            <q-btn label="Download muscle Data" color="primary" :href="muscleDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="spleen">
            <div class="text-h4 q-mb-md">spleen</div>
            <p>N-glycans of glycoRNA in spleen.</p>
            <q-btn label="Download spleen Data" color="primary" :href="spleenDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="stomach">
            <div class="text-h4 q-mb-md">stomach</div>
            <p>N-glycans of glycoRNA in stomach.</p>
            <q-btn label="Download stomach Data" color="primary" :href="stomachDownloadLink" download/>
          </q-tab-panel>

          <q-tab-panel name="testis">
            <div class="text-h4 q-mb-md">testis</div>
            <p>N-glycans of glycoRNA in testis.</p>
            <q-btn label="Download testis Data" color="primary" :href="testisDownloadLink" download/>
          </q-tab-panel>

        </q-tab-panels>
      </template>
    </q-splitter>

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      splitterModel: ref(50),
      selected: ref('Sequence'),
      sequenceDownloadLink: '/download/sequence.zip',
      mouseDownloadLink: '/download/mouse.zip',
      humanDownloadLink: '/download/human.zip',
      mouseDownloadLink1: '/download/GSE224128.zip',
      humanDownloadLink1: '/download/GSE136967_RAW.zip',

      simple: [
        {
          label: 'Sequence',
          children: [
            {
              label: 'Our process for mouse',
              icon: 'pest_control_rodent'
            },
            {
              label: 'Human GlycoRNA annotation',
              icon: 'boy'
            },
            {
              label: 'Human RT stop file',
              icon: 'boy'
            },
            {
              label: 'Mouse',
              icon: 'pest_control_rodent'
            }
          ]
        }
      ],
// 第二个树结构相关数据
      splitterModel2: ref(50),
      selected2: ref('Expression'),
      ExpressionDownloadLink: '/download/Expression.zip',
      ExpressionHumanDownloadLink: '/download/expression_human.zip',
      ExpressionHumanDownloadLink1: '/download/miRNA_expression.zip',
      ExpressionMouseDownloadLink: '/download/mus_ncRNA_enriched_expression.zip',

      simple2: [
        {
          label: 'Expression',
          children: [
            {
              label: 'Human H9 and Hela differential expression RNA',
              icon: 'boy'
            },
            {
              label: 'Human 12 tissue differential expression RNA',
              icon: 'boy'
            },
            {
              label: 'Mouse differential expression RNA',
              icon: 'pest_control_rodent'
            },
          ]
        }
      ],
      // 第三个树结构相关数据
      splitterModel3: ref(50),
      selected3: ref('Glycaninformation'),
      GlycaninformationDownloadLink: '/download/Glycaninformation.zip',
      brainDownloadLink: '/download/brain.zip',
      colonDownloadLink: '/download/colon.zip',
      fatDownloadLink: '/download/fat.zip',
      heartDownloadLink: '/download/heart.zip',
      intestineDownloadLink: '/download/intestine.zip',
      kidneyDownloadLink: '/download/kidney.zip',
      liverDownloadLink: '/download/liver.zip',
      lungDownloadLink: '/download/lung.zip',
      muscleDownloadLink: '/download/muscle.zip',
      spleenDownloadLink: '/download/spleen.zip',
      stomachDownloadLink: '/download/stomach.zip',
      testisDownloadLink: '/download/testis.zip',


      simple3: [
        {
          label: 'Glycaninformation',
          children: [
            {
              label: 'brain',
              icon: 'download'
            },
            {
              label: 'colon',
              icon: 'download'
            },
            {
              label: 'fat',
              icon: 'download'
            },
            {
              label: 'heart',
              icon: 'download'
            },
            {
              label: 'intestine',
              icon: 'download'
            },
            {
              label: 'kidney',
              icon: 'download'
            },
            {
              label: 'liver',
              icon: 'download'
            },
            {
              label: 'lung',
              icon: 'download'
            },
            {
              label: 'muscle',
              icon: 'download'
            },
            {
              label: 'spleen',
              icon: 'download'
            },
            {
              label: 'stomach',
              icon: 'download'
            },
            {
              label: 'testis',
              icon: 'download'
            },

          ]
        }
      ],



    }
  }
}
</script>




<style>
.container {
  margin-top: 30px;
  align-items: center;
  width: 70%;
  margin-left: 30px;
}

.q-splitter {
  min-width: 20%;
  max-width: 80%;
}
.q-tree {
  min-width: 100px; /* Adjust the minimum width as needed */
}

.download-page {
  padding-bottom: 50px; /* Add padding to avoid footer overlapping content */
}
</style>


