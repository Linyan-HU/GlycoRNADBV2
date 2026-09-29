const tracks = [
  {
    type: 'FeatureTrack',
    trackId: 'genes',
    name: 'GRCh38',
    assemblyNames: ['GRCh38'],
    category: ['Annotion'],
    adapter: {
      type: 'Gff3TabixAdapter',
      gffGzLocation: {
        uri: 'http://1.12.236.3:5000/files/homo_sapiens.GRCh38.gff3.gz',
      },
      index: {
        location: {
          uri: 'http://1.12.236.3:5000/files/homo_sapiens.GRCh38.gff3.gz.tbi',
        },
      },
    },
  },

  {
    type: 'FeatureTrack',
    trackId: 'mousegenes',
    name: 'GRCm39',
    assemblyNames: ['GRCm39'],
    category: ['Annotion'],
    adapter: {
      type: 'Gff3TabixAdapter',
      gffGzLocation: {
        uri: 'http://1.12.236.3:5000/files/mus_musculus.GRCm39.gff3.gz',
      },
      index: {
        location: {
          uri: 'http://1.12.236.3:5000/files/mus_musculus.GRCm39.gff3.gz.tbi',
        },
      },
    },
  },



  {
    type: 'QuantitativeTrack',
    trackId:
      'H9_mannaz-enrich_rtstops_plus',
    name: 'GSM4064123_H9_ManNAz-Enrich_RTstops_plus',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BigWigAdapter',
      bigWigLocation: {
        uri: 'http://1.12.236.3:5000/files/GSM4064123_HS_H9_SmallRNA_ManNAz-Enrich_RTstops_plus.bw',
        locationType: 'UriLocation',
      },
      displays: [
  {
    type: "LinearWiggleDisplay",
    displayId: "H9_mannaz-enrich_rtstops_plus"
  },
  ]
    },
  },



  {
    type: 'QuantitativeTrack',
    trackId:
      'H9_mannaz-enrich_rtstops_minus',
    name: 'GSM4064123_H9_ManNAz-Enrich_RTstops_minus',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BigWigAdapter',
      bigWigLocation: {
        uri: 'http://1.12.236.3:5000/files/GSM4064123_HS_H9_SmallRNA_ManNAz-Enrich_RTstops_minus.bw',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "H9_mannaz-enrich_rtstops_minus"
        },
      ]
    },
  },
  {
    type: 'QuantitativeTrack',
    trackId:
      'H9_Input_RTstops_plus',
    name: 'GSM4064122_H9_Input_RTstops_plus',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BigWigAdapter',
      bigWigLocation: {
        uri: 'http://1.12.236.3:5000/files/GSM4064122_HS_H9_SmallRNA_Input_RTstops_plus.bw',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "H9_Input_RTstops_plus"
        },
      ]
    },
  },
  {
    type: 'QuantitativeTrack',
    trackId:
      'H9_Input_RTstops_minus',
    name: 'GSM4064122_H9_Input_RTstops_minus',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BigWigAdapter',
      bigWigLocation: {
        uri: 'http://1.12.236.3:5000/files/GSM4064122_HS_H9_SmallRNA_Input_RTstops_minus.bw',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "H9_Input_RTstops_minus"
        },
      ]
    },
  },
  {
    type: 'QuantitativeTrack',
    trackId:
      'HeLa_ManNAz-Enrich_RTstops_plus',
    name: 'GSM4064121_HeLa_ManNAz-Enrich_RTstops_plus',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BigWigAdapter',
      bigWigLocation: {
        uri: 'http://1.12.236.3:5000/files/GSM4064121_HS_HeLa_SmallRNA_ManNAz-Enrich_RTstops_plus.bw',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "HeLa_ManNAz-Enrich_RTstops_plus"
        },
      ]
    },
  },
  {
    type: 'QuantitativeTrack',
    trackId:
      'HeLa_ManNAz-Enrich_RTstops_minus',
    name: 'GSM4064121_HeLa_ManNAz-Enrich_RTstops_minus',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BigWigAdapter',
      bigWigLocation: {
        uri: 'http://1.12.236.3:5000/files/GSM4064121_HS_HeLa_SmallRNA_ManNAz-Enrich_RTstops_minus.bw',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "HeLa_ManNAz-Enrich_RTstops_minus"
        },
      ]
    },
  },
  {
    type: 'QuantitativeTrack',
    trackId:
      'HeLa_Input_RTstops_plus',
    name: 'GSM4064120_HeLa_Input_RTstops_plus',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BigWigAdapter',
      bigWigLocation: {
        uri: 'http://1.12.236.3:5000/files/GSM4064120_HS_HeLa_SmallRNA_Input_RTstops_plus.bw',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "HeLa_Input_RTstops_plus"
        },
      ]
    },
  },
  {
    type: 'QuantitativeTrack',
    trackId:
      'HeLa_Input_RTstops_minus',
    name: 'GSM4064120_HeLa_Input_RTstops_minus',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BigWigAdapter',
      bigWigLocation: {
        uri: 'http://1.12.236.3:5000/files/GSM4064120_HS_HeLa_SmallRNA_Input_RTstops_minus.bw',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "HeLa_Input_RTstops_minus"
        },
      ]
    },
  },

  {
    type: 'FeatureTrack',
    trackId:
      'human_ncRNA',
    name: 'human_ncRNA_enriched',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BedAdapter',
      bedLocation: {
        uri: 'http://1.12.236.3:5000/files/human_ncRNA_enriched.bed',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "human_ncRNA"
        },
      ]
    },
  },

  {
    type: 'FeatureTrack',
    trackId:
      'mouse_ncRNA',
    name: 'mouse_ncRNA_enriched',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCm39'],
    adapter: {
      type: 'BedAdapter',
      bedLocation: {
        uri: 'http://1.12.236.3:5000/files/mus_ncRNA_enriched.bed',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "mouse_ncRNA"
        },
      ]
    },
  },

  {
    type: 'FeatureTrack',
    trackId:
      'humanGenome',
    name: 'humanGenome',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BedAdapter',
      bedLocation: {
        uri: 'http://1.12.236.3:5000/files/humanGenome.bed',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "humanGenome"
        },
      ]
    },
  },

  {
    type: 'FeatureTrack',
    trackId:
      'mouseGenome',
    name: 'mouseGenome',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCm39'],
    adapter: {
      type: 'BedAdapter',
      bedLocation: {
        uri: 'http://1.12.236.3:5000/files/mouseGenome.bed',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "mouseGenome"
        },
      ]
    },
  },


  {
    type: 'QuantitativeTrack',
    trackId:
        'repeatrna_rt_hela-1750661954284-sessionTrack',
    name: 'RepeatRNA_RT_HeLa',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BedAdapter',
      bedLocation: {
        uri: 'http://1.12.236.3:5000/files/RepeatRNA_RT_HeLa_JB.bed',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "repeatrna_rt_hela-1750661954284-sessionTrack-LinearWiggleDisplay"
        },
      ]
    },
  },

  {
    type: 'QuantitativeTrack',
    trackId:
        'repeatrna_rt_h9_jb-1750662427229-sessionTrack',
    name: 'RepeatRNA_RT_H9',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BedAdapter',
      bedLocation: {
        uri: 'http://1.12.236.3:5000/files/RepeatRNA_RT_H9_JB.bed',
        locationType: 'UriLocation',
      },
      displays: [
        {
          type: "LinearWiggleDisplay",
          displayId: "repeatrna_rt_h9_jb-1750662427229-sessionTrack-LinearWiggleDisplay"
        },
      ]
    },
  },


  {
    type: 'QuantitativeTrack',
    trackId: 'RNAmodification', // 唯一ID
    name: 'RNAmodification(hg38)',
    category: ['GlycoRNA'],
    assemblyNames: ['GRCh38'],
    adapter: {
      type: 'BedTabixAdapter',
      bedGzLocation: {
        uri: 'http://1.12.236.3:5000/files/RNAmodification.bed.gz',
        locationType: 'UriLocation',
      },
      index: {
        location: {
          uri: 'http://1.12.236.3:5000/files/RNAmodification.bed.gz.tbi',
          locationType: 'UriLocation',
        },
      },
    },
    displays: [
      {
        type: 'LinearBasicDisplay',
        displayId: 'm6a_human_hg38-LinearBasicDisplay',
      },
    ],
  }




]

export default tracks
