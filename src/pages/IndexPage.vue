<template>
  <div class="content-container q-pa-md row items-start q-gutter-md">
    <div class="left-side">
      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h4">Welcome to GlycoRNA Database!</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section style="font-size: larger">
          <strong>Welcome to GlycoRNA DataBase!</strong> This database provides information related to GlycoRNA.
          GlycoRNA refers to RNA molecules that are modified by glycans. They are present on the cell surface, influencing molecular
          recognition and being associated with autoimmune diseases. GlycoRNA typically comprises small RNAs, including tRNA, YRNA, snRNA, rRNA, and snoRNA.
          The GlycoRNA DataBase provides RNA sequence and structure information for GlycoRNA, as well as related glycan information.
          This database offers tools for researching GlycoRNA, providing users with the latest resources to facilitate a deeper understanding of GlycoRNA
          functions and mechanisms. Users can access the GlycoRNA DataBase to stay updated on the latest advancements in the field of glycoRNA research and
          obtain newly analyzed data related to glycoRNA.
        </q-card-section>
      </q-card>
      <div class="images">
        <img src="11.png" alt="home Image" class="home-image1" />
        <img src="Figure 1.png" alt="home Image" class="home-image" />
      </div>
    </div>


    <div class="right-side">
      <div class="cards-container">
        <q-card
          v-for="tool in tools"
          :key="tool.title"
          class="q-pa-sm q-mb-md custom-card"
        >
          <div class="d-flex align-items-center card-content">
            <q-img :src="tool.logo" :alt="tool.title" class="card-img"/>
            <h5 class="card-title">
              <router-link :to="tool.link" class="custom-link">{{ tool.title }}</router-link>
            </h5>
          </div>
          <p class="description">{{ tool.description }}</p>
        </q-card>
      </div>

      <div>
          <q-card class="q-pa-sm q-mb-md custom-card" style="background-color: #f8f8e5; width: 670px; height: 350px; margin-top: 20px; font-size: larger">
              <div class="card-content">
                  <p>GlycoRNA DB is under constant maintenance and improvement. Any questions about the usage, comments, or suggestions are appreciated.</p>
                  <p><strong>Lingling Zheng:</strong> <a style="color: midnightblue" href="mailto:zhengll33@mail.sysu.edu.cn">zhengll33@mail.sysu.edu.cn</a></p>
                  <p><strong>Chuxin Zheng:</strong> <a style="color: midnightblue" href="mailto:zhengchx28@mail2.sysu.edu.cn">zhengchx28@mail2.sysu.edu.cn</a></p>
                  <p><em>RNA Information Center, State Key Laboratory for Biocontrol, Sun Yat-sen University, Guangzhou 510275, P. R. China</em></p>
                      <p style="font-size: medium; line-height: 1.4;">
                          <strong>Cite:</strong><br>
                          Chuxin Zheng et al. <strong>GlycoRNAdb</strong>: a database of glycoRNA sequences, structures, abundance, and glycan information across tissues and cell lines,
                          <em>Nucleic Acids Research</em>, 2025;, gkaf1246,
                          <a style="color: midnightblue" href="https://doi.org/10.1093/nar/gkaf1246" target="_blank">https://doi.org/10.1093/nar/gkaf1246</a>
                      </p>
                  </div>

          </q-card>

      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      tools: [
        { title: 'DataSets', link: '/dataset', logo: 'dataset.png', description: 'Articles and data published about glycoRNAs so far.' },
        { title: 'Human Sequence', link: '/human', logo: 'humansequence.png', description: 'Display sequence, type, and sourceID in RNA Central…for human. ' },
        { title: 'Mouse Sequence', link: '/mouse', logo: 'mousesequence.png', description: 'Display sequence, type, and sourceID in RNA Central…for mouse. ' },
        { title: 'Structure', link: '/humanstructure/1', logo: 'ST.png', description: 'Display the specific sites of glycoRNA, and draw the structure of RNA and highlight the sites of glycosylation.' },
        { title: 'Expression', link: '/expression', logo: 'exp.png', description: 'Show differential RNA expression in various cells.' },
        { title: 'Jbrowse', link: '/jbrowser', logo: 'jb.png', description: 'Explore glycoRNA location on the genome.' },
        { title: 'Blast', link: '/blast', logo: 'blast1.png', description: 'A tool to determine whether the submitted RNA is potentially glycoRNA.' },
        { title: 'Glycaninformation', link: '/glypage', logo: 'gly.png', description: 'Provides information on glycans including "Spectrum Index," "Mol. Formula," "Composition," and "Linkage."' },
        { title: 'Download', link: '/download', logo: 'download.png', description: 'Provide downloadable files of data used in the database.' },
        { title: 'Help', link: '/help', logo: 'help.jpg', description: 'Provides detailed help on using the database.' },

      ]
    }
  }
})
</script>

<style scoped>
.content-container {
  width: 90%;
  margin: 0 auto; /* Center the container horizontally */
}

.images {
  text-align: center; /* Centers all images horizontally */
}


.left-side {
  flex: 2;
  margin-right: 20px;
}

.right-side {
  flex: 1;

}

.home-image1, .home-image {
  width: 100%;
  margin-bottom: 20px;
}

.home-image1 {

}


.home-image {
  display: block; /* Ensure it is a block-level element */
  max-height: 90%;
  max-width: 1500px;
  margin-left: auto; /* Center horizontally */
  margin-right: auto; /* Center horizontally */
  margin-top: -10px; /* Add top margin if needed */
  margin-bottom: 30px; /* Add bottom margin if needed */
}


.my-card {
  margin-top: 40px;
  margin-bottom: 20px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;

}

.custom-card {
  width: calc(50% - 10px);
  box-sizing: border-box;
  height: 305px; /* Adjust card height */
  padding: 15px; /* Add padding */
  border: 1px solid #ccc;
  overflow: hidden; /* Handle overflow */
  display: flex;
  flex-direction: column;
  margin-bottom: 5px; /* 减小卡片之间的垂直间距 */
}

.custom-link {
  color: midnightblue;
  text-decoration: none;
}

.custom-link:hover {
  color: #83a4d0;
  text-decoration: underline;
}

.card-img {
  width: 100%;
  height: 130px; /* Unified image height */
  object-fit: cover;
  margin-bottom: 10px;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  margin-bottom: 8px;
  font-size: 22px; /* Adjust title font size */
  font-weight: bold;
  margin-left: 15px;
  margin-top: 10px; /* Fix title position */
}

.description {
  font-size: 14px;
  margin-top: 5px; /* Fix description text position */
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.text-h4 {
  color: #2675ec; /* Set text color to green, adjust as needed */
}
</style>
