<template>
  <div>
    <div ref="echartsRef" style="width: 1500px; height: 300px;"></div>
    <div ref="barChartRef" style="width: 600px; height: 400px; margin: 50px auto;"></div>

    <div v-if="showButton" style="text-align: center; margin-top: 20px;">
      <q-btn color="primary" label="go to see more details" @click="goToDetail" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';


const RNAName = ['URS000030BAD5_9606.187607', 'URS000030BAD5_9606.371824', 'URS00005A1E0D_9606.22963', 'URS000029CCC5_9606.104133', 'URS000067474D_9606.70709', 'URS00001AD596_9606.364125', 'URS000073FCEB_9606.121473', 'URS000070B37B_9606.472837', 'URS000009DDCA_9606.371732', 'URS0000023412_9606.36461', 'URS0000610FFE_9606.371410', 'URS000059D2BF_9606.108987', 'URS000030BAD5_9606.371299', 'URS0000635088_9606.41452', 'URS00002064F6_9606.24279', 'URS00002064F6_9606.22751', 'URS000061D582_9606.306895', 'URS00006FC298_9606.371409', 'URS000061D582_9606.364031', 'URS0000702883_9606.81769', 'URS000064D54F_9606.43410', 'URS00001AD596_9606.154643', 'URS00006C58BC_9606.154635', 'URS0000732902_9606.371423', 'URS00005DB87D_9606.371412', 'URS000065464E_9606.372157', 'URS00000A1A88_9606.207323', 'URS00006F4537_9606.242340', 'URS00005DB87D_9606.154648', 'URS000030BAD5_9606.371982', 'URS000071D869_9606.372168', 'URS000070B37B_9606.70703', 'URS000029CCC5_9606.70712', 'URS0000225EE1_9606.70705', 'URS000006E464_9606.471205', 'URS00006174C2_9606.104130', 'URS00001618FC_9606.171230', 'URS00006587E4_9606.165339', 'URS000013B42D_9606.371983', 'URS00006ABBAC_9606.23493', 'URS000024B38F_9606.371797', 'URS0000C8E9E9_9606.218297', 'URS00001AD596_9606.371413', 'URS000059D2BF_9606.199931', 'URS000022DD4A_9606.33052', 'URS000030BAD5_9606.371741', 'URS00005DB87D_9606.75399', 'URS0000333F2E_9606.121470', 'URS0000725A6A_9606.121454', 'URS000072890F_9606.168191', 'URS00004F0321_9606.23416', 'URS000022DD4A_9606.33051', 'URS00001A72CE_9606.173705', 'URS00003C9A26_9606.138516', 'URS00006E998F_9606.164799', 'URS0000233681_9606.121474', 'URS000072E1AF_9606.371539', 'URS000066103F_9606.185206', 'URS000059900F_9606.183497', 'URS000062C4DE_9606.75400', 'URS000059D2BF_9606.27040', 'URS000022DD4A_9606.70730', 'URS0000626F0F_9606.371730', 'URS0000659544_9606.154663', 'URS0000757938_9606.209301', 'URS0000692D68_9606.371843', 'URS00004D9E92_9606.147790', 'URS00000F30A4_9606.121488', 'URS0000610FFE_9606.135794', 'URS0000758799_9606.371426', 'URS000030BAD5_9606.371290', 'URS0000502C74_9606.153258', 'URS000014D40F_9606.176928', 'URS00002064F6_9606.364032', 'URS0000222FD2_9606.171211', 'URS000061D582_9606.364029', 'URS000034AAC2_9606.23420', 'URS0000417A0F_9606.176985', 'URS0000610FFE_9606.371703', 'URS00000FB60D_9606.162893', 'URS00002D40C8_9606.364056', 'URS00002D7BB5_9606.185204', 'URS0000121433_9606.371950', 'URS00002D40C8_9606.154636', 'URS000065FE51_9606.171242', 'URS000038D8D3_9606.171241', 'URS0000493225_9606.121467', 'URS000018E119_9606.471223', 'URS00000FB60D_9606.162896', 'URS00006744D5_9606.371669', 'URS000059D2BF_9606.24082', 'URS000029CCC5_9606.199930', 'URS0000698218_9606.22752', 'URS0000755767_9606.371429', 'URS000064074C_9606.4295', 'URS00006A14B6_9606.147943', 'URS000047B05D_9606.371403', 'URS000013B42D_9606.171165', 'URS0000733374_9606.371295', 'URS0000225EE1_9606.456265', 'URS000074FC25_9606.371414', 'URS00006C8412_9606.371856', 'URS0000161979_9606.364053', 'URS000070BF11_9606.377888', 'URS000061D582_9606.371916', 'URS00006C8EDF_9606.104137', 'URS00007131F2_9606.4247', 'URS0000417A0F_9606.328141', 'URS00004CF9D8_9606.415102', 'URS00004CF258_9606.73169', 'URS00003D2CC9_9606.427564', 'URS000064E10F_9606.388976', 'URS00006F940C_9606.70706', 'URS0000753A37_9606.371826', 'URS000072A930_9606.371823', 'URS00006C0A49_9606.154644', 'URS0000278E1B_9606.93479', 'URS00006D74B2_9606.371821', 'URS000042F13F_9606.371388', 'URS00006AACBE_9606.4352', 'URS00004131B6_9606.415045', 'URS000061F57C_9606.104129', 'URS00006509A6_9606.17915', 'URS000038F4B2_9606.99565', 'URS00006D9244_9606.301881', 'URS000013899F_9606.99564', 'URS00004BF687_9606.4280', 'URS00001AD596_9606.23425', 'URS000038803E_9606.70704', 'URS0000333F2E_9606.121476', 'URS0000333F2E_9606.121489', 'URS000059D2BF_9606.46044', 'URS00001AD596_9606.364123', 'URS0000333F2E_9606.427562', 'URS00004D9E92_9606.127688', 'URS000005A7A9_9606.154628', 'URS00006D0B93_9606.27085', 'URS000071C635_9606.371742', 'URS000047CD44_9606.17989', 'URS00003A4B65_9606.413838', 'URS0000750232_9606.371836', 'URS0000145C5E_9606.435030', 'URS00002DDD59_9606.290731', 'URS0000636E2A_9606.220908', 'URS000029CCC5_9606.117810', 'URS00007362AD_9606.223758', 'URS000059D2BF_9606.23272', 'URS000030BAD5_9606.371323', 'URS0000748C4B_9606.23013', 'URS000061D582_9606.364124', 'URS0000639DBE_9606.110603', 'URS000030BAD5_9606.25196', 'URS00002D2D8F_9606.471193', 'URS000068C296_9606.364073', 'URS00002DDD59_9606.371846', 'URS0000530C88_9606.371847', 'URS0000610FFE_9606.171216', 'URS000025082B_9606.471203', 'URS00001D909A_9606.154623', 'URS00005DB87D_9606.121453', 'URS0000716B70_9606.171232', 'URS00003D2CC9_9606.220909', 'URS000035EE7E_9606.180297', 'URS0000639DBE_9606.238973', 'URS00001FBD75_9606.471259', 'URS00000C18F2_9606.171237', 'URS00002D40C8_9606.121491', 'URS000061A10B_9606.471196', 'URS00003A0C47_9606.70739', 'URS00002064F6_9606.27029', 'URS00005DB87D_9606.27944', 'URS00000AED6F_9606.200880', 'URS00001C3F54_9606.171171', 'URS0000572B72_9606.371829', 'URS0000610FFE_9606.371725', 'URS0000646601_9606.176922', 'URS00002B4CE5_9606.200883', 'URS0000417A0F_9606.176925', 'URS0000417A0F_9606.176984', 'URS00002C130C_9606.471260', 'URS000022DD4A_9606.171159', 'URS00000FCDE9_9606.471275', 'URS000068D6AF_9606.23232', 'URS00000C6674_9606.471244', 'URS00003C9A26_9606.111467', 'URS00000C18F2_9606.27941', 'URS00005DB87D_9606.121448', 'URS0000664EAD_9606.371736', 'URS00000F3F5E_9606.471224', 'URS0000120E41_9606.121451', 'URS00005DB87D_9606.412135', 'URS000042C3BF_9606.130047', 'URS00006DA515_9606.371735', 'URS000063BB92_9606.24290', 'URS000002176F_9606.471276', 'URS000056BD99_9606.471261', 'URS000072540A_9606.154664', 'URS00007362AD_9606.371834', 'URS00005DB87D_9606.154662', 'URS0000222FD2_9606.371307', 'URS00006E0E1A_9606.132487', 'URS0000735371_9606.41451', 'URS00004728AA_9606.415111', 'URS00003E8921_9606.471191', 'URS0000092302_9606.52109', 'URS000061F57C_9606.364119', 'URS00000A1A88_9606.171215', 'URS00006D4008_9606.371298', 'URS0000222FD2_9606.371324', 'URS000070227A_9606.23022', 'URS00001B506A_9606.171161', 'URS0000625435_9606.371910', 'URS0000630B8A_9606.364034', 'URS00005983A6_9606.471247', 'URS000042F13F_9606.27082', 'URS000044BAE3_9606.23587', 'URS00002034DC_9606.141004', 'URS0000738059_9606.171162']

