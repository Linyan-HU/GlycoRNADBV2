<template>
  <div class="q-pa-md">
    <!-- Main Card Container -->
    <q-card flat bordered class="my-card text-left">
      <q-card-section>
        <!-- Introduction -->
        <h3>1. Introduction</h3>
        <p>This section will provide a brief introduction to GlycoRNA DataBase. By reading this section, you will learn about the information contained in our database, how to cite our database, and how to contact us.</p>
      </q-card-section>

      <!-- About GlycoRNA DataBase -->
      <q-card-section>
        <h4>1.1 About GlycoRNA DataBase</h4>
        <p>GlycoRNA DataBase provides information related to glycoRNA, mainly offering data on glycoRNA and the glycan modifications on it. For the RNA aspect of glycoRNA, GlycoRNA DataBase provides sequencing and differential expression data from multiple articles, sourced from both mice and humans across various cell lines. Additionally, GlycoRNA DataBase offers information on RNA structure and potential glycosylation sites for glycoRNA. On the glycan aspect, GlycoRNA DataBase provides mass spectrometry data collected from relevant articles, as well as diagrams illustrating glycan types and structures in 12 different human organs, facilitating the search for glycan information on glycoRNA. GlycoRNA DataBase continuously collects the latest research results on glycoRNA to keep you updated on recent advances in this field.</p>
      </q-card-section>

      <!-- Methods for database construction and data processing -->
      <q-card-section>
        <h4>1.2 Methods for database construction and data processing</h4>

          <h6  style="margin-left: 50px">Q: Where does our data come from?</h6>
           <q-img src="p1.png" alt="Image Description" class="image-placeholder"/>

          <h6  style="margin-left: 50px">Q: What does our data processing workflow look like?</h6>
           <q-img src="workflow.png" alt="Image Description" class="image-placeholder"/>

          <h6  style="margin-left: 50px">Q: How does GlycoRNA DataBase present the data?</h6>
          <q-img src="p3.png" alt="Image Description" class="image-placeholder" />

      </q-card-section>

      <!-- How to cite GlycoRNA DataBase -->
      <q-card-section>
        <h4>1.3 How to cite GlycoRNA DataBase</h4>
        <p>The article is being submitted.</p>
      </q-card-section>

      <!-- How to contact Us -->
      <q-card-section>
        <h4>1.4 How to contact Us</h4>
        <p>For any inquiries or concerns regarding GlycoRNA DataBase, please reach us at <em>zhengchx28@mail2.sysu.edu.cn</em>.</p>
      </q-card-section>
    </q-card>



    <q-card flat bordered class="my-card text-left">
      <q-card-section>
        <!-- Introduction -->
        <h3>2.User Tutorial</h3>
        <p>By reading this section, you will learn how to navigate and search for the information you need in GlycoRNA DataBase. Below, we have provided screenshots of various parts of the user interface, with key information highlighted in red boxes.</p>
      </q-card-section>

      <!-- About GlycoRNA DataBase -->
      <q-card-section>
        <h4>2.1 Datasets</h4>
        <p>GlycoRNA DataBase continuously collects the latest research results on glycoRNA to keep you updated on recent advances in this field.You can find these literature details in the "Datasets" section. This information includes the main content of the articles, their application directions, and the types and quantities of available data. By browsing the "Datasets" section, you will quickly access these information.
          Below are the operation diagrams.</p>
        <q-img src="HDATASETS.png" alt="Image Description" class="image-placeholder"/>
      </q-card-section>

      <!-- Methods for database construction and data processing -->
      <q-card-section>
        <h4>2.2 Sequence</h4>
        <p>For the RNA aspect of glycoRNA, GlycoRNA DataBase provide information on RNA sequences, structures, and their genomic loci. These data are derived from various cell lines of humans and mice and are detected using different methods, encompassing multiple types of RNA.
          You can find information on glycoRNA in the "Sequence" section.
          If you want to determine whether an RNA from human is likely to be glycosylated, you can click on "Sequence" and select the "Human" option to perform your search, like below.</p>
        <h5>GlycoRNA Database ID Naming Convention.</h5>
        <p>Each annotated glycosylated RNA was given an ID. In the GlycoRNA database, we used “glycoRNA” followed by a unique
          identification number  (e.g., glycoRNA-1, glycoRNA-2, ..., glycoRNA-518). If multiple transcripts of the same RNA type were identified as originating
          from different genomic loci, lowercase letters were appended to distinguish them (e.g., hsa-glycoRNA-21a, glycoRNA-21b). Additionally, a species-specific
          prefix was added to indicate the organism of origin—"hsa" for human and "mmu" for mouse—forming the final GlycoRNA ID (e.g., hsa-glycoRNA-1, mmu-glycoRNA-1).</p>
        <q-img src="name.png" alt="Image Description" class="image-placeholder"/>
        <q-img src="Sequence.png" alt="Image Description" class="image-placeholder"/>
        <p>Similarly, if the RNA you are looking for is from mice, you can perform similar operations.</p>
      </q-card-section>


      <q-card-section>
        <h4>2.3 Blast</h4>
        <p>GlycoRNA DataBase provide a local BLAST search tool that enables researchers to submit custom RNA sequences and compare them against our GlycoRNA database. </p>
        <q-img src="Blast.png" alt="Image Description" class="image-placeholder"/>
      </q-card-section>


      <q-card-section>
        <h4>2.4 Expression</h4>
        <p>GlycoRNA DataBase provides information on the differential expression of RNA from various cells or under different experimental treatments.You can browse these information in the "Expression" section.</p>
        <q-img src="Hexpression.png" alt="Image Description" class="image-placeholder"/>
        <q-img src="Bar.png" alt="Image Description" class="image-placeholder"/>
      </q-card-section>


      <!-- How to contact Us -->
      <q-card-section>
        <h4>2.5 JBROWSE</h4>
        <p>You can view their genomic loci in the "JBROWSE" section.</p>
        <q-img src="HJBROWSE.png" alt="Image Description" class="image-placeholder"/>
        <q-img src="HJBROWSE2.png" alt="Image Description" class="image-placeholder"/>
      </q-card-section>


    <q-card-section>
      <h4>2.6 Glycan information</h4>
      <p>For the glycan aspect of glycoRNA, GlycoRNA DataBase provides information on glycans including "Spectrum Index," "Mol. Formula," "Composition," and "Linkage." This allows you to understand the composition and structure of these glycans as well as view the original mass spectra. These data are sourced from 12 different human organs, including fat, muscle, testis, brain, heart, liver, lung, spleen, kidney, intestine, colon, and stomach. RPLC-MS/MS was used for the analysis and finally identified by N-glycan search engine GlySeeker. You can browse these information in the "Glycaninformation" section.Below are the operating instructions.</p>
      <q-img src="Hglycaninformation.png" alt="Image Description" class="image-placeholder"/>
    </q-card-section>


    <q-card-section>
      <h4>2.7 Download</h4>
      <p>You can download the data from the "Download" section.</p>
      <q-img src="HDOWNLOAD.png" alt="Image Description" class="image-placeholder"/>
    </q-card-section>

    </q-card>


    <q-card flat bordered class="my-card text-left">
      <q-card-section>
        <!-- Introduction -->
        <h3>3. Update & News</h3>
        <p>2024-2-15, preparation for constructing the "GlycoRNA DataBase" began, including collecting related articles and glycoRNA data and starting data processing.
          2024-4-9, single-cell data analysis was completed, and the framework of the website was constructed. </p>
        <p>2024-4-30, RNA-seq analysis was finished, data related to glycans on glycoRNA was reorganized, and continuous improvements to the database website were made. </p>
        <p>2024-5-22, the differential expression heatmap was completed, the latest papers in the field were organized, and ongoing construction of the database website continued. </p>
        <p>2024-6-4, RNA structures began to be drawn with glycosylation sites highlighted, and some article authors were contacted to correct existing data. </p>
        <p>2024-6-18, the website beautification and graphic creation were completed, and the RNA structure page was displayed. </p>
        <p>2024-6-25, further beautification and improvement of the website continued, and the "GlycoRNA DataBase" is online. </p>
      </q-card-section>



    </q-card>


  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GlycoRNAIntroduction',

  data() {
    return {
      // You can add any dynamic data here if needed
    }
  }
})
</script>

<style scoped>
.my-card {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}

h2, h3, h4, h5 {
  color: #333;
  margin-bottom: 30px;
  margin-left: 50px;
  margin-right: 50px;
}

p {
  margin-left: 50px;
  margin-right: 50px;
  font-size: 16px;

}

em {
  font-style: italic;
}

.qa-pa-sm {
  margin-left: 50px;
  margin-right: 50px;
}

.text-left {
  text-align: left;
}

</style>
