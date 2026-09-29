const assembly = {
  name: 'GRCm39',
  aliases: ['GRCm39'],
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'GRCm39-ReferenceSequenceTrack',
    adapter: {
      type: 'BgzipFastaAdapter',
      fastaLocation: {
        uri: 'http://1.12.236.3:5000/files/mm39.fa.gz',
      },
      faiLocation: {
        uri: 'http://1.12.236.3:5000/files/mm39.fa.fai',
      },
      gziLocation: {
        uri: 'http://1.12.236.3:5000/files/mm39.fa.gz.gzi',
      },
    },
  },
  refNameAliases: {
    adapter: {
      type: 'RefNameAliasAdapter',
      location: {
        uri: 'http://1.12.236.3:5000/files/GRCm39.aliases.txt',
      },
    },
  },
}

export default assembly