const BED_Col9 = ['(human) tRNA-iMet (anticodon CAT) 1-1 (TRX-CAT1 1 to 8)', '(human) tRNA-iMet (anticodon CAT) 1-1 (TRX-CAT1 1 to 8)', 'tRNA-Asn (anticodon GTT) 6-1 (TRN-GTT6-1)', 'tRNA-Phe (anticodon GAA) 1-1 (TRF-GAA1 1 to 6)', 'tRNA-Lys (anticodon TTT) 5-1 (TRK-TTT5-1)', 'tRNA-Lys (anticodon CTT) 2-1 (TRK-CTT2 1 to 5)', '(human) tRNA-Tyr (anticodon GTA) 4-1 (TRY-GTA4-1)', 'tRNA-Val (anticodon TAC) 1-1 (TRV-TAC1-1 2C TRV-TAC1-2)', 'tRNA-Val (anticodon CAC) 2-1 (TRV-CAC2-1)', 'tRNA-Thr (anticodon TGT) 2-1 (TRT-TGT2-1)', 'tRNA-Ile (anticodon AAT) 5-1 (TRI-AAT5 1 to 5)', 'tRNA-Asn (anticodon GTT) 2-1 (TRN-GTT2 1 to 8)', '(human) tRNA-iMet (anticodon CAT) 1-1 (TRX-CAT1 1 to 8)', 'tRNA-Glu (anticodon CTC) 2-1 (TRE-CTC2-1)', 'tRNA-Val (anticodon CAC) 1-1 (TRV-CAC1 1 to 7)', 'tRNA-Val (anticodon CAC) 1-1 (TRV-CAC1 1 to 7)', '(human) tRNA-Val (anticodon AAC) 1-1 (TRV-AAC1 1 to 5)', 'tRNA-Ala (anticodon CGC) 1-1 (TRA-CGC1-1)', '(human) tRNA-Val (anticodon AAC) 1-1 (TRV-AAC1 1 to 5)', 'tRNA-Lys (anticodon TTT) 2-1 (TRK-TTT2-1)', 'tRNA-Val (anticodon TAC) 3-1 (TRV-TAC3-1)', 'tRNA-Lys (anticodon CTT) 2-1 (TRK-CTT2 1 to 5)', 'tRNA-Lys (anticodon CTT) 3-1 (TRK-CTT3-1)', 'tRNA-Tyr (anticodon GTA) 8-1 (TRY-GTA8-1)', 'tRNA-Pro (anticodon AGG) 2-1 (TRP-AGG2 1 to 8)', 'tRNA-Thr (anticodon TGT) 1-1 (TRT-TGT1-1)', 'tRNA-Thr (anticodon AGT) 1-1 (TRT-AGT1 1 to 3)', 'tRNA-Ala (anticodon CGC) 3-1 (TRA-CGC3-1)', 'tRNA-Pro (anticodon AGG) 2-1 (TRP-AGG2 1 to 8)', '(human) tRNA-iMet (anticodon CAT) 1-1 (TRX-CAT1 1 to 8)', 'tRNA-Thr (anticodon CGT) 1-1 (TRT-CGT1-1)', 'tRNA-Val (anticodon TAC) 1-1 (TRV-TAC1-1 2C TRV-TAC1-2)', 'tRNA-Phe (anticodon GAA) 1-1 (TRF-GAA1 1 to 6)', '(human) tRNA-Arg (anticodon TCT) 3-1 (TRR-TCT3-1 2C TRR-TCT3-2)', '(human) mitochondrially encoded tRNA-Met (AUA/G) (MT-TM)', 'tRNA-Asp (anticodon GTC) 2-1 (TRD-GTC2 1 to 11)', 'tRNA-Trp (anticodon CCA) 1-1 (TRW-CCA1-1)', 'tRNA-Lys (anticodon TTT) 1-1 (TRK-TTT1-1)', 'tRNA-Gly (anticodon GCC) 2-1 (TRG-GCC2 1 to 6)', 'tRNA-Asn (anticodon GTT) 24-1 (TRN-GTT24-1)', 'tRNA-Ser (anticodon TGA) 4-1 (TRS-TGA4-1)', 'tRNA-Gly (CCC) 7-1 (TRG-CCC7-1)', 'tRNA-Lys (anticodon CTT) 2-1 (TRK-CTT2 1 to 5)', 'tRNA-Asn (anticodon GTT) 2-1 (TRN-GTT2 1 to 8)', 'tRNA-Lys (anticodon TTT) 3-1 (TRK-TTT3 1 to 5)', '(human) tRNA-iMet (anticodon CAT) 1-1 (TRX-CAT1 1 to 8)', 'tRNA-Pro (anticodon AGG) 2-1 (TRP-AGG2 1 to 8)', '(human) tRNA-Tyr (anticodon GTA) 5-1 (TRY-GTA5 1 to 5)', 'tRNA-Thr (anticodon TGT) 3-1 (TRT-TGT3-1)', 'tRNA-Met (anticodon CAT) 6-1 (TRM-CAT6-1)', '(human) tRNA-Glu (anticodon CTC) 1-1 (TRE-CTC1 1 to 7)', 'tRNA-Lys (anticodon TTT) 3-1 (TRK-TTT3 1 to 5)', 'tRNA-Trp (anticodon CCA) 2-1 (TRW-CCA2-1)', 'tRNA-Glu (anticodon TTC) 2-1 (TRE-TTC2-1 2C TRE-TTC2-2)', 'tRNA-Met (anticodon CAT) 2-1 (TRM-CAT2-1)', '(human) tRNA-Tyr (anticodon GTA) 7-1 (TRY-GTA7-1)', 'tRNA-Ile (anticodon AAT) 6-1 (TRI-AAT6-1)', 'tRNA-Arg (anticodon TCG) 3-1 (TRR-TCG3-1)', '(human) tRNA-Arg (anticodon CCG) 2-1 (TRR-CCG2-1)', 'tRNA-Pro (anticodon TGG) 2-1 (TRP-TGG2-1)', 'tRNA-Asn (anticodon GTT) 2-1 (TRN-GTT2 1 to 8)', 'tRNA-Lys (anticodon TTT) 3-1 (TRK-TTT3 1 to 5)', 'tRNA-Ile (anticodon AAT) 3-1 (TRI-AAT3-1)', 'tRNA-Lys (anticodon CTT) 4-1 (TRK-CTT4-1)', '(human) tRNA-Ile (anticodon TAT) 1-1 (TRI-TAT1-1)', 'tRNA-Ile (anticodon AAT) 8-1 (TRI-AAT8-1)', 'tRNA-Lys (anticodon CTT) 1-1 (TRK-CTT1-1 2C TRK-CTT1-2)', 'tRNA-Thr (anticodon TGT) 5-1 (TRT-TGT5-1)', 'tRNA-Ile (anticodon AAT) 5-1 (TRI-AAT5 1 to 5)', '(human) tRNA-Tyr (anticodon GTA) 3-1 (TRY-GTA3-1)', '(human) tRNA-iMet (anticodon CAT) 1-1 (TRX-CAT1 1 to 8)', 'tRNA-Gly (anticodon CCC) 2-1 (TRG-CCC2-1 2C TRG-CCC2-2)', 'tRNA-Cys (anticodon GCA) 4-1 (TRC-GCA4-1)', 'tRNA-Val (anticodon CAC) 1-1 (TRV-CAC1 1 to 7)', 'tRNA-Trp (anticodon CCA) 3-1 (TRW-CCA3 1 to 3)', '(human) tRNA-Val (anticodon AAC) 1-1 (TRV-AAC1 1 to 5)', '(human) tRNA-Gly (anticodon TCC) 2-1 (TRG-TCC2 1 to 6)', 'tRNA-Cys (anticodon GCA) 2-1 (TRC-GCA2 1 to 4)', 'tRNA-Ile (anticodon AAT) 5-1 (TRI-AAT5 1 to 5)', 'tRNA-Leu (anticodon CAG) 2-1 (TRL-CAG2-1 2C TRL-CAG2-2)', 'tRNA-Pro (anticodon TGG) 3-1 (TRP-TGG3 1 to 5)', 'tRNA-Arg (anticodon CCT) 1-1 (TRR-CCT1-1)', 'tRNA-iMet (anticodon CAT) 2-1 (TRX-CAT2-1)', 'tRNA-Pro (anticodon TGG) 3-1 (TRP-TGG3 1 to 5)', 'tRNA-Ile (anticodon AAT) 4-1 (TRI-AAT4-1)', 'tRNA-Ser (anticodon AGA) 2-1 (TRS-AGA2 1 to 6)', 'tRNA-Pro (anticodon TGG) 1-1 (TRP-TGG1-1)', 'mitochondrially encoded tRNA-Cys (UGU/C) (MT-TC)', 'tRNA-Leu (anticodon CAG) 2-1 (TRL-CAG2-1 2C TRL-CAG2-2)', 'tRNA-Pro (anticodon CGG) 2-1 (TRP-CGG2-1)', 'tRNA-Asn (anticodon GTT) 2-1 (TRN-GTT2 1 to 8)', 'tRNA-Phe (anticodon GAA) 1-1 (TRF-GAA1 1 to 6)', 'tRNA-Asn (anticodon GTT) 27-1 (TRN-GTT27-1)', '(human) tRNA-Tyr (anticodon GTA) 6-1 (TRY-GTA6-1)', 'tRNA-Glu (anticodon TTC) 3-1 (TRE-TTC3-1)', 'tRNA-Cys (anticodon GCA) 5-1 (TRC-GCA5-1)', 'tRNA-Thr (anticodon AGT) 2-1 (TRT-AGT2-1 2C TRT-AGT2-2)', 'tRNA-Gly (anticodon GCC) 2-1 (TRG-GCC2 1 to 6)', 'tRNA-Ser (anticodon GCT) 6-1 (TRS-GCT6-1)', '(human) tRNA-Arg (anticodon TCT) 3-1 (TRR-TCT3-1 2C TRR-TCT3-2)', 'tRNA-Tyr (anticodon GTA) 1-1 (TRY-GTA1-1)', '(human) tRNA-Ile (anticodon AAT) 2-1 (TRI-AAT2-1)', 'tRNA-Val (anticodon AAC) 2-1 (TRV-AAC2-1)', 'tRNA-Ile (anticodon AAT) 12-1 (TRI-AAT12-1)', '(human) tRNA-Val (anticodon AAC) 1-1 (TRV-AAC1 1 to 5)', '(human) tRNA-Ala (anticodon TGC) 4-1 (TRA-TGC4-1)', 'tRNA-Gly (CCC) 5-1 (TRG-CCC5-1)', 'tRNA-Cys (anticodon GCA) 2-1 (TRC-GCA2 1 to 4)', '(human) tRNA-Cys (anticodon GCA) 12-1 (TRC-GCA12-1)', '(human) tRNA-Ser (anticodon GCT) 3-1 (TRS-GCT3-1)', 'tRNA-Ala (anticodon AGC) 8-1 (TRA-AGC8-1 2C TRA-AGC8-2)', 'tRNA-Leu (anticodon TAA) 1-1 (TRL-TAA1-1)', 'tRNA-Leu (anticodon TAA) 3-1 (TRL-TAA3-1)', '(human) tRNA-Leu (anticodon CAA) 3-1 (TRL-CAA3-1)', 'tRNA-Lys (anticodon TTT) 4-1 (TRK-TTT4-1)', '(human) tRNA-Lys (anticodon CTT) 5-1 (TRK-CTT5-1)', '(human) tRNA-Ser (anticodon CGA) 4-1 (TRS-CGA4-1)', 'tRNA-Asp (anticodon GTC) 3-1 (TRD-GTC3-1)', 'tRNA-Leu (anticodon CAG) 1-1 (TRL-CAG1 1 to 7)', 'tRNA-Asn (anticodon GTT) 4-1 (TRN-GTT4-1)', 'tRNA-Cys (anticodon GCA) 11-1 (TRC-GCA11-1)', '(human) tRNA-Ala (anticodon TGC) 3-1 (TRA-TGC3-1 2C TRA-TGC3-2)', 'tRNA-Cys (anticodon GCA) 7-1 (TRC-GCA7-1)', 'tRNA-Trp (anticodon CCA) 4-1 (TRW-CCA4-1)', 'tRNA-Cys (anticodon GCA) 6-1 (TRC-GCA6-1)', '(human) tRNA-Asp (anticodon GTC) 1-1 (TRD-GTC1-1)', 'tRNA-Gly (anticodon CCC) 1-1 (TRG-CCC1-1 2C TRG-CCC1-2)', 'tRNA-Lys (anticodon CTT) 2-1 (TRK-CTT2 1 to 5)', 'tRNA-Val (anticodon TAC) 2-1 (TRV-TAC2-1)', '(human) tRNA-Tyr (anticodon GTA) 5-1 (TRY-GTA5 1 to 5)', '(human) tRNA-Tyr (anticodon GTA) 5-1 (TRY-GTA5 1 to 5)', 'tRNA-Asn (anticodon GTT) 2-1 (TRN-GTT2 1 to 8)', 'tRNA-Lys (anticodon CTT) 2-1 (TRK-CTT2 1 to 5)', '(human) tRNA-Tyr (anticodon GTA) 5-1 (TRY-GTA5 1 to 5)', 'tRNA-Lys (anticodon CTT) 1-1 (TRK-CTT1-1 2C TRK-CTT1-2)', 'tRNA-Arg (anticodon CCT) 3-1 (TRR-CCT3-1)', '(human) tRNA-Asn (anticodon GTT) 1-1 (TRN-GTT1-1)', 'tRNA-Lys (anticodon TTT) 6-1 (TRK-TTT6-1)', '(human) tRNA-Arg (anticodon TCT) 1-1 (TRR-TCT1-1)', 'tRNA-Arg (anticodon CCT) 4-1 (TRR-CCT4-1)', 'tRNA-Val (anticodon AAC) 3-1 (TRV-AAC3-1)', 'tRNA-Met (anticodon CAT) 1-1 (TRM-CAT1-1)', '(human) tRNA-Arg (anticodon ACG) 2-1 (TRR-ACG2 1 to 4)', 'tRNA-Tyr (anticodon GTA) 2-1 (TRY-GTA2-1)', 'tRNA-Phe (anticodon GAA) 1-1 (TRF-GAA1 1 to 6)', 'tRNA-Ile (anticodon TAT) 2-1 (TRI-TAT2 1 to 3)', 'tRNA-Asn (anticodon GTT) 2-1 (TRN-GTT2 1 to 8)', '(human) tRNA-iMet (anticodon CAT) 1-1 (TRX-CAT1 1 to 8)', '(human) tRNA-Val (anticodon CAC) 4-1 (TRV-CAC4-1)', '(human) tRNA-Val (anticodon AAC) 1-1 (TRV-AAC1 1 to 5)', 'tRNA-Glu (anticodon TTC) 1-1 (TRE-TTC1-1 2C TRE-TTC1-2)', '(human) tRNA-iMet (anticodon CAT) 1-1 (TRX-CAT1 1 to 8)', 'mitochondrially encoded tRNA-Val (GUN) (MT-TV)', 'tRNA-Thr (anticodon TGT) 6-1 (TRT-TGT6-1)', '(human) tRNA-Arg (anticodon ACG) 2-1 (TRR-ACG2 1 to 4)', 'tRNA-Ser (anticodon CGA) 3-1 (TRS-CGA3-1)', 'tRNA-Ile (anticodon AAT) 5-1 (TRI-AAT5 1 to 5)', 'mitochondrially encoded tRNA-Ile (AUU/C) (MT-TI)', 'tRNA-Arg (anticodon CCG) 1-1 (TRR-CCG1 1 to 3)', 'tRNA-Pro (anticodon AGG) 2-1 (TRP-AGG2 1 to 8)', 'tRNA-Gly (anticodon TCC) 3-1 (TRG-TCC3-1)', 'tRNA-Ala (anticodon AGC) 8-1 (TRA-AGC8-1 2C TRA-AGC8-2)', 'tRNA-Gln (anticodon TTG) 1-1 (TRQ-TTG1-1)', 'tRNA-Glu (anticodon TTC) 1-1 (TRE-TTC1-1 2C TRE-TTC1-2)', 'mitochondrially encoded tRNA-His (CAU/C) (MT-TH)', 'tRNA-Pro (anticodon CGG) 1-1 (TRP-CGG1 1 to 3)', 'tRNA-Pro (anticodon TGG) 3-1 (TRP-TGG3 1 to 5)', 'mitochondrially encoded tRNA-Leu (UUA/G) 1 (MT-TL1)', '(human) tRNA-Phe (anticodon GAA) 2-1 (TRF-GAA2-1)', 'tRNA-Val (anticodon CAC) 1-1 (TRV-CAC1 1 to 7)', 'tRNA-Pro (anticodon AGG) 2-1 (TRP-AGG2 1 to 8)', 'tRNA-Gly (anticodon TCC) 1-1 (TRG-TCC1-1)', '(human) tRNA-Ser (anticodon CGA) 1-1 (TRS-CGA1-1)', 'tRNA-Leu (anticodon CAA) 2-1 (TRL-CAA2-1)', 'tRNA-Ile (anticodon AAT) 5-1 (TRI-AAT5 1 to 5)', 'tRNA-Cys (anticodon GCA) 14-1 (TRC-GCA14-1)', 'tRNA-Val (anticodon CAC) 3-1 (TRV-CAC3-1)', 'tRNA-Cys (anticodon GCA) 2-1 (TRC-GCA2 1 to 4)', 'tRNA-Cys (anticodon GCA) 2-1 (TRC-GCA2 1 to 4)', '(human) mitochondrially encoded tRNA-Ser (AGU/C) 2 (MT-TS2)', 'tRNA-Lys (anticodon TTT) 3-1 (TRK-TTT3 1 to 5)', 'mitochondrially encoded tRNA-Thr (ACN) (MT-TT)', 'tRNA-Asn (anticodon GTT) 10-1 (TRN-GTT10-1)', 'mitochondrially encoded tRNA-Gly (GGN) (MT-TG)', 'tRNA-Glu (anticodon TTC) 2-1 (TRE-TTC2-1 2C TRE-TTC2-2)', 'tRNA-Pro (anticodon CGG) 1-1 (TRP-CGG1 1 to 3)', 'tRNA-Pro (anticodon AGG) 2-1 (TRP-AGG2 1 to 8)', 'tRNA-Ser (anticodon GCT) 2-1 (TRS-GCT2-1)', 'mitochondrially encoded tRNA-Tyr (UAU/C) (MT-TY)', 'tRNA-Leu (anticodon AAG) 2-1 (TRL-AAG2 1 to 4)', 'tRNA-Pro (anticodon AGG) 2-1 (TRP-AGG2 1 to 8)', 'tRNA-Cys (anticodon GCA) 8-1 (TRC-GCA8-1)', 'tRNA-Gln (anticodon CTG) 5-1 (TRQ-CTG5-1)', 'tRNA-Asn (anticodon GTT) 8-1 (TRN-GTT8-1)', 'mitochondrially encoded tRNA-Pro (CCN) (MT-TP)', 'mitochondrially encoded tRNA-Leu (CUN) 2 (MT-TL2)', 'tRNA-Pro (anticodon AGG) 1-1 (TRP-AGG1-1)', 'tRNA-Ile (anticodon TAT) 2-1 (TRI-TAT2 1 to 3)', 'tRNA-Pro (anticodon AGG) 2-1 (TRP-AGG2 1 to 8)', 'tRNA-Trp (anticodon CCA) 3-1 (TRW-CCA3 1 to 3)', 'tRNA-Ala (anticodon AGC) 15-1 (TRA-AGC15-1)', 'tRNA-Leu (anticodon CAA) 4-1 (TRL-CAA4-1)', 'tRNA-Cys (anticodon GCA) 17-1 (TRC-GCA17-1)', 'mitochondrially encoded tRNA-Phe (UUU/C) (MT-TF)', '(human) tRNA-Ser (anticodon TGA) 1-1 (TRS-TGA1-1)', '(human) tRNA-Ala (anticodon TGC) 3-1 (TRA-TGC3-1 2C TRA-TGC3-2)', 'tRNA-Thr (anticodon AGT) 1-1 (TRT-AGT1 1 to 3)', 'tRNA-Ser (anticodon TGA) 3-1 (TRS-TGA3-1)', 'tRNA-Trp (anticodon CCA) 3-1 (TRW-CCA3 1 to 3)', 'tRNA-Asn (anticodon GTT) 12-1 (TRN-GTT12-1)', 'tRNA-Leu (anticodon TAG) 1-1 (TRL-TAG1-1)', '(human) tRNA-Leu (anticodon TAA) 2-1 (TRL-TAA2-1)', 'tRNA-Leu (anticodon AAG) 1-1 (TRL-AAG1 1 to 3)', '(human) mitochondrially encoded tRNA-Arg (CGN) (MT-TR)', 'tRNA-Leu (anticodon CAG) 1-1 (TRL-CAG1 1 to 7)', '(human) tRNA-His (anticodon GTG) 1-1 (TRH-GTG1 1 to 9)', 'tRNA-Ser (anticodon GCT) 4-1 (TRS-GCT4 1 to 3)', 'tRNA-Arg (anticodon TCT) 2-1 (TRR-TCT2-1)']

