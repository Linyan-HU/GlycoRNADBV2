<template>
  <div class="q-pa-md row">

    <!-- Left-side q-card -->
    <q-card class="q-mr-md" style="width: 300px;margin-top: 50px; height: 900px; margin-left: 80px; margin-right: -20px">
      <q-card-section>
        <div class="text-h6">Glycan Information Guide</div>
        <div class="text-subtitle2" style="margin-top: 15px">
          <p style="color: #162673; margin-bottom: 5px; font-size: 18px">
            On this page, we show some information about the glycans in glycoRNAs.
          </p>
          <p style="margin-bottom: 10px; margin-top: 10px; font-size: 16px">
            Firstly, at the top of the page, you can select one of the <strong>twelve tissues</strong> and view their N-glycans information, which is presented in a table with four sections:
            <strong>‘Spectrum Index,’ ‘Mol. Formula,’ ‘Composition,’ and ‘Linkage.’</strong>
          </p>
          <p style="margin-bottom: 10px; margin-top: 10px; font-size: 16px">
            For each glycan chain, you can click the <strong>‘LOAD IMAGES’</strong> button on the right side to view the original MS map, and we also display the structure information of the glycan chain together.
          </p>
          <p style="margin-bottom: 10px; margin-top: 10px; font-size: 16px">
            At the same time, we also show the structure information of the sugar chain. <strong>What type of sugar each icon represents</strong> is also explained at the bottom.
          </p>
          <p style="color: #571024; margin-bottom: 0; margin-top: 10px; font-size: 16px">
            Click the button below to jump to the source paper of the data:
          </p>
          <p style="color: #cb1a1a; margin-bottom: 0; margin-top: 10px; font-size: 16px">
            Disclaimer: Most glycan linkage annotations in this database are computationally inferred rather than directly measured.
            Only selected cases, such as certain fucosylation and sialylation linkages, have experimental validation from LC–MS/MS diagnostic evidence.
          </p>
        </div>
        <q-card-actions>
          <q-btn
            label="Read More"
            color="primary"
            @click="redirectToLink"
            style="width: 100%; margin-top: 10px;"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>

    <!-- Main Content -->
    <div style="flex: 1;">
      <div class="icon-container row justify-center">
        <div v-for="icon in icons" :key="icon.title" class="icon-item"
             @click="loadTissueData(icon.title)"
             @mouseover="highlightIcon(icon.title)"
             @mouseleave="unhighlightIcon(icon.title)"
             :class="{ 'highlighted': icon.title === selectedTissue }">
          <q-img :src="icon.path" :alt="icon.title" class="icon-img" />
          <div class="text-center">{{ icon.title }}</div>
        </div>
      </div>
      <tissue-form v-if="selectedTissue" :tissue="selectedTissue" />

    </div>

  </div>
</template>


<script>
import TissueForm from './TissueForm.vue';

export default {
  components: {
    TissueForm
  },
  data() {
    return {
      icons: [
        { path: 'icons/lipid.png', title: 'Fat' },
        { path: 'icons/brain.png', title: 'Brain' },
        { path: 'icons/colon.png', title: 'Colon' },
        { path: 'icons/heart.png', title: 'Heart' },
        { path: 'icons/intestine.png', title: 'Intestine' },
        { path: 'icons/kidneys.png', title: 'Kidney' },
        { path: 'icons/liver.png', title: 'Liver' },
        { path: 'icons/lungs.png', title: 'Lung' },
        { path: 'icons/muscle.png', title: 'Muscle' },
        { path: 'icons/spleen.png', title: 'Spleen' },
        { path: 'icons/stomach.png', title: 'Stomach' },
        { path: 'icons/testis.png', title: 'Testis' }
      ],
      selectedTissue: 'Fat',
      leftDrawerOpen: true,  // 控制左侧栏的开关状态
    };
  },
  methods: {
    loadTissueData(tissue) {
      this.selectedTissue = tissue;
    },
    highlightIcon(tissue) {
      // Optional: Add logic if needed when icon is hovered
    },
    unhighlightIcon(tissue) {
      // Optional: Add logic if needed when icon is no longer hovered
    },
    redirectToLink() {
      window.open('https://www.biorxiv.org/content/10.1101/2023.09.18.558371v1', '_blank');
    },
  }
};
</script>

<style scoped>
.icon-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px; /* Adjust the gap between items */
  margin-top: 40px;
}

.icon-item {
  text-align: center;
}

.icon-img {
  width: 50px;
  height: 50px;
}


.icon-item:hover {
  transform: scale(1.1); /* Example: Increase size on hover */
  cursor: pointer; /* Change cursor to pointer (hand) */
}

.highlighted {
  border: 2px solid #ffcc00; /* 亮黄色边框作为高亮 */
  box-shadow: 0 0 10px rgba(255, 204, 0, 0.5); /* 可选：为边框添加阴影 */
  transition: border 0.3s ease, box-shadow 0.3s ease; /* 添加过渡效果 */
  padding: 3px; /* 内边距，增加内容与边框的距离 */
}


</style>

