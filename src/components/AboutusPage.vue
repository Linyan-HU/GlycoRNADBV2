<template>
  <div class="q-pa-md" style="margin-top: 20px;">
  <q-page class="q-pa-md flex flex-center" style="margin-top: 10px; margin-bottom: 30px; width: 85%; margin-left: auto; margin-right: auto;">
    <div class="contact-us">
      <q-card class="q-pa-lg shadow-2">
        <!-- Contact Us content -->
        <div class="row">
          <div class="col-12 col-md-8">
            <h3 class="text-primary">Contact Us</h3>
            <p class="contact-info">
              <strong>
                GlycoRNA DB is under constant maintenance and improvement. Any questions about the usage, comments, or suggestions are appreciated.
              </strong>
            </p>
            <p class="contact-info">
              <strong>Lingling Zheng: </strong>
              <a href="mailto:zhengll33@mail.sysu.edu.cn" style="text-decoration: none;">zhengll33@mail.sysu.edu.cn</a>
              <br>RNA Information Center, State Key Laboratory for Biocontrol, Sun Yat-sen University, Guangzhou 510275, P. R. China
            </p>
            <p class="contact-info">
              <strong>Chuxin Zheng: </strong>
              <a href="mailto:zhengchx28@mail2.sysu.edu.cn" style="text-decoration: none;">zhengchx28@mail2.sysu.edu.cn</a>
              <br>RNA Information Center, State Key Laboratory for Biocontrol, Sun Yat-sen University, Guangzhou 510275, P. R. China
            </p>
          </div>
          <div class="col-12 col-md-4 text-center"></div>
        </div>
      </q-card>

      <q-card class="q-pa-lg shadow-2 q-mt-md">
        <!-- Our Tools content -->
        <h3 class="text-primary">Our Tools</h3>
        <p>
          <strong>
            In addition to GlycoRNA DB, we have developed several databases and software to investigate the biological functions and mechanisms of various RNA in biological processes.
          </strong>
        </p>

        <div class="row q-mt-md justify-center">
          <!-- Loop through tools and display cards -->
          <div class="col-12 col-sm-6 col-md-4" v-for="(tool, index) in tools" :key="index">
            <q-card class="q-pa-sm q-mb-md custom-card">
              <div class="d-flex align-items-center">
                <q-img :src="tool.logo" :alt="tool.title" width="100px" class="q-mr-sm"/>
                <h5>
                  <a :href="tool.link" target="_blank">{{ tool.title }}</a>
                </h5>
              </div>
              <p>{{ tool.description }}</p>
            </q-card>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
  data() {
    return {
      tools: [
        {
          title: "ENCORI",
          link: "http://starbase.sysu.edu.cn/index.php",
          description: "A database for exploring miRNA-mRNA and miRNA-ncRNA interaction maps from Argonaute and other RBP CLIP-Seq data.",
          logo: "/DBlogo/starBase_logo.png"
        },
        {
          title: "RMBase",
          link: "http://rna.sysu.edu.cn/rmbase3/",
          description: "Deciphering the Map of RNA Modifications from Epitranscriptome Sequencing Data.",
          logo: "/DBlogo/rmBaseLogo.png"
        },
        {
          title: "dreamBase",
          link: "http://rna.sysu.edu.cn/dreamBase/",
          description: "DNA modification, RNA regulation and protein binding of expressed pseudogenes in human health and disease.",
          logo: "/DBlogo/contact-dreambase-logo.png"
        },
        {
          title: "deepBase v3.0",
          link: "https://rna.sysu.edu.cn/deepbase3/",
          description: "Identification, expression, evolution and function of small RNAs, LncRNAs and circular RNAs from deep-sequencing data.",
          logo: "/DBlogo/deepbase3.png"
        },
        {
          title: "ChIPBase v3.0",
          link: "https://rnasysu.com/chipbase3/index.php",
          description: "Decoding transcriptional regulatory networks of non-coding RNAs and protein-coding genes from ChIP-seq data.",
          logo: "/DBlogo/contact-chipbase-logo.png"
        },
        {
          title: "tmodBase",
          link: "https://www.tmodbase.com/#/",
          description: "Deciphering the landscape of tRNA modifications and their dynamic changes from epitranscriptome data.",
          logo: "/DBlogo/tModBase.png"
        },
        {
          title: "StarScan",
          link: "http://mirlab.sysu.edu.cn/starscan/index.php",
          description: "A web server for scanning small RNA targets from degradome sequencing data.",
          logo: "/DBlogo/contact-starscan-logo.png"
        },
        {
          title: "Pol3Base",
          link: "https://rna.sysu.edu.cn/pol3base/index.php",
          description: "A resource for decoding the interactome, expression, evolution, epitranscriptome and disease variations of Pol III-transcribed ncRNAs.",
          logo: "/DBlogo/Pol3Base.png"
        },
        {
          title: "tRF2Cancer",
          link: "https://rna.sysu.edu.cn/tsRFun/",
          description: "A web server to detect tRNA-derived small RNA fragments (tRFs) and their expression in multiple cancers.",
          logo: "/DBlogo/contact-tRF2Cancer-logo.png"
        }
      ]
    };
  }
};
</script>

<style scoped>
.custom-card {
  height: 90%;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}


.q-mr-sm {
  margin-right: 8px;
}

@media (max-width: 768px) {
  .custom-card {
    width: 100%;
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.justify-center {
  justify-content: center;
}
</style>