export default {
  name: 'EChartsComponent',
  setup() {
    const echartsRef = ref(null);
    const barChartRef = ref(null);
    const router = useRouter();

    const selectedRNAIndex = ref(null);
    const selectedSample = ref('');
    const showButton = ref(false);

    onMounted(() => {
      const myChart = echarts.init(echartsRef.value);

      const samples = ['HeLa', 'H9'];
      const data = [[0, 0, 27.41], [0, 1, 26.86], [0, 2, 25.05], [0, 3, 24.99], [0, 4, 25.94], [0, 5, 24.05], [0, 6, 23.15], [0, 7, 25.28], [0, 8, 24.45], [0, 9, 24.85], [0, 10, 24.63], [0, 11, 24.56], [0, 12, 23.56], [0, 13, 23.94], [0, 14, 23.82], [0, 15, 23.7], [0, 16, 24.24], [0, 17, 23.41], [0, 18, 23.15], [0, 19, 22.7], [0, 20, 23.33], [0, 21, 22.24], [0, 22, 23.63], [0, 23, 22.05], [0, 24, 22.56], [0, 25, 22.05], [0, 26, 21.56], [0, 27, 22.94], [0, 28, 22.05], [0, 29, 21.24], [0, 30, 22.24], [0, 31, 21.56], [0, 32, 23.15], [0, 33, 22.24], [0, 34, 22.24], [0, 35, 21.82], [0, 36, 21.24], [0, 37, 22.24], [0, 38, 20.82], [0, 39, 21.24], [0, 40, 21.56], [0, 41, 21.82], [0, 42, 9.42], [0, 43, 27.25], [0, 44, 8.3], [0, 45, 7.86], [0, 46, 26.16], [0, 47, 24.19], [0, 48, 25.35], [0, 49, 24.88], [0, 50, 25.35], [0, 51, 26.45], [0, 52, 7.02], [0, 53, 26.13], [0, 54, 23.76], [0, 55, 24.19], [0, 56, 8.05], [0, 57, 25.76], [0, 58, 6.03], [0, 59, 23.63], [0, 60, 6.05], [0, 61, 23.24], [0, 62, 23.94], [0, 63, 23.82], [0, 64, 23.24], [0, 65, 23.94], [0, 66, 23.63], [0, 67, 24.15], [0, 68, 3.11], [0, 69, 5.06], [0, 70, 4.02], [0, 71, 24.28], [0, 72, 21.82], [0, 73, 2.54], [0, 74, 3.61], [0, 75, 23.33], [0, 76, 21.56], [0, 77, 5.48], [0, 78, 3.03], [0, 79, 20.82], [0, 80, 21.56], [0, 81, 3.7], [0, 82, 0.0], [0, 83, 3.48], [0, 84, 1.98], [0, 85, 22.41], [0, 86, 1.77], [0, 87, 21.56], [0, 88, 20.24], [0, 89, 23.41], [0, 90, 22.82], [0, 91, 22.82], [0, 92, 0.0], [0, 93, 22.56], [0, 94, 4.49], [0, 95, 2.2], [0, 96, 22.24], [0, 97, 3.15], [0, 98, 20.24], [0, 99, 22.05], [0, 100, 22.05], [0, 101, 2.48], [0, 102, 0.0], [0, 103, 0.0], [0, 104, 21.56], [0, 105, 2.08], [0, 106, 21.24], [0, 107, 2.18], [0, 108, 0.0], [0, 109, 20.82], [0, 110, 20.82], [0, 111, 0.0], [0, 112, 0.0], [0, 113, 0.0], [0, 114, 0.0], [0, 115, 0.0], [0, 116, 20.24], [0, 117, 20.24], [0, 118, 20.24], [0, 119, 0.0], [0, 120, 0.0], [0, 121, 0.0], [0, 122, 0.0], [0, 123, 0.0], [0, 124, 0.0], [0, 125, 0.0], [0, 126, 0.0], [0, 127, 9.86], [0, 128, 8.98], [0, 129, 8.28], [0, 130, 7.65], [0, 131, 8.1], [0, 132, 8.37], [0, 133, 6.95], [0, 134, 7.39], [0, 135, 8.53], [0, 136, 7.23], [0, 137, 5.89], [0, 138, 6.8], [0, 139, 5.9], [0, 140, 7.59], [0, 141, 6.27], [0, 142, 5.21], [0, 143, 4.5], [0, 144, 3.65], [0, 145, 6.47], [0, 146, 4.5], [0, 147, 5.84], [0, 148, 6.38], [0, 149, 4.15], [0, 150, 4.22], [0, 151, 3.96], [0, 152, 4.66], [0, 153, 5.06], [0, 154, 5.06], [0, 155, 7.12], [0, 156, 3.42], [0, 157, 4.69], [0, 158, 4.12], [0, 159, 2.18], [0, 160, 4.68], [0, 161, 3.44], [0, 162, 4.28], [0, 163, 4.02], [0, 164, 3.85], [0, 165, 3.19], [0, 166, 1.93], [0, 167, 3.98], [0, 168, 4.02], [0, 169, 2.7], [0, 170, 2.75], [0, 171, 3.71], [0, 172, 2.8], [0, 173, 2.94], [0, 174, 4.17], [0, 175, 3.58], [0, 176, 3.61], [0, 177, 3.11], [0, 178, 2.42], [0, 179, 3.11], [0, 180, 3.41], [0, 181, 3.66], [0, 182, 3.32], [0, 183, 2.75], [0, 184, 3.21], [0, 185, 1.76], [0, 186, 3.48], [0, 187, 2.85], [0, 188, 2.59], [0, 189, 2.33], [0, 190, 3.36], [0, 191, 1.43], [0, 192, 2.48], [0, 193, 2.48], [0, 194, 2.98], [0, 195, 4.66], [0, 196, 3.26], [0, 197, 0.0], [0, 198, 1.99], [0, 199, 0.0], [0, 200, 0.0], [0, 201, 0.0], [0, 202, 2.48], [0, 203, 1.71], [0, 204, 0.0], [0, 205, 3.06], [0, 206, 1.86], [0, 207, 2.96], [0, 208, 2.86], [0, 209, 0.0], [0, 210, 2.53], [0, 211, 0.0], [0, 212, 0.0], [0, 213, 0.0], [0, 214, 2.01], [0, 215, 0.0], [0, 216, 0.0], [0, 217, 0.0], [1, 0, 26.04], [1, 1, 25.6], [1, 2, 23.16], [1, 3, 22.26], [1, 4, 21.3], [1, 5, 23.18], [1, 6, 23.93], [1, 7, 21.57], [1, 8, 22.37], [1, 9, 21.91], [1, 10, 21.91], [1, 11, 21.91], [1, 12, 22.75], [1, 13, 22.05], [1, 14, 21.96], [1, 15, 21.96], [1, 16, 21.05], [1, 17, 21.75], [1, 18, 21.51], [1, 19, 21.81], [1, 20, 21.14], [1, 21, 22.0], [1, 22, 20.37], [1, 23, 21.81], [1, 24, 21.05], [1, 25, 21.51], [1, 26, 21.75], [1, 27, 20.22], [1, 28, 21.05], [1, 29, 21.81], [1, 30, 20.51], [1, 31, 21.14], [1, 32, 19.37], [1, 33, 20.05], [1, 34, 19.37], [1, 35, 19.64], [1, 36, 20.22], [1, 37, 18.64], [1, 38, 19.86], [1, 39, 19.05], [1, 40, 18.64], [1, 41, 18.05], [1, 42, 26.52], [1, 43, 7.5], [1, 44, 25.07], [1, 45, 25.08], [1, 46, 6.78], [1, 47, 7.62], [1, 48, 6.37], [1, 49, 6.73], [1, 50, 6.12], [1, 51, 4.98], [1, 52, 24.07], [1, 53, 4.92], [1, 54, 7.26], [1, 55, 6.67], [1, 56, 22.37], [1, 57, 4.25], [1, 58, 23.9], [1, 59, 6.08], [1, 60, 23.34], [1, 61, 6.13], [1, 62, 5.04], [1, 63, 5.11], [1, 64, 5.61], [1, 65, 4.91], [1, 66, 4.72], [1, 67, 4.11], [1, 68, 24.21], [1, 69, 22.09], [1, 70, 22.48], [1, 71, 2.13], [1, 72, 4.4], [1, 73, 23.22], [1, 74, 22.14], [1, 75, 2.11], [1, 76, 3.82], [1, 77, 19.86], [1, 78, 21.96], [1, 79, 4.0], [1, 80, 3.23], [1, 81, 20.75], [1, 82, 24.32], [1, 83, 20.75], [1, 84, 22.22], [1, 85, 1.76], [1, 86, 22.34], [1, 87, 2.3], [1, 88, 3.23], [1, 89, 0.0], [1, 90, 0.0], [1, 91, 0.0], [1, 92, 22.67], [1, 93, 0.0], [1, 94, 18.05], [1, 95, 20.22], [1, 96, 0.0], [1, 97, 19.05], [1, 98, 1.91], [1, 99, 0.0], [1, 100, 0.0], [1, 101, 19.37], [1, 102, 21.64], [1, 103, 21.57], [1, 104, 0.0], [1, 105, 19.37], [1, 106, 0.0], [1, 107, 19.05], [1, 108, 20.86], [1, 109, 0.0], [1, 110, 0.0], [1, 111, 20.75], [1, 112, 20.75], [1, 113, 20.64], [1, 114, 20.51], [1, 115, 20.37], [1, 116, 0.0], [1, 117, 0.0], [1, 118, 0.0], [1, 119, 20.22], [1, 120, 20.22], [1, 121, 20.05], [1, 122, 19.37], [1, 123, 19.37], [1, 124, 19.05], [1, 125, 18.64], [1, 126, 18.64], [1, 127, 8.19], [1, 128, 6.97], [1, 129, 7.61], [1, 130, 8.1], [1, 131, 7.46], [1, 132, 7.06], [1, 133, 8.16], [1, 134, 7.43], [1, 135, 5.02], [1, 136, 6.22], [1, 137, 7.25], [1, 138, 5.64], [1, 139, 5.56], [1, 140, 3.83], [1, 141, 4.95], [1, 142, 5.61], [1, 143, 6.19], [1, 144, 6.98], [1, 145, 3.84], [1, 146, 5.58], [1, 147, 4.15], [1, 148, 3.61], [1, 149, 5.82], [1, 150, 5.66], [1, 151, 5.76], [1, 152, 5.01], [1, 153, 4.26], [1, 154, 3.97], [1, 155, 1.89], [1, 156, 5.36], [1, 157, 4.05], [1, 158, 4.06], [1, 159, 5.68], [1, 160, 3.08], [1, 161, 4.29], [1, 162, 3.03], [1, 163, 3.07], [1, 164, 3.16], [1, 165, 3.7], [1, 166, 4.67], [1, 167, 2.59], [1, 168, 2.36], [1, 169, 3.66], [1, 170, 3.58], [1, 171, 2.58], [1, 172, 3.46], [1, 173, 3.28], [1, 174, 2.01], [1, 175, 2.59], [1, 176, 2.54], [1, 177, 2.98], [1, 178, 3.64], [1, 179, 2.85], [1, 180, 2.47], [1, 181, 2.0], [1, 182, 1.99], [1, 183, 2.5], [1, 184, 2.03], [1, 185, 3.36], [1, 186, 1.59], [1, 187, 2.19], [1, 188, 2.38], [1, 189, 2.52], [1, 190, 1.49], [1, 191, 3.4], [1, 192, 2.35], [1, 193, 2.32], [1, 194, 1.75], [1, 195, 0.0], [1, 196, 1.34], [1, 197, 4.58], [1, 198, 2.41], [1, 199, 4.37], [1, 200, 3.91], [1, 201, 3.91], [1, 202, 1.4], [1, 203, 2.02], [1, 204, 3.23], [1, 205, 0.0], [1, 206, 1.13], [1, 207, 0.0], [1, 208, 0.0], [1, 209, 2.65], [1, 210, 0.0], [1, 211, 2.5], [1, 212, 2.31], [1, 213, 2.19], [1, 214, 0.0], [1, 215, 1.98], [1, 216, 1.79], [1, 217, 0.91]]
          .map(item => [item[1], item[0], item[2] != null ? item[2] : '-']);

      const RNA_labels = RNAName.map((id, index) => `${BED_Col9[index]}_${id}`);

      myChart.setOption({
        title: {
          text: 'tRNA'
        },
        tooltip: {
          position: 'top',
          trigger: 'item'
        },
        grid: {
          height: '60%',
          top: '20%'
        },
        xAxis: {
          type: 'category',
          data: RNA_labels,
          name: 'RNA ID',
          splitArea: {
            show: true
          },
          axisLabel: {
            show: false,
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
          min: 0,
          max: 20,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '0%',
          inRange: {
            color: ["#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027"]
          }
        },
        series: [{
          name: 'log2 FoldChange',
          type: 'heatmap',
          data: data,
          label: {},
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 0.05
          }
        }]
      });

      myChart.on('click', function (params) {
        const sampleName = samples[params.data[1]];
        const rnaIndex = params.data[0];
        updateBarChart(sampleName, rnaIndex);
      });

      //  页面加载默认显示 HeLa 样本第一个 RNA
      updateBarChart('HeLa', 0);
    });


    const updateBarChart = (sampleName, rnaIndex) => {
      selectedSample.value = sampleName;
      selectedRNAIndex.value = rnaIndex;
      showButton.value = true;

      const barChartData = {'HeLa': {'Input_RPM': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.22, 0.0, 0.22, 0.33, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.33, 0.0, 0.0, 0.0, 0.22, 0.0, 0.44, 0.0, 2.78, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 88.61, 0.67, 2.78, 0.0, 0.0, 42.25, 3.34, 0.0, 0.0, 0.22, 9.56, 0.0, 0.0, 0.67, 0.0, 0.78, 4.56, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 9.23, 9.45, 0.0, 0.56, 0.0, 0.0, 0.0, 0.44, 0.0, 0.0, 0.0, 2.33, 0.0, 1.78, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.11, 0.44, 2.0, 2.11, 0.33, 0.22, 1.45, 1.67, 0.22, 0.44, 3.56, 1.56, 3.56, 0.22, 23.12, 1.0, 34.69, 13.9, 0.89, 1.56, 11.56, 0.67, 0.56, 5.67, 185.11, 107.4, 1.67, 0.22, 0.22, 24.46, 2.22, 1.67, 129.3, 2.0, 12.01, 3.67, 10.45, 5.45, 146.31, 33.69, 24.46, 34.69, 42.47, 169.88, 23.46, 1.33, 34.69, 9.89, 222.69, 43.25, 3.22, 300.4, 1.0, 5.89, 5.89, 10.78, 4.22, 41.14, 112.51, 62.37, 33.91, 2.78, 23.01, 42.69, 535.65, 0.44, 0.56, 19.23, 6.23, 59.37, 0.0, 130.41, 0.0, 0.0, 0.0, 0.22, 71.6, 0.0, 3.34, 51.36, 0.56, 1.45, 0.0, 14.12, 0.0, 0.0, 0.0, 2.0, 0.0, 0.0, 0.0], 'Enriched_RPM': [178.25, 121.93, 34.66, 33.42, 64.37, 17.33, 9.28, 40.85, 22.9, 30.33, 26.0, 24.76, 12.38, 16.09, 14.85, 13.62, 19.81, 11.14, 9.28, 6.81, 10.52, 4.95, 13.0, 4.33, 6.19, 4.33, 3.09, 8.05, 4.33, 2.48, 4.95, 3.09, 9.28, 4.95, 4.95, 3.71, 2.48, 4.95, 1.86, 2.48, 3.09, 3.71, 152.26, 159.69, 69.94, 77.37, 74.89, 19.19, 42.71, 30.95, 42.71, 91.6, 43.33, 73.65, 14.24, 19.19, 58.8, 56.94, 29.09, 13.0, 184.44, 9.9, 16.09, 14.85, 9.9, 16.09, 13.0, 18.57, 766.86, 22.28, 45.18, 20.42, 3.71, 246.34, 40.85, 10.52, 3.09, 9.9, 77.99, 1.86, 3.09, 8.67, 0.0, 8.67, 17.95, 5.57, 6.81, 3.09, 1.24, 11.14, 7.43, 7.43, 0.0, 6.19, 207.34, 43.33, 4.95, 4.95, 1.24, 4.33, 4.33, 2.48, 0.0, 0.0, 3.09, 9.9, 2.48, 8.05, 0.0, 1.86, 1.86, 0.0, 0.0, 0.0, 0.0, 0.0, 1.24, 1.24, 1.24, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1034.86, 224.05, 620.17, 423.97, 91.6, 73.65, 178.87, 279.14, 82.32, 66.85, 211.06, 173.3, 212.3, 42.71, 1789.96, 37.14, 784.81, 174.54, 78.6, 35.28, 661.64, 55.7, 9.9, 105.84, 2871.24, 2723.32, 55.7, 7.43, 30.95, 262.43, 57.56, 29.09, 584.89, 51.37, 129.98, 71.18, 169.59, 78.6, 1331.95, 128.74, 386.83, 563.23, 276.66, 1142.56, 307.61, 9.28, 266.14, 178.25, 2663.28, 529.19, 27.85, 1612.95, 8.67, 62.51, 74.27, 107.69, 28.47, 381.26, 381.88, 695.07, 244.48, 16.71, 115.74, 436.97, 1447.69, 2.48, 3.09, 151.64, 157.21, 569.42, 0.0, 519.29, 0.0, 0.0, 0.0, 1.24, 233.96, 0.0, 27.85, 186.92, 4.33, 10.52, 0.0, 81.7, 0.0, 0.0, 0.0, 8.05, 0.0, 0.0, 0.0]}, 'H9': {'Input_RPM': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.14, 0.0, 0.0, 0.22, 0.5, 0.43, 1.01, 0.14, 1.15, 0.0, 1.23, 0.22, 0.29, 0.0, 1.44, 0.0, 0.29, 0.0, 0.29, 0.29, 0.22, 0.22, 0.14, 0.14, 0.36, 0.0, 0.0, 0.0, 0.65, 0.29, 0.0, 0.0, 6.92, 0.29, 0.0, 0.0, 0.14, 0.14, 0.0, 0.0, 0.0, 0.0, 0.36, 0.0, 2.88, 0.14, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.29, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.23, 0.22, 2.31, 1.08, 0.22, 0.29, 0.22, 0.87, 1.73, 0.14, 0.22, 1.73, 3.24, 0.65, 18.6, 0.29, 8.58, 0.22, 2.96, 0.14, 28.84, 0.14, 0.14, 0.72, 13.27, 24.88, 2.67, 0.22, 18.24, 0.94, 4.54, 2.67, 1.01, 1.01, 2.81, 1.66, 2.88, 1.51, 3.61, 0.29, 21.85, 32.16, 1.3, 2.02, 6.06, 0.87, 4.04, 7.35, 1828.05, 25.02, 0.79, 1.51, 0.79, 3.61, 0.58, 27.83, 1.15, 23.29, 0.65, 87.03, 72.61, 1.59, 49.18, 132.46, 5.26, 0.72, 25.02, 55.59, 0.0, 156.98, 0.5, 1.3, 0.22, 0.14, 1.66, 59.2, 1.8, 0.14, 0.0, 114.87, 0.0, 0.0, 0.22, 0.0, 0.22, 2.38, 0.5, 0.0, 0.79, 10.6, 2.09], 'Enriched_RPM': [68.95, 50.76, 9.37, 5.02, 2.58, 9.5, 16.02, 3.12, 5.43, 3.94, 3.94, 3.94, 7.06, 4.34, 4.07, 4.07, 2.17, 3.53, 2.99, 3.66, 2.31, 4.21, 1.36, 3.66, 2.17, 2.99, 3.53, 1.22, 2.17, 3.66, 1.49, 2.31, 0.68, 1.09, 0.68, 0.81, 1.22, 0.41, 0.95, 0.54, 0.41, 0.27, 95.96, 26.19, 35.29, 35.56, 23.75, 99.49, 35.7, 106.82, 10.04, 36.37, 17.64, 37.19, 33.25, 29.45, 5.43, 27.42, 15.61, 19.54, 10.59, 20.22, 9.5, 7.46, 10.59, 4.34, 3.8, 6.24, 19.41, 4.48, 5.84, 2.85, 6.11, 9.77, 4.61, 29.86, 4.07, 0.95, 4.07, 2.31, 1.36, 1.76, 20.9, 1.76, 4.89, 1.22, 5.29, 14.25, 1.36, 0.0, 0.0, 0.0, 6.65, 0.0, 0.27, 1.22, 0.0, 0.54, 1.09, 0.0, 0.0, 0.68, 3.26, 3.12, 0.0, 0.68, 0.0, 0.54, 1.9, 0.0, 0.0, 1.76, 1.76, 1.63, 1.49, 1.36, 0.0, 0.0, 0.0, 1.22, 1.22, 1.09, 0.68, 0.68, 0.54, 0.41, 0.41, 358.45, 27.15, 449.79, 297.24, 38.0, 38.41, 62.03, 149.16, 56.19, 10.72, 32.98, 86.59, 153.23, 9.23, 573.85, 14.12, 625.83, 27.28, 42.48, 6.92, 511.14, 1.76, 8.14, 36.37, 717.71, 803.63, 51.03, 3.39, 67.73, 38.55, 75.06, 44.52, 51.71, 8.55, 55.1, 13.57, 24.16, 13.57, 46.96, 7.33, 131.65, 164.77, 16.42, 24.16, 36.1, 9.5, 39.22, 29.72, 11007.04, 145.23, 6.24, 18.87, 5.7, 19.95, 2.31, 110.34, 6.51, 94.87, 6.65, 261.81, 332.39, 8.28, 281.63, 372.84, 55.65, 3.66, 124.6, 187.44, 0.0, 398.76, 12.08, 6.92, 4.48, 2.17, 24.97, 156.08, 7.33, 1.36, 0.0, 251.36, 0.0, 0.0, 1.36, 0.0, 1.22, 11.81, 2.31, 0.0, 3.12, 36.78, 3.94]}}
      ;
      const bars = [
        barChartData['HeLa']['Input_RPM'][rnaIndex] || 0,
        barChartData['HeLa']['Enriched_RPM'][rnaIndex] || 0,
        barChartData['H9']['Input_RPM'][rnaIndex] || 0,
        barChartData['H9']['Enriched_RPM'][rnaIndex] || 0
      ];

      const bedCol9 = BED_Col9[rnaIndex];

      const barChart = echarts.init(barChartRef.value);
      barChart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { bottom: 60 },
        xAxis: {
          type: 'category',
          data: [
            'HeLa_Input_RPM',
            'HeLa_Enriched_RPM',
            'H9_Input_RPM',
            'H9_Enriched_RPM'
          ],
          axisLabel: {
            show: true,
            rotate: 30,
            fontSize: 10,
            color: '#000'
          }
        },
        yAxis: { type: 'value' },
        series: [{
          type: 'bar',
          data: bars
        }],
        graphic: {
          type: 'text',
          left: 'center',
          top: 20,
          style: {
            text: bedCol9,
            font: 'bold 14px sans-serif',
            fill: '#007bff',
            cursor: 'pointer'
          },
          onclick: () => {
            goToDetail(); // 点击文字时触发跟按钮一样的逻辑
          }
        }
      });
    };

    const goToDetail = async () => {
      const transcriptID = RNAName[selectedRNAIndex.value];

      try {
        const response = await axios.get(`http://1.12.236.3:5000/get_glycoRNAID/${transcriptID}`);
        const glycoRNAID = response.data.glycoRNAID;

        let path = '';
        if (selectedSample.value === 'HeLa') {
          path = `/helastructure/${glycoRNAID}`;
        } else if (selectedSample.value === 'H9') {
          path = `/h9structure/${glycoRNAID}`;
        }

        // ✅ 适配 Hash 模式的完整 URL
        const fullUrl = `${window.location.origin}/#${path}`;
        window.open(fullUrl, '_blank');
      } catch (error) {
        console.error('跳转失败：', error);
      }
    };

    return {
      echartsRef,
      barChartRef,
      goToDetail,
      showButton,
      selectedSample
    };
  }
};
</script>
