const assembly = {
  name: 'GRCh38',
  aliases: ['GRCh38'],
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'GRCh38-ReferenceSequenceTrack',
    adapter: {
      type: 'BgzipFastaAdapter',
      fastaLocation: {
        uri: 'http://1.12.236.3:5000/files/GRCh38.p14.genome.fa.gz',
      },
      faiLocation: {
        uri: 'http://1.12.236.3:5000/files/GRCh38.p14.genome.fa.fai',
      },
      gziLocation: {
        uri: 'http://1.12.236.3:5000/files/GRCh38.p14.genome.fa.gz.gzi',
      },
    },
  },
  refNameAliases: {
    adapter: {
      type: 'RefNameAliasAdapter',
      location: {
        uri: 'http://1.12.236.3:5000/files/hg38.aliases.txt',
      },
    },
  },
}

export default assembly
