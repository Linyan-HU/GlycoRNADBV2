<template>

  <!-- Fourteen Table -->
    <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
        <q-card style="width: 90%; margin: 30px auto 0;">
            <q-table
                    :rows="sixteenrows"
                    :columns="sixteencolumns"
                    row-key="id"
                    :hide-default-footer="true"
                    hide-bottom
                    wrap-cells
            >

                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td v-for="col in props.cols" :key="col.name" :props="props">
                            <template v-if="col.name === 'GSE id'">
                                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                                <a :href="generatesixteenLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
                            </template>
                            <!-- If it's not 'GSE id', display the value as usual -->
                            <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                                <div class="summary">{{ props.row[col.name] }}</div>
                            </template>
                            <template v-else>
                                <div v-html="props.row[col.name]" />
                            </template>

                        </q-td>
                        <q-td v-if="props.rowIndex === 0">
                            <q-btn flat @click="togglesixteenDetails(props.row)" label="Details" color="primary" />
                        </q-td>
                    </q-tr>
                </template>
            </q-table>

            <q-card v-if="sixteenDetailsVisible" class="q-mt-md">
                <q-card-section>
                    <q-table
                            :rows="sixteendetailRows"
                            :columns="sixteendetailColumns"
                            row-key="GSM ID"
                            :hide-default-footer="true"
                    >
                        <template v-slot:body-cell="props">
                            <q-td :props="props">
                                <div style="white-space: normal;">
                                    {{ props.row[props.col.field] }}
                                </div>
                            </q-td>
                        </template>
                    </q-table>
                    <q-btn @click="togglesixteenDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
                    <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink16" />
                </q-card-section>
            </q-card>
        </q-card>
    </div>




<!-- Fifteen Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
      <q-card style="width: 90%; margin: 30px auto 0;">
          <q-table
          :rows="fifteenrows"
          :columns="fifteencolumns"
          row-key="id"
          :hide-default-footer="true"
          hide-bottom
          wrap-cells
          >

            <template v-slot:body="props">
            <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <template v-if="col.name === 'GSE id'">
                      <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                      <a :href="generatefifteenLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
                  </template>
                  <!-- If it's not 'GSE id', display the value as usual -->
                  <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                      <div class="summary">{{ props.row[col.name] }}</div>
                  </template>
                  <template v-else>
                      <div v-html="props.row[col.name]" />
                  </template>

                </q-td>
                <q-td v-if="props.rowIndex === 0">
                  <q-btn flat @click="togglefifteenDetails(props.row)" label="Details" color="primary" />
                </q-td>
              </q-tr>
            </template>
          </q-table>

        <q-card v-if="fifteenDetailsVisible" class="q-mt-md">
            <q-card-section>
              <q-table
                :rows="fifteendetailRows"
                :columns="fifteendetailColumns"
                row-key="GSM ID"
                :hide-default-footer="true"
              >
                <template v-slot:body-cell="props">
                    <q-td :props="props">
                      <div style="white-space: normal;">
                          {{ props.row[props.col.field] }}
                      </div>
                    </q-td>
                </template>
              </q-table>
                <q-btn @click="togglefifteenDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
                <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink15" />
            </q-card-section>
          </q-card>
      </q-card>
  </div>



  <!-- Fourteen Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">
      <q-table
        :rows="fourteenrows"
        :columns="fourteencolumns"
        row-key="id"
        :hide-default-footer="true"
        hide-bottom
        wrap-cells
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generatefourteenLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ props.row[col.name] }}</div>
              </template>
              <template v-else>
                <div v-html="props.row[col.name]" />
              </template>

            </q-td>
            <q-td v-if="props.rowIndex === 0">
              <q-btn flat @click="togglefourteenDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-card v-if="fourteenDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
            :rows="fourteendetailRows"
            :columns="fourteendetailColumns"
            row-key="GSM ID"
            :hide-default-footer="true"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div style="white-space: normal;">
                  {{ props.row[props.col.field] }}
                </div>
              </q-td>
            </template>
          </q-table>
          <q-btn @click="togglefourteenDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink14" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>


  <!-- Ten Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">
      <q-table
        :rows="tenrows"
        :columns="tencolumns"
        row-key="id"
        :hide-default-footer="true"
        hide-bottom
        wrap-cells
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generatetenLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ props.row[col.name] }}</div>
              </template>
              <template v-else>
                <div v-html="props.row[col.name]" />
              </template>

            </q-td>
            <q-td v-if="props.rowIndex === 0">
              <q-btn flat @click="toggletenDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-card v-if="tenDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
            :rows="tendetailRows"
            :columns="tendetailColumns"
            row-key="GSM ID"
            :hide-default-footer="true"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div style="white-space: normal; max-width: 600px;">
                  {{ props.row[props.col.field] }}
                </div>
              </q-td>
            </template>
          </q-table>
          <q-btn @click="toggletenDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink10" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>




  <!-- Twelve Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">
      <q-table
        :rows="twelverows"
        :columns="twelvecolumns"
        row-key="id"
        :hide-default-footer="true"
        hide-bottom
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generatetwelveLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ props.row[col.name] }}</div>
              </template>
              <template v-else>
                <div v-html="props.row[col.name]" />
              </template>

            </q-td>
            <q-td v-if="props.rowIndex === 0">
              <q-btn flat @click="toggletwelveDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-card v-if="twelveDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
            :rows="twelvedetailRows"
            :columns="twelvedetailColumns"
            row-key="GSM ID"
            :hide-default-footer="true"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div style="white-space: normal; max-width: 600px;">
                  {{ props.row[props.col.field] }}
                </div>
              </q-td>
            </template>
          </q-table>
          <q-btn @click="toggletwelveDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink12" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>



  <!-- Eleven Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">

      <q-table
          :rows="elevenrows"
          :columns="elevencolumns"
          row-key="id"
          :hide-default-footer="true"
          hide-bottom
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'SRA'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generateelevenLink(props.row['SRA'])" target="_blank">{{ props.row['SRA'] }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ props.row[col.name] }}</div>
              </template>
              <template v-else>
                <div v-html="props.row[col.name]" />
              </template>

            </q-td>
            <q-td v-if="props.rowIndex === 0">
              <q-btn flat @click="toggleelevenDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-card v-if="elevenDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
              :rows="elevendetailRows"
              :columns="elevendetailColumns"
              row-key="GSM ID"
              :hide-default-footer="true"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div style="white-space: normal; max-width: 600px;">
                  {{ props.row[props.col.field] }}
                </div>
              </q-td>
            </template>
          </q-table>
          <q-btn @click="toggleelevenDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink11" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>



  <!-- Thirteen Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">
      <q-table
          :rows="thirteenrows"
          :columns="thirteencolumns"
          row-key="id"
          :hide-default-footer="true"
          hide-bottom
          wrap-cells
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generatethirteenLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ props.row[col.name] }}</div>
              </template>
              <template v-else>
                <div v-html="props.row[col.name]" />
              </template>

            </q-td>
            <q-td v-if="props.rowIndex === 0">
              <q-btn flat @click="togglethirteenDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-card v-if="thirteenDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
              :rows="thirteendetailRows"
              :columns="thirteendetailColumns"
              row-key="GSM ID"
              :hide-default-footer="true"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div style="white-space: normal;">
                  {{ props.row[props.col.field] }}
                </div>
              </q-td>
            </template>
          </q-table>
          <q-btn @click="togglethirteenDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink13" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>



  <!-- Nine Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">
      <q-table
          :rows="ninethrows"
          :columns="ninecolumns"
          row-key="id"
          :hide-default-footer="true"
          hide-bottom
          wrap-cells
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generatenineLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ props.row[col.name] }}</div>
              </template>
              <template v-else>
                <div v-html="props.row[col.name]" />
              </template>

            </q-td>
            <!-- Button column only for the first row -->
            <q-td v-if="props.rowIndex === 0">
              <q-btn flat @click="togglenineDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-card v-if="nineDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
              :rows="ninedetailRows"
              :columns="ninedetailColumns"
              row-key="GSM ID"
              :hide-default-footer="true"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div style="white-space: normal; max-width: 600px;">
                  {{ props.row[props.col.field] }}
                </div>
              </q-td>
            </template>
          </q-table>
          <q-btn @click="togglenineDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink9" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>


  <!-- Seven Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">

      <q-table
          :rows="sevenrows"
          :columns="sevencolumns"
          row-key="id"
          :hide-default-footer="true"
          hide-bottom
          wrap-cells
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generatesevenLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ props.row[col.name] }}</div>
              </template>
              <template v-else>
                <div v-html="props.row[col.name]" />
              </template>

            </q-td>
            <q-td v-if="props.rowIndex === 0">
              <q-btn flat @click="togglesevenDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>


      <q-card v-if="sevenDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
              :rows="sevendetailRows"
              :columns="sevendetailColumns"
              row-key="GSM ID"
              :hide-default-footer="true"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div style="white-space: normal; max-width: 800px; ">
                  {{ props.row[props.col.field] }}
                </div>
              </q-td>
            </template>
          </q-table>
          <q-btn @click="togglesevenDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink7" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>


  <!-- Eight Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">
      <q-table
          :rows="eightrows"
          :columns="eightcolumns"
          row-key="id"
          :hide-default-footer="true"
          hide-bottom
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generateeightLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ props.row[col.name] }}</div>
              </template>
              <template v-else>
                <div v-html="props.row[col.name]" />
              </template>

            </q-td>
            <!-- Button column only for the first row -->
            <q-td v-if="props.rowIndex === 0">
              <q-btn flat @click="toggleeightDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-card v-if="eightDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
              :rows="eightdetailRows"
              :columns="eightdetailColumns"
              row-key="GSM ID"
              :hide-default-footer="true"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div style="white-space: normal; max-width: 900px;">
                  {{ props.row[props.col.field] }}
                </div>
              </q-td>
            </template>
          </q-table>
          <q-btn @click="toggleeightDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink8" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>


  <!-- Sixth Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">

      <q-table
          :rows="sixthrows"
          :columns="sixthcolumns"
          row-key="id"
          :hide-default-footer="true"
          hide-bottom
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generatesixthLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ props.row[col.name] }}</div>
              </template>
              <template v-else>
                <div v-html="props.row[col.name]" />
              </template>

            </q-td>
            <!-- Button column only for the first row -->
            <q-td v-if="props.rowIndex === 0">
              <q-btn flat @click="toggleSixthDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-card v-if="sixthDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
              :rows="sixthdetailRows"
              :columns="sixthdetailColumns"
              row-key="GSM ID"
              :hide-default-footer="true"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div style="white-space: normal; max-width: 500px;">
                  {{ props.row[props.col.field] }}
                </div>
              </q-td>
            </template>
          </q-table>
          <q-btn @click="toggleSixthDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink6" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>


  <!-- Fifth Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">
      <q-table
          :rows="fifthrows"
          :columns="fifthcolumns"
          row-key="id"
          :hide-default-footer="true"
          hide-bottom
          wrap-cells
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generatefifthLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ props.row[col.name] }}</div>
              </template>
              <template v-else>
                <div v-html="props.row[col.name]" />
              </template>

            </q-td>
            <q-td v-if="props.rowIndex === 0">
              <q-btn flat @click="toggleFifthDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-card v-if="fifthDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
              :rows="fifthdetailRows"
              :columns="fifthdetailColumns"
              row-key="GSM ID"
              :hide-default-footer="true"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div style="white-space: normal; max-width: 800px;">
                  {{ props.row[props.col.field] }}
                </div>
              </q-td>
            </template>
          </q-table>
          <q-btn @click="toggleFifthDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink5" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>


  <!-- Forth Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">
      <q-table
          :rows="forthrows"
          :columns="forthcolumns"
          row-key="id"
          :hide-default-footer="true"
          hide-bottom
          wrap-cells
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generateforthLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ props.row[col.name] }}</div>
              </template>
              <template v-else>
                <div v-html="props.row[col.name]" />
              </template>

            </q-td>
            <q-td v-if="props.rowIndex === 0">
              <q-btn flat @click="toggleForthDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-card v-if="forthDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
              :rows="forthdetailRows"
              :columns="forthdetailColumns"
              row-key="GSM ID"
              :hide-default-footer="true"
          >
            <template v-slot:body-cell="props">
              <q-td :props="props">
                <div style="white-space: normal; max-width: 500px;">
                  {{ props.row[props.col.field] }}
                </div>
              </q-td>
            </template>
          </q-table>
          <q-btn @click="toggleForthDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink4" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>


  <!-- Second Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">

      <q-table
          :rows="secondrows"
          :columns="secondcolumns"
          row-key="id"
          :hide-default-footer="true"
          hide-bottom
          wrap-cells
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generatesecondLink(props.row['GSE id'])" target="_blank">{{ col.value }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ col.value }}</div>
              </template>
              <template v-else-if="col.name === 'Organism' || col.name === 'Reference'">
                <div v-html="col.value" />
              </template>

              <template v-else>
                {{ col.value }}
              </template>
            </q-td>

            <q-td>
              <q-btn flat @click="toggleSecongDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-card v-if="secondDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
              :rows="seconddetailRows"
              :columns="seconddetailColumns"
              row-key="GSM ID"
              :hide-default-footer="true"
          />
          <q-btn @click="toggleSecongDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink2" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>


  <!-- First Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">
      <q-table
          :rows="rows"
          :columns="columns"
          :hide-default-footer="true"
          hide-bottom
          row-key="id"
          wrap-cells
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <a :href="generateLink(props.row['GSE id'])" target="_blank">{{ props.row[col.field] }}</a>
              </template>

              <template v-else-if="col.name === 'Organism' || col.name === 'Reference'">
                <div v-html="props.row[col.field]" />
              </template>

              <template v-else>
                {{ props.row[col.field] }}
              </template>
            </q-td>

            <q-td>
              <q-btn flat @click="toggleDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>

      </q-table>
      <q-card v-if="detailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
              :rows="detailRows"
              :columns="detailColumns"
              row-key="GSM ID"
              :hide-default-footer="true"
          />
          <q-btn @click="toggleDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink1" />
        </q-card-section>
      </q-card>
    </q-card>
  </div>


  <!-- Third Table -->
  <div class="q-pa-md q-h-full q-flex q-items-center q-justify-center">
    <q-card style="width: 90%; margin: 30px auto 0;">
      <q-table
          :rows="thirdrows"
          :columns="thirdcolumns"
          row-key="id"
          :hide-default-footer="true"
          hide-bottom
      >

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <template v-if="col.name === 'GSE id'">
                <!-- Wrap the value in an anchor tag with the appropriate href and target="_blank" -->
                <a :href="generatethirdLink(props.row['GSE id'])" target="_blank">{{ props.row['GSE id'] }}</a>
              </template>
              <!-- If it's not 'GSE id', display the value as usual -->
              <template v-else-if="col.name === 'Summary' || col.name === 'Title'">
                <div class="summary">{{ props.row[col.name] }}</div>
              </template>
              <template v-else>
                <div v-html="props.row[col.name]" />
              </template>

            </q-td>
            <!-- Button column only for the first row -->
            <q-td v-if="props.rowIndex === 0">
              <q-btn flat @click="toggleThirdDetails(props.row)" label="Details" color="primary" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-card v-if="thirdDetailsVisible" class="q-mt-md">
        <q-card-section>
          <q-table
              :rows="thirddetailRows"
              :columns="thirddetailColumns"
              row-key="GSM ID"
              :hide-default-footer="true"
          />
          <q-btn @click="toggleThirdDetails(null)" label="Hide Details" style="background: midnightblue; color: white" class="q-mt-md" />
          <q-btn color="indigo-6" icon-right="send" label="Go To The Article" class="q-mt-md" :style="{ 'margin-left': '15px' }" @click="openLink3" />
        </q-card-section>
      </q-card>


      <!-- 评论区 -->
      <q-separator spaced />
      <q-card-section>
        <div class="text-h6">Leave a Comment</div>

        <!-- 提交评论表单 -->
        <div class="q-mt-md">
          <q-input
              v-model="form.username"
              label="Your Name"
              outlined
          />
          <q-input
              v-model="form.comment"
              label="Your Comment"
              type="textarea"
              outlined
              class="q-mt-md"
          />
          <q-btn
              color="primary"
              label="Submit"
              class="q-mt-md"
              @click="submitComment"
          />
        </div>
      </q-card-section>



      <!-- 评论展示区 -->
      <q-separator spaced />
      <q-card-section>
        <div class="text-h6">Comments</div>

        <q-card
            v-for="(c, index) in demoComments"
            :key="index"
            class="q-mt-md q-pa-md"
            bordered
            flat
        >
          <div class="text-caption text-grey">{{ c.username }}</div>
          <div class="text-subtitle1" v-html="c.comment"></div>
        </q-card>
      </q-card-section>


    </q-card>
  </div>
</template>



<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        comment: ""
      },
      demoComments: [
        { username: "Joyce", comment: "<b>PMID:34004145</b> — This study is the first to reveal that small RNAs can carry N-glycan modifications and localize to the cell surface, suggesting their potential involvement in cell communication and immune regulation. It represents a groundbreaking advance at the intersection of RNA biology and glycobiology, with remarkable innovation and foresight." },
        { username: "Bob", comment: "<b>PMID:38262409</b> —  This study shows that cell-surface RNAs, especially glycoRNAs, are crucial for recruiting neutrophils to inflamed tissues, mediating adhesion and migration via interactions with endothelial cells." },
      ],
      rows: [
        {
          'GSE id': 'GSE136967',
          samples: 4,
          Title: 'Small RNAs are modified with N-glycans and displayed on the surface of living cells',
          Organism: '<i>Homo sapiens</i>',  // ← 这里改成带 HTML 标签的
          Summary: 'Ac4ManNAz enriched small RNAs',
          Publish: 2021,
          Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/34004145/" target="_blank">PMID:34004145</a>',
          'Library preparation process': 'The 150 ng of small RNAs isolated before MyOne C1 capture were lyophilized dry and then T4 PNK mix (2 μL 5× buffer (500 mM Tris HCl pH 6.8, 50 mM MgCl2, 50 mM DTT), 1 μL T4 PNK (NEB), 1 μL FastAP (Thermo Fisher Scientific), 0.5 μL SUPERaseIn, and 5.5 μL water) was added for 45 min at 37°C. Next, a pre-adenylated-3′linker was ligated by adding 3′Ligation Mix (1 μL of 3 μM L3-Bio_Linker, 1 μL RNA Ligase I (NEB), 1 μL 100 mM DTT, 1 μL 10× RNA Ligase Buffer (NEB) and 6 μL 50% PEG8000 (NEB)) to the T4 PNK reaction and incubating for 4 h at 25°C. Unligated L3-Bio_Linker was digested by adding 2 μL of RecJ (NEB), 1.5 μL 5′ Deadenylase (NEB), 3 μL of 10× NEBuffer 1 (NEB) and incubating the reaction at 37°C for 60 min. Ligated RNA was purified with Zymo columns as described above and lyophilized dry. cDNA synthesis, enrichment of cDNA:RNA hybrids, cDNA elution, cDNA circularization, cDNA cleanup, first-step PCR, PAGE purification, and second-step PCR took place exactly as previously describe.Washed MyOne C1 beads bounded to ManNAz-labeled small RNAs were processed as described before (Flynn et al., 2016) with the following modifications. For the on-bead ligation step, a non-biotinylated 3′linker oligo was used (L3-Linker) (Flynn et al., 2016) such that all RNAs captured on the beads would be included in the sequencing library. After completing the second-step PCR for both the input and bead-enriched samples, the dsDNA libraries were quantified on a High Sensitivity DNA Bioanalyzer chip (Agilent) and sequenced on a NextSeq 500 instrument (Illumina).',
          'Whether full-length cDNA is required': 'yes',
          'Mass spectrometry/chromatography analysis method': 'Native sialic acids on RNA or DNA were derivatized with 4,5-Methylenedioxy-1,2-phenylenediamine dihydrochloride (DMB) and detected via reverse phase high-performance liquid chromatography (HPLC) according to established methods.',
          'Whether the glycans detected by this method contain sialic acid': 'yes',
        }
      ]
,
      columns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'samples', align: 'right', label: 'Samples', field: 'samples', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'Organism', align: 'left', label: 'Organism', field: 'Organism', sortable: true },
        { name: 'Summary', align: 'left', label: 'Summary', field: 'Summary', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
        { name: 'Library preparation process', align: 'left', label: 'Library preparation process', field: 'Library preparation process', sortable: true, headerStyle: 'white-space: pre-line;' },
        { name: 'Whether full-length cDNA is required', align: 'left', label: 'full-length cDNA required', field: 'Whether full-length cDNA is required', sortable: true },
        { name: 'Mass spectrometry/chromatography analysis method', align: 'left', label: 'Mass spectrometry/\nchromatography', field: 'Mass spectrometry/chromatography analysis method', sortable: true, headerStyle: 'white-space: pre-line;' },
        { name: 'Whether the glycans detected by this method contain sialic acid', align: 'left', label: 'glycans detected by this\nmethod contain sialic acid', field: 'Whether the glycans detected by this method contain sialic acid', sortable: true, headerStyle: 'white-space: pre-line;' },
      ],
      detailRows:  [
          { 'GSM ID': 'GSM4064120', 'cell line': 'HeLa', 'condition/treatment': 'Input', 'title':'HeLa_SmallRNA_Input', 'sample type':'Input small RNAs', 'library strategy':'ncRNA-Seq', },
          { 'GSM ID': 'GSM4064121', 'cell line': 'HeLa', 'condition/treatment': 'ManNAz enriched', 'title':'HeLa_SmallRNA_ManNAz-enrich', 'sample type':'ManNAz enriched small RNAs', 'library strategy':'ncRNA-Seq',},
          { 'GSM ID': 'GSM4064122', 'cell line': 'H9 embryonic stem cells', 'condition/treatment': 'Input', 'title':'HeLa_SmallRNA_Input', 'sample type':'Input small RNAs', 'library strategy':'ncRNA-Seq',},
          { 'GSM ID': 'GSM4064123', 'cell line': 'H9 embryonic stem cells', 'condition/treatment': 'ManNAz enriched', 'title':'HeLa_SmallRNA_ManNAz-enrich', 'sample type':'ManNAz enriched small RNAs', 'library strategy':'ncRNA-Seq',},
      ],
      detailColumns: [
          { name: 'GSM ID', align: 'left', label: 'GSM ID', field: 'GSM ID', sortable: true },
          { name: 'cell line', align: 'left', label: 'Cell Line', field: 'cell line', sortable: true },
          { name: 'condition/treatment', align: 'left', label: 'Condition/Treatment', field: 'condition/treatment', sortable: true },
          { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
          { name: 'sample type', align: 'left', label: 'Sample type', field: 'sample type', sortable: true },
          { name: 'library strategy', align: 'left', label: 'Library strategy', field: 'library strategy', sortable: true },
      ],
      secondrows: [
        { 'GSE id': 'GSE224128', samples: 13, Title: 'Cell surface RNAs control neutrophil recruitment',
          Organism: '<i>Mus musculus</i>',
          Summary: 'These data are used to determine whether extracellular RNase A treatment affects cellular RNA levels.\n' +
              'GlycoRNAs were sequenced in both primary bone marrow neutrophils as well as an in vitro neutriphil differentiation cell line (HOXB8).',
          Publish: 2023, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/38262409/" target="_blank">PMID:38262409</a>',
          'Library preparation process': 'RNAseq library preparation via polyA selection and sequencing were performed by Yale Center for Genomic Analysis using standard Illumina kits, with the libraries sequenced on an llumina NovaSeq sequencer.Library preparation follows identical steps as Illumina’s TruSeq Small RNA Library Prep kit. The resultant libraries were sequenced by Yale Center for Genomic Analysis using an Illumina NovaSeq sequencer.',
          'Whether full-length cDNA is required': 'RNA-seq:no; ncRNA-seq:yes',
          'Mass spectrometry/chromatography analysis method': 'no',
          },

      ],
      secondcolumns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'samples', align: 'right', label: 'Samples', field: 'samples', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'Organism', align: 'left', label: 'Organism', field: 'Organism', sortable: true },
        { name: 'Summary', align: 'left', label: 'Summary', field: 'Summary', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
        { name: 'Library preparation process', align: 'left', label: 'Library preparation process', field: 'Library preparation process', sortable: true, headerStyle: 'white-space: pre-line;' },
        { name: 'Whether full-length cDNA is required', align: 'left', label: 'full-length cDNA required', field: 'Whether full-length cDNA is required', sortable: true },
        { name: 'Mass spectrometry/chromatography analysis method', align: 'left', label: 'Mass spectrometry/\nchromatography', field: 'Mass spectrometry/chromatography analysis method', sortable: true, headerStyle: 'white-space: pre-line;' },
      ],
      seconddetailColumns: [
        { name: 'GSM ID', align: 'left', label: 'GSM ID', field: 'GSM ID', sortable: true },
        { name: 'cell line', align: 'left', label: 'Cell Line', field: 'cell line', sortable: true },
        { name: 'condition/treatment', align: 'left', label: 'Condition/Treatment', field: 'condition/treatment', sortable: true },
        { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
        { name: 'sample type', align: 'left', label: 'Sample type', field: 'sample type', sortable: true },
        { name: 'library strategy', align: 'left', label: 'Library strategy', field: 'library strategy', sortable: true },
      ],
      seconddetailRows:  [
        { 'GSM ID': 'GSM7015597', 'cell line': 'Bone marrow neutrophils', 'condition/treatment': 'Mock', 'title':'Control RNA, rep1', 'sample type':'/', 'library strategy':'RNA-Seq', },
        { 'GSM ID': 'GSM7015598', 'cell line': 'Bone marrow neutrophils', 'condition/treatment': 'Mock', 'title':'Control RNA, rep2', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM7015599', 'cell line': 'Bone marrow neutrophils', 'condition/treatment': 'Extracellular RNase A', 'title':'exRNaseA digested, rep1', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM7015600', 'cell line': 'Bone marrow neutrophils', 'condition/treatment': 'Extracellular RNase A', 'title':'exRNaseA digested, rep2', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM7932309', 'cell line': 'HOXB8 cell line', 'condition/treatment': 'Undifferentiated', 'title':'Input sample, HOXB8 cells [small RNA]', 'sample type':'/', 'library strategy':'ncRNA-Seq', },
        { 'GSM ID': 'GSM7932310', 'cell line': 'HOXB8 cell line', 'condition/treatment': 'Undifferentiated', 'title':'Biotin purified sample, HOXB8 cells [small RNA]', 'sample type':'/', 'library strategy':'ncRNA-Seq',},
        { 'GSM ID': 'GSM7932311', 'cell line': 'HOXB8 cell line', 'condition/treatment': 'Undifferentiated', 'title':'WGA purified sample, HOXB8 cells [small RNA]', 'sample type':'/', 'library strategy':'',},
        { 'GSM ID': 'GSM7932312', 'cell line': 'HOXB8 cell line', 'condition/treatment': 'Differentiated', 'title':'Input sample, Differentiated HOXB8 cells [small RNA]', 'sample type':'/', 'library strategy':'ncRNA-Seq',},
        { 'GSM ID': 'GSM7932313', 'cell line': 'HOXB8 cell line', 'condition/treatment': 'Differentiated', 'title':'Biotin purified sample, Differentiated HOXB8 cells [small RNA]', 'sample type':'/', 'library strategy':'ncRNA-Seq', },
        { 'GSM ID': 'GSM7932314', 'cell line': 'HOXB8 cell line', 'condition/treatment': 'Differentiated', 'title':'WGA purified sample, Differentiated HOXB8 cells [small RNA]', 'sample type':'/', 'library strategy':'ncRNA-Seq',},
        { 'GSM ID': 'GSM7932315', 'cell line': 'HOXB8 cell line', 'condition/treatment': 'Differentiated', 'title':'Biotin purfied and PNGase digested sample, Differentiated HOXB8 cells [small RNA]', 'sample type':'/', 'library strategy':'',},
        { 'GSM ID': 'GSM7932316', 'cell line': 'Bone marrow neutrophils', 'condition/treatment': 'N/A', 'title':'Input sample, primary neutrophils [small RNA]', 'sample type':'/', 'library strategy':'ncRNA-Seq',},
        { 'GSM ID': 'GSM7932317', 'cell line': 'Bone marrow neutrophils', 'condition/treatment': 'N/A', 'title':'WGA purfiied sample, primary neutrophils [small RNA]', 'sample type':'/', 'library strategy':'ncRNA-Seq',},
      ],
      thirdrows: [
        { 'GSE id': 'GSE150237', samples: 21, Title: 'Natural display of nuclear-encoded RNA on the cell surface and its impact on cell interaction',
          Organism: '<i>Homo sapiens</i>; <i>Mus musculus</i>', Summary: 'This SuperSeries is composed of the SubSeries listed below.' ,
          Publish: 2020, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/32907628/" target="_blank">PMID:32907628</a>',
          'Whether full-length cDNA is required': 'no',
          'Mass spectrometry/chromatography analysis method': 'no',},
        { 'GSE id': 'GSE150233', samples: 2, Title: 'Natural display of nuclear-encoded RNA on the cell surface and its impact on cell interaction [Single Cell RNA-seq]',
          Organism: '<i>Homo sapiens</i>',
         Summary: 'These data highlight maxRNAs as a functional component of the cell surface, suggesting an expanded role for RNA in cell-cell interaction and communication.',
          Publish: 2020, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/32907628/" target="_blank">PMID:32907628</a>',
          'Whether full-length cDNA is required': 'no',
          'Mass spectrometry/chromatography analysis method': 'no',},
        { 'GSE id': 'GSE150234', samples: 14, Title: 'Natural display of nuclear-encoded RNA on the cell surface and its impact on cell interaction [SurfaceFISHSeq]',
          Organism: '<i>Homo sapiens</i>',
          Summary: 'These data highlight maxRNAs as a functional component of the cell surface, suggesting an expanded role for RNA in cell-cell interaction and communication.',
          Publish: 2020, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/32907628/" target="_blank">PMID:32907628</a>',
          'Whether full-length cDNA is required': 'no',
          'Mass spectrometry/chromatography analysis method': 'no',},
        { 'GSE id': 'GSE150235', samples: 5, Title: 'Natural display of nuclear-encoded RNA on the cell surface and its impact on cell interaction [surfaceSeq]',
          OOrganism: '<i>Homo sapiens</i>',
          Summary: 'These data highlight maxRNAs as a functional component of the cell surface, suggesting an expanded role for RNA in cell-cell interaction and communication.',
          Publish: 2020, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/32907628/" target="_blank">PMID:32907628</a>',
          'Whether full-length cDNA is required': 'no',
          'Mass spectrometry/chromatography analysis method': 'no',},
        // Add more data rows here
      ],
      thirdcolumns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'samples', align: 'right', label: 'Samples', field: 'samples', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'Organism', align: 'left', label: 'Organism', field: 'Organism', sortable: true },
        { name: 'Summary', align: 'left', label: 'Summary', field: 'Summary', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
        { name: 'Whether full-length cDNA is required', align: 'left', label: 'full-length cDNA required', field: 'Whether full-length cDNA is required', sortable: true },
        { name: 'Mass spectrometry/chromatography analysis method', align: 'left', label: 'Mass spectrometry/\nchromatography', field: 'Mass spectrometry/chromatography', sortable: true, headerStyle: 'white-space: pre-line;' },
       ],
      thirddetailRows:  [
        { 'GSM ID': 'GSM4543831', 'cell line': 'PBMC', 'condition/treatment': 'isFISH Positive', 'title':'isFISH Positive Sample', 'sample type':'/', 'library strategy':'RNA-Seq', },
        { 'GSM ID': 'GSM4543832', 'cell line': 'PBMC', 'condition/treatment': 'isFISH Positive', 'title':'isFISH Positive Sample', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543833', 'cell line': 'PBMC', 'condition/treatment': 'Test', 'title':'Probe library pulldown', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543834', 'cell line': 'PBMC', 'condition/treatment': 'Control', 'title':'Non-crosslinked dArt4 pulldown', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543835', 'cell line': 'PBMC', 'condition/treatment': 'Control', 'title':'Non-crosslinked library pulldown', 'sample type':'/', 'library strategy':'RNA-Seq', },
        { 'GSM ID': 'GSM4543836', 'cell line': 'PBMC', 'condition/treatment': 'Control', 'title':'Probe dArt4 pulldown', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543837', 'cell line': 'PBMC', 'condition/treatment': 'Control', 'title':'Total membrane', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543838', 'cell line': 'PBMC', 'condition/treatment': 'Control', 'title':'Total membrane', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543839', 'cell line': 'PBMC', 'condition/treatment': 'Control', 'title':'Total membrane', 'sample type':'/', 'library strategy':'RNA-Seq', },
        { 'GSM ID': 'GSM4543840', 'cell line': 'PBMC', 'condition/treatment': 'Test', 'title':'Mem pulldown', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543841', 'cell line': 'PBMC', 'condition/treatment': 'Test', 'title':'Mem pulldown', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543842', 'cell line': 'PBMC', 'condition/treatment': 'Test', 'title':'Mem pulldown', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543843', 'cell line': 'PBMC', 'condition/treatment': 'Test', 'title':'FACS+ pulldown', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543844', 'cell line': 'PBMC', 'condition/treatment': 'Test', 'title':'FACS+ pulldown', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543845', 'cell line': 'PBMC', 'condition/treatment': 'Control', 'title':'FACS- pulldown', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543846', 'cell line': 'PBMC', 'condition/treatment': 'Control', 'title':'FACS- pulldown', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543847', 'cell line': 'lymphoma cell line', 'condition/treatment': '/', 'title':'Surface-seq library', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543848', 'cell line': 'lymphoma cell line', 'condition/treatment': '/', 'title':'Surface-seq library', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543849', 'cell line': 'lymphoma cell line', 'condition/treatment': '/', 'title':'Surface-seq library', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543850', 'cell line': 'lymphoma cell line', 'condition/treatment': '/', 'title':'Surface-seq library', 'sample type':'/', 'library strategy':'RNA-Seq',},
        { 'GSM ID': 'GSM4543851', 'cell line': 'lymphoma cell line', 'condition/treatment': '/', 'title':'Surface-seq library', 'sample type':'/', 'library strategy':'RNA-Seq',},
      ],
      thirddetailColumns: [
        { name: 'GSM ID', align: 'left', label: 'GSM ID', field: 'GSM ID', sortable: true },
        { name: 'cell line', align: 'left', label: 'Cell Line', field: 'cell line', sortable: true },
        { name: 'condition/treatment', align: 'left', label: 'Condition/Treatment', field: 'condition/treatment', sortable: true },
        { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
        { name: 'sample type', align: 'left', label: 'Sample type', field: 'sample type', sortable: true },
        { name: 'library strategy', align: 'left', label: 'Library strategy', field: 'library strategy', sortable: true },
      ],
      forthrows: [
        { 'GSE id': '/', Title: 'Novel Approach to Enriching Glycosylated RNAs: Specific Capture of GlycoRNAs via Solid-Phase Chemistry', 'cell line': 'MIA PaCa-2 ＆ hTERT-HPNE',
          Organism: '<i>Homo sapiens</i>', Publish: 2023, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/37524653/" target="_blank">PMID:37524653</a>',
          'Library preparation process': 'Enrichments containing small RNA N-glycans and their libraries for small RNA sequencing were prepared using the NEBNext Small RNA Library Prep Set for Illumina (New England Biolabs, USA).',
          'Whether full-length cDNA is required': 'yes',
          'Mass spectrometry/chromatography analysis method': ' N-glycans were separated on a hydrophilic interaction chromatography DIOL column (100 mm x 2.1 mm, 3 μm, Fortis) connected to a UPLC system (Thermo Scientific Vanquish™ Flex) online coupled with fluorescence detector equipped with an ESI source 1. MS analysis was performed using a spray voltage of 3.8 KV (positive-mode). Spectra were collected from glycans at m/z 400-1800 Da. Automatic gain control (AGC) for MS1 was set to 3x106 for a maximum time of 60 ms; AGC target for MS/MS was set to 5x104 (resolution of 17,500, intensity threshold 4x104, maximum injection time (IT) 100 ms) of the 20 most abundant ions. Charge state screening was enabled to reject unassigned, singly charged, and equal or more than eight protonated ions. A dynamic exclusion time of 25 s was used to discriminate previously selected ions. N-glycan sample was reconstituted in 20 µL of 0.2% FA and 10 µL was injected into an UPLC system. The gradient elution system consisted of solvent A (water containing 0.1% formic acid) and solvent B (ACN containing 0.1% formic acid) at a flow rate of 0.2 mL/min was conducted as follows: 0-5 min, 95% solvent B; 5–25 min, 95–40% solvent B; 25–45 min, 40% solvent B; 45.1−50 min, 95% solvent B. Glycan composition was determined manually by searching the databases in GlycoWorkBench and the characteristics fragmentation ions of glycan in MS/MS spectra.',
          'Whether the glycans detected by this method contain sialic acid': 'It was not explicitly mentioned, but the method is designed for N-glycans containing Gal and GalNAc.',
        },
      ],
      forthcolumns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'Organism', align: 'left', label: 'Organism', field: 'Organism', sortable: true },
        { name: 'cell line', align: 'left', label: 'Cell line', field: 'cell line', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
        { name: 'Library preparation process', align: 'left', label: 'Library preparation process', field: 'Library preparation process', sortable: true, headerStyle: 'white-space: pre-line;' },
        { name: 'Whether full-length cDNA is required', align: 'left', label: 'full-length cDNA required', field: 'Whether full-length cDNA is required', sortable: true },
        { name: 'Mass spectrometry/chromatography analysis method', align: 'left', label: 'Mass spectrometry/\nchromatography', field: 'Mass spectrometry/chromatography analysis method', sortable: true, headerStyle: 'white-space: pre-line;' },
        { name: 'Whether the glycans detected by this method contain sialic acid', align: 'left', label: 'glycans detected by this method contain sialic acid', field: 'Whether the glycans detected by this method contain sialic acid', sortable: true, headerStyle: 'white-space: pre-line;' },
      ],
      forthdetailRows:  [
        { 'cell line': 'MIA PaCa-2', 'method': 'SPCgRNA: N-glycans containing Gal and GalNAc are oxidized by GAO and bound to aldehydes on the beads; nonglycosylated RNAs are removed by washing with water; the glycosylated RNAs are released with PNGase F ',
          'title':'Differential expression of glycosylated-miRNA by SPCgRNA method', 'amount':'200'},
        { 'cell line': 'hTERT-HPNE', 'method': 'SPCgRNA: N-glycans containing Gal and GalNAc are oxidized by GAO and bound to aldehydes on the beads; nonglycosylated RNAs are removed by washing with water; the glycosylated RNAs are released with PNGase F ',
          'title':'iDifferential expression of glycosylated-miRNA by SPCgRNA method', 'amount':'200'},
      ],
      forthdetailColumns: [
        { name: 'cell line', align: 'left', label: 'Cell Line', field: 'cell line', sortable: true },
        { name: 'method', align: 'left', label: 'Method', field: 'method', sortable: true },
        { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
        { name: 'amount', align: 'left', label: 'Amount', field: 'amount', sortable: true },
      ],
      fifthrows: [
      { 'GSE id': '/', Title: 'N-glycans of glycoRNA in 12 different organs',
        Organism: '<i>Homo sapiens</i>' , Publish: 2023,  Reference: '/',

        'Mass spectrometry/chromatography analysis method': 'C18-RPLC-ESI-MS/MS analysis of the permethylated N-glycans were carried out on a Dionex UltiMate 3000 nano-HPLC system coupled with a nano-electrospray ionization (nano-ESI) Q Exactive mass spectrometer (Thermo Fisher Scientific, San Jose, CA, USA).Permethylated N-glycans were trapped on a C18 (5 μm, 300 Å, Jupiter, Phenomenex) trap column and separated on a C18 analytical column (75 μid, 60 cm long). Buffer A is 0.1% TFA, and Buffer B is 95% ACN with 0.2% TFA. The flow rate of the mobile phase was 300 nL/min. The elution gradient is as follows: 1-25% B for 20 min, up to 60% B in 190 min, up to 95% B in 10 min, kept at 95% B for 10 min, down to 1% B in 5 min and kept at 1% B for 15 min for equilibrium.Mass spectra were acquired in the m/z range 500-2500 using a mass resolution 70 k. For MS/MS spectra, the mass resolution was set at 17,500. Fragmentation was obtained in a data-dependent mode (Top20) with normalized collisional energy of 10%. The automatic gain control (AGC) target values for MS and MS/MS were placed at 2 × 105 and 2 × 105, respectively; the corresponding maximum injection time were 50 and 250 ms. The isolation window and dynamic exclusion time window are 3.0 m/z and 20.0 s. The temperature of the ion transfer capillary was set to 280 °C and the spray voltage was set to 2.8 kV.With the aforementioned instrumental parameters, three technical replicates of RPLC-MS/MS (HCD) analysis of N-glycans from each organ were carried out.',
        'Whether the glycans detected by this method contain sialic acid': 'In the context of N-glycans attached to RNA, it is notable that these glycans predominantly contain fucose, with a significant presence, while sialic acid occupies a smaller proportion.',

      },
    ],
      fifthcolumns: [
      { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
      { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
      { name: 'Organism', align: 'left', label: 'Organism', field: 'Organism', sortable: true },
      { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
      { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
        { name: 'Mass spectrometry/chromatography analysis method', align: 'left', label: 'Mass spectrometry/\nchromatography', field: 'Mass spectrometry/chromatography analysis method', sortable: true, headerStyle: 'white-space: pre-line;' },
        { name: 'Whether the glycans detected by this method contain sialic acid', align: 'left', label: 'glycans detected by this method contain sialic acid', field: 'Whether the glycans detected by this method contain sialic acid', sortable: true, headerStyle: 'white-space: pre-line;' },

      ],
      fifthdetailRows: [
      { 'organ': 'fat', 'method': 'RNAs were first prepared, N-glycans were then enzymatically released, hydrophilically enriched, permethylated, analyzed by RPLC-MS/MS, and finally identified by N-glycan search engine GlySeeker ',
        'title':'N-glycans of glycoRNA in 12 different organs', 'amount':'110'},
      { 'organ': 'muscle', 'method': 'RNAs were first prepared, N-glycans were then enzymatically released, hydrophilically enriched, permethylated, analyzed by RPLC-MS/MS, and finally identified by N-glycan search engine GlySeeker ',
        'title':'N-glycans of glycoRNA in 12 different organs', 'amount':'24'},
      { 'organ': 'testis', 'method': 'RNAs were first prepared, N-glycans were then enzymatically released, hydrophilically enriched, permethylated, analyzed by RPLC-MS/MS, and finally identified by N-glycan search engine GlySeeker ',
          'title':'N-glycans of glycoRNA in 12 different organs', 'amount':'75'},
      { 'organ': 'brain', 'method': 'RNAs were first prepared, N-glycans were then enzymatically released, hydrophilically enriched, permethylated, analyzed by RPLC-MS/MS, and finally identified by N-glycan search engine GlySeeker ',
          'title':'N-glycans of glycoRNA in 12 different organs', 'amount':'65'},
      { 'organ': 'heart', 'method': 'RNAs were first prepared, N-glycans were then enzymatically released, hydrophilically enriched, permethylated, analyzed by RPLC-MS/MS, and finally identified by N-glycan search engine GlySeeker ',
          'title':'N-glycans of glycoRNA in 12 different organs', 'amount':'20'},
      { 'organ': 'liver', 'method': 'RNAs were first prepared, N-glycans were then enzymatically released, hydrophilically enriched, permethylated, analyzed by RPLC-MS/MS, and finally identified by N-glycan search engine GlySeeker ',
          'title':'N-glycans of glycoRNA in 12 different organs', 'amount':'68'},
      { 'organ': 'lung', 'method': 'RNAs were first prepared, N-glycans were then enzymatically released, hydrophilically enriched, permethylated, analyzed by RPLC-MS/MS, and finally identified by N-glycan search engine GlySeeker ',
          'title':'N-glycans of glycoRNA in 12 different organs', 'amount':'59'},
      { 'organ': 'spleen', 'method': 'RNAs were first prepared, N-glycans were then enzymatically released, hydrophilically enriched, permethylated, analyzed by RPLC-MS/MS, and finally identified by N-glycan search engine GlySeeker ',
          'title':'N-glycans of glycoRNA in 12 different organs', 'amount':'200'},
      { 'organ': 'kidney', 'method': 'RNAs were first prepared, N-glycans 183 then enzymatically released, hydrophilically enriched, permethylated, analyzed by RPLC-MS/MS, and finally identified by N-glycan search engine GlySeeker ',
          'title':'N-glycans of glycoRNA in 12 different organs', 'amount':'185'},
      { 'organ': 'intestine', 'method': 'RNAs were first prepared, N-glycans were then enzymatically released, hydrophilically enriched, permethylated, analyzed by RPLC-MS/MS, and finally identified by N-glycan search engine GlySeeker ',
          'title':'N-glycans of glycoRNA in 12 different organs', 'amount':'185'},
      { 'organ': 'colon', 'method': 'RNAs were first prepared, N-glycans were then enzymatically released, hydrophilically enriched, permethylated, analyzed by RPLC-MS/MS, and finally identified by N-glycan search engine GlySeeker ',
          'title':'N-glycans of glycoRNA in 12 different organs', 'amount':'253'},
      { 'organ': 'stomach', 'method': 'RNAs were first prepared, N-glycans were then enzymatically released, hydrophilically enriched, permethylated, analyzed by RPLC-MS/MS, and finally identified by N-glycan search engine GlySeeker ',
          'title':'N-glycans of glycoRNA in 12 different organs', 'amount':'199'},
    ],
      fifthdetailColumns: [
      { name: 'organ', align: 'left', label: 'organ', field: 'organ', sortable: true },
      { name: 'method', align: 'left', label: 'Method', field: 'method', sortable: true },
      { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
      { name: 'amount', align: 'left', label: 'Amount', field: 'amount', sortable: true },
      ],
      sixthrows: [
        { 'GSE id': '/', Title: 'Rapid and sensitive detection of native glycoRNAs', 'cell line': 'HeLa/PBMC', Publish: 2023,
          Reference: '/' },
      ],
      sixthcolumns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'cell line', align: 'left', label: 'Cell line', field: 'cell line', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
      ],
      sixthdetailRows: [
        { 'cell line': 'HeLa/PBMC', 'method': 'Native sialic acid diols can be oxidized and the resulting aldehyde ligated to a biotin reagent for detection (rPAL). ',
          'title':'Methods for the detection of glycoRNA.'},
      ],
      sixthdetailColumns: [
        { name: 'cell line', align: 'left', label: 'Cell Line', field: 'cell line', sortable: true },
        { name: 'method', align: 'left', label: 'Method', field: 'method', sortable: true },
        { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
      ],
      sevenrows: [
        { 'GSE id': '/', Title: 'In Situ Visualization of RNA-Specific Sialylation on Living Cell Membranes to Explore N-Glycosylation Sites', 'cell line': 'HeLa/HEK-293T/A549', Publish: 2024,
          Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/38497732/" target="_blank">PMID:38497732</a>' },
      ],
      sevencolumns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'cell line', align: 'left', label: 'Cell line', field: 'cell line', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
      ],
      sevendetailRows: [
        { 'cell line': 'HeLa', 'method': 'HieCo 2: second-generation hierarchical coding strategy for in situ ' +
              'visualization of cell surface RNA-specific sialylation.After covalently binding DNA codes to sialic acids ' +
              'and then binding a DNA code to a target RNA via sequence specificity, cascade decoding processes were performed ' +
              'with subsequent signal amplification that enabled sensitive in situ visualization of low-abundance Y5 RNA-specific ' +
              'sialic acids on living cell membranes. ',
          'title':'the number of the N-glycosylation sites of single Y5 RNA on three different cell lines.',
          'RNA type': 'Y5 RNA'},
        { 'cell line': 'HEK-293T', 'method': 'HieCo 2: second-generation hierarchical coding strategy for in situ ' +
              'visualization of cell surface RNA-specific sialylation.After covalently binding DNA codes to sialic acids ' +
              'and then binding a DNA code to a target RNA via sequence specificity, cascade decoding processes were performed ' +
              'with subsequent signal amplification that enabled sensitive in situ visualization of low-abundance Y5 RNA-specific ' +
              'sialic acids on living cell membranes. ',
          'title':'the number of the N-glycosylation sites of single Y5 RNA on three different cell lines.',
          'RNA type': 'Y5 RNA'},
        { 'cell line': 'A549', 'method': 'HieCo 2: second-generation hierarchical coding strategy for in situ ' +
              'visualization of cell surface RNA-specific sialylation.After covalently binding DNA codes to sialic acids ' +
              'and then binding a DNA code to a target RNA via sequence specificity, cascade decoding processes were performed ' +
              'with subsequent signal amplification that enabled sensitive in situ visualization of low-abundance Y5 RNA-specific ' +
              'sialic acids on living cell membranes. ',
          'title':'the number of the N-glycosylation sites of single Y5 RNA on three different cell lines.',
          'RNA type': 'Y5 RNA'},
      ],
      sevendetailColumns: [
        { name: 'cell line', align: 'left', label: 'Cell Line', field: 'cell line', sortable: true },
        { name: 'method', align: 'left', label: 'Method', field: 'method', sortable: true },
        { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
        { name: 'RNA type', align: 'left', label: 'RNA type', field: 'RNA type', sortable: true },
      ],
      eightrows: [
        { 'GSE id': '/', Title: 'Spatial imaging of glycoRNA in single cells with ARPLA',
          'cell line': 'Hela/SH-SY5Y/PANC-1/HEK293T/HL-60/MCF-10A/MCF-7/MDA-MB-231/THP-1/M0 macrophages/HUVECs',
          Publish: 2023, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/37217750/" target="_blank">PMID:37217750</a>' },
      ],
      eightcolumns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'cell line', align: 'left', label: 'Cell line', field: 'cell line', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
      ],
      eightdetailRows: [
        { 'cell line': 'HeLa', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'Whether the glycoRNA is present on the cell surface',
          'RNA type': 'small nuclear RNA U1'},
        { 'cell line': 'HeLa', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'Whether the glycoRNA is present on the cell surface',
          'RNA type': 'SNORD3a(U3)'},
        { 'cell line': 'HeLa', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'Whether the glycoRNA is present on the cell surface',
          'RNA type': 'SNORD8(U8)'},
        { 'cell line': 'HeLa', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'Whether the glycoRNA is present on the cell surface',
          'RNA type': 'SNORD35a(U35a)'},
        { 'cell line': 'HeLa', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'Whether the glycoRNA is present on the cell surface',
          'RNA type': 'Y5'},
        { 'cell line': 'SH-SY5Y', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'Whether the glycoRNA is present on the cell surface',
          'RNA type': 'small nuclear RNA U1'},
        { 'cell line': 'PANC-1', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'Whether the glycoRNA is present on the cell surface',
          'RNA type': 'small nuclear RNA U1'},
        { 'cell line': 'HEK293T', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'Whether the glycoRNA is present on the cell surface',
          'RNA type': 'small nuclear RNA U1'},
        { 'cell line': 'HL-60', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'U1 glycoRNA clearly colocalized with lipid rafts',
          'RNA type': 'small nuclear RNA U1'},
        { 'cell line': 'MCF-10A', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'The relationship between glycoRNAs and cancer progression',
          'RNA type': 'U1/U35a/Y5'},
        { 'cell line': 'MCF-7', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'The relationship between glycoRNAs and cancer progression',
          'RNA type': 'U1/U35a/Y5'},
        { 'cell line': 'MDA-MB-231', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'The relationship between glycoRNAs and cancer progression',
          'RNA type': 'U1/U35a/Y5'},
        { 'cell line': 'THP-1/M0 macrophages', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'GlycoRNA levels during THP-1 monocyte differentiation to resting (M0) macrophages',
          'RNA type': 'U1/U35a/Y5'},
        { 'cell line': 'THP-1/M0 macrophages/HUVECs', 'method': 'ARPLA:sialic acid aptamer and RNA in situ hybridization-mediated proximity ligation assay.' +
              'It can visualize glycoRNAs in single cells with high sensitivity and selectivity. The signal output of ARPLA occurs ' +
              'only when dual recognition of a glycan and an RNA triggers in situ ligation, followed by rolling circle amplification ' +
              'of a complementary DNA, which generates a fluorescent signal by binding fluorophore-labeled oligonucleotides.',
          'title':'The potential impact of glycoRNAs on the cellular functions of THP-1 monocytes and macrophages',
          'RNA type': '/'},
      ],
      eightdetailColumns: [
        { name: 'cell line', align: 'left', label: 'Cell Line', field: 'cell line', sortable: true },
        { name: 'method', align: 'left', label: 'Method', field: 'method', sortable: true },
        { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
        { name: 'RNA type', align: 'left', label: 'RNA type', field: 'RNA type', sortable: true },
      ],


      ninethrows: [
        { 'GSE id': '/', Title: 'The modified RNA base acp3U is an attachment site for N-glycans in glycoRNA',
          'Cell line': 'HEK293/K562' , Publish: 2024, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/39173631/" target="_blank">PMID:39173631</a>',
          'glycans detected by this method contain sialic acid': 'There are no direct mass spectrometry results for N-glycans; however, the method is designed for glycoRNAs carrying glycans that contain sialic acid.',
          'Mass spectrometry/chromatography analysis method': 'The digested nucleosides were reconstituted in MS buffer A (LC-MS water with 0.1% Formic Acid (FA, LC-MS Grade, Fisher Scientific) (v/v)), and 2 μL was injected for the analysis using the SWAMNA platform.Briefly, the samples were introduced using nanoAcquity UPLC System (Waters) equipped with Hypercarb Porous Graphitic Carbon HPLC Column (1 mm x 100 mm, 3 μm). Separation was carried out at a constant flow rate of 40 μL/min using MS buffer A and buffer B (ACN with 0.1% FA (v/v). The gradient was referred from the previous protocol.Specifically, 0−2 min, 0% B; 2−20 min, 0-16% B; 20−40 min, 16%-72% B; 40−42 min, 72%-100% B; 42-52 min, 100% B; 52-54 min 100%-0% B; 54-65 min 0% B. The analytes were ionized using OptiFlow Turbo V ion source (SCIEX) at 5000 V and analyzed using ZenoTOF 7600 (SCIEX). Ion source gas1, gas2, and curtain gas were at 40, 60, and 35 psi, respectively. The ion transfer tube temperature was set at 200 °C. For zenoSWATH analysis, MS spectra were acquired over a mass range of m/z 200–1250 in positive ionization mode with 0.25 s accumulation time. Collision-induced fragmentation was performed with nitrogen gas using dynamic collision energy. The product ions were monitored from the range m/z 100-1200 with 15 ms accumulation time. For the targeted MRMHR analysis, the monitored masses and charges were listed in Table S1.',
  },
      ],
      ninecolumns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'Cell line', align: 'left', label: 'Cell line', field: 'Cell line', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
        { name: 'Mass spectrometry/chromatography analysis method', align: 'left', label: 'Mass spectrometry/\nchromatography', field: 'Mass spectrometry/chromatography analysis method', sortable: true, headerStyle: 'white-space: pre-line;' },
        { name: 'glycans detected by this method contain sialic acid', align: 'left', label: 'glycans detected by this method contain sialic acids', field: 'glycans detected by this method contain sialic acid', sortable: true, headerStyle: 'white-space: pre-line;' },
      ],
      ninedetailRows: [
        { 'Base Type': 'U' ,'modification type':'acp3U',
          'confirmed or not': 'YES', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'YES',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'yW' ,'modification type':'yW-72',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'YES',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'yW' ,'modification type':'yW-86',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'YES',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'C' ,'modification type':'ac4C',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'D' ,'modification type':'acp3D',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'A' ,'modification type':'Am',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'C' ,'modification type':'Cm',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'D' ,'modification type':'D',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'G' ,'modification type':'Gm',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'C' ,'modification type':'hm5C',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'A' ,'modification type':'I',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'A' ,'modification type':'m1A',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'G' ,'modification type':'m1G',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'I' ,'modification type':'m1I',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'G' ,'modification type':'m2,2G',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'G' ,'modification type':'m2G',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'U' ,'modification type':'m3U',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'C' ,'modification type':'m5C',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'A' ,'modification type':'m6,6A',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'A' ,'modification type':'m6A',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'A' ,'modification type':'m6Am',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'G' ,'modification type':'m7G',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'U' ,'modification type':'mchm5U',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'U' ,'modification type':'mcm5U',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'U' ,'modification type':'mcmo5U',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'yW' ,'modification type':'mimG',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'U' ,'modification type':'ncm5U',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'A' ,'modification type':'t6A',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'U' ,'modification type':'Um',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
        { 'Base Type': 'Y' ,'modification type':'Um',
          'confirmed or not': 'NO', 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF': 'NO',
          'method': 'Coupled large scale rPAL labeling, high efficiency capture, biochemical purification, enzymatic release, ' +
              'and SWATH-MS. Specifically performed the rPAL labeling and captured sialoglycoRNAs on neutravidin resin. After high temperature (45°C) and ' +
              'stringent (4M NaCl and 2M GuHCl) washes, RNA was hydrolyzed with a cocktail of nucleases. Released nucleotides from this step could be putatively ' +
              'from regions of rPAL-labeled RNAs that are surrounding the glyconucleoside.',
          'title':'Types of RNA modifications present in glycosylated RNA in the HEK293/K562 cell line.'},
      ],
      ninedetailColumns: [
        { name: 'Base Type', align: 'left', label: 'Base Type', field: 'Base Type', sortable: true },
        { name: 'modification type', align: 'left', label: 'modification type', field: 'modification type', sortable: true },
        { name: 'Whether it is confirmed or not', align: 'left', label: 'confirmed or not', field: 'confirmed or not', sortable: true },
        { name: 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF', align: 'left', label: 'contain carboxyl group', field: 'Whether it contains a carboxyl group that may be due to the cleavage of PNGaseF', sortable: true },
        { name: 'method', align: 'left', label: 'Method', field: 'method', sortable: true },
        { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
      ],

      tenrows: [
        { 'GSE id': 'GSE291767', Title: 'RNA N-glycosylation enables immune evasion and homeostatic efferocytosis',
          Organism: '<i>Homo sapiens</i>',  Publish: 2025, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/40770106/" target="_blank">PMID:40770106</a>',
          'Library preparation process': 'Total RNA was extracted from THP1 macrophages stimulated with unmodified RNA, acp3U-8C-RNA, untreated small RNA or PNGase F-treated small RNAs for 6 h as described above using the Zymo Direct-zol (catalogue no. R2052; Zymo). After quality checking, total RNA samples were subjected to Illumina Stranded Ligation messenger RNA library preparation followed by Illumina NovaSeq S4 v.1.5 for 200 cycles with 40 million total paired-end reads per sample at the Center for Genome Innovation, Institute for Systems Genomics, University of Connecticut. The raw data were demultiplexed using Illumina’s bcl2fastq v.2.20. Reads in FASTQ files were aligned using HISAT2 v.2.2.1 on the GRCh38 index, with SAMtools v.1.9 for BAM conversion. Fragments per kilobase of transcript per million fragments mapped was calculated from aligned reads using StringTie v.2.1.3 with Ballgown.',
          'Whether full-length cDNA is required': 'no',
          'Mass spectrometry/chromatography analysis method': 'no',

        },
      ],
      tencolumns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'Organism', align: 'left', label: 'Organism', field: 'Organism', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
        { name: 'Library preparation process', align: 'left', label: 'Library preparation process', field: 'Library preparation process', sortable: true, headerStyle: 'white-space: pre-line;' },
        { name: 'Whether full-length cDNA is required', align: 'left', label: 'full-length cDNA required', field: 'Whether full-length cDNA is required', sortable: true },
        { name: 'Mass spectrometry/chromatography analysis method', align: 'left', label: 'Mass spectrometry/\nchromatography', field: 'Mass spectrometry/chromatography analysis method', sortable: true, headerStyle: 'white-space: pre-line;' },
      ],
      tendetailRows: [
        { 'GSM ID': 'GSM8842119', 'cell line': 'THP1-derived macrophages',
          'condition/treatment':'Input', 'library strategy':'RNA-seq (Illumina NovaSeq)'},
        { 'GSM ID': 'GSM8842120', 'cell line': 'THP1-derived macrophages',
          'condition/treatment':'Input', 'library strategy':'RNA-seq (Illumina NovaSeq)'},
        { 'GSM ID': 'GSM8842121', 'cell line': 'THP1-derived macrophages',
          'condition/treatment':'PNGase treated', 'library strategy':'RNA-seq (Illumina NovaSeq)'},
        { 'GSM ID': 'GSM8842122', 'cell line': 'THP1-derived macrophages',
          'condition/treatment':'PNGase treated', 'library strategy':'RNA-seq (Illumina NovaSeq)'},
        { 'GSM ID': 'GSM8842123', 'cell line': 'THP1-derived macrophages',
          'condition/treatment':'Input', 'library strategy':'RNA-seq (Illumina NovaSeq)'},
        { 'GSM ID': 'GSM8842124', 'cell line': 'THP1-derived macrophages',
          'condition/treatment':'Input', 'library strategy':'RNA-seq (Illumina NovaSeq)'},
        { 'GSM ID': 'GSM8842125', 'cell line': 'THP1-derived macrophages',
          'condition/treatment':'Acp3U-8C-modified tRNA', 'library strategy':'RNA-seq (Illumina NovaSeq)'},
        { 'GSM ID': 'GSM8842126', 'cell line': 'THP1-derived macrophages',
          'condition/treatment':'Acp3U-8C-modified tRNA', 'library strategy':'RNA-seq (Illumina NovaSeq)'},
      ],
      tendetailColumns: [
        { name: 'GSM ID', align: 'left', label: 'GSM ID', field: 'GSM ID', sortable: true },
        { name: 'cell line', align: 'left', label: 'Cell Line', field: 'cell line', sortable: true },
        { name: 'condition/treatment', align: 'left', label: 'Condition/Treatment', field: 'condition/treatment', sortable: true},
        { name: 'library strategy', align: 'left', label: 'Library strategy', field: 'library strategy', sortable: true},
      ],

      elevenrows: [
        { 'SRA': 'PRJNA1132718 ', samples: 18, Title: 'Extracellular exosomal RNAs are glyco-modified', Organism: '<i>Homo sapiens</i>', Summary: 'Exosomal glycoRNAs can be transferred to naive cells',
          Publish: 2025, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/40467769/" target="_blank">PMID:40467769</a>' },
        // Add more data rows here
      ],
      elevencolumns: [
        { name: 'SRA', align: 'left', label: 'SRA', field: 'SRA', sortable: true },
        { name: 'samples', align: 'right', label: 'Samples', field: 'samples', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'Organism', align: 'left', label: 'Organism', field: 'Organism', sortable: true },
        { name: 'Summary', align: 'left', label: 'Summary', field: 'Summary', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
      ],
      elevendetailRows: [
        { 'Accession': 'SRX25231059', 'cell line': '293', 'condition/treatment': 'IP_set1', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231060', 'cell line': '293', 'condition/treatment': 'IP_set2', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231061', 'cell line': 'HeLa', 'condition/treatment': 'IP_set2', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231062', 'cell line': 'HeLa', 'condition/treatment': 'negCtrl_set1', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231063', 'cell line': 'HeLa', 'condition/treatment': 'negCtrl_set2', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231064', 'cell line': 'HeLa Exosome', 'condition/treatment': 'IP_set1', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231065', 'cell line': 'HeLa Exosome', 'condition/treatment': 'IP_set2', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231066', 'cell line': 'HeLa Exosome', 'condition/treatment': 'IP_set3', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231067', 'cell line': 'HeLa Exosome', 'condition/treatment': 'negCtrl_set1', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231068', 'cell line': 'HeLa Exosome', 'condition/treatment': 'negCtrl_set2', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231069', 'cell line': '293', 'condition/treatment': 'IP_set3', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231070', 'cell line': '293', 'condition/treatment': 'IP_set4', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231071', 'cell line': '293', 'condition/treatment': 'IP_set5', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231072', 'cell line': '293', 'condition/treatment': 'negCtrl_set1', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231073', 'cell line': '293', 'condition/treatment': 'negCtrl_set2', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231074', 'cell line': '293', 'condition/treatment': 'negCtrl_set3', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231075', 'cell line': '293', 'condition/treatment': 'negCtrl_set4', "platform": "Oxford Nanopore" },
        { 'Accession': 'SRX25231076', 'cell line': 'HeLa', 'condition/treatment': 'IP_set1', "platform": "Oxford Nanopore" }
      ],

      elevendetailColumns: [
        { name: 'Accession', align: 'left', label: 'Accession', field: 'Accession', sortable: true },
        { name: 'cell line', align: 'left', label: 'Cell Line', field: 'cell line', sortable: true },
        { name: 'condition/treatment', align: 'left', label: 'condition/treatment', field: 'condition/treatment', sortable: true },
        { name: 'platform', align: 'left', label: 'platform', field: 'platform', sortable: true },
      ],

      twelverows: [
        { 'GSE id': '/ ', Title: 'Development and application of GlycanDIA workflow for glycomic analysis', Organism: '<i>Homo sapiens</i> ; <i>Mus musculus</i>', Summary: 'Developed the GlycanDIA workflow, integrating HCD-MS/MS with interleaved DIA window technology, accompanied by the GlycanDIA Finder search engine.',
          Publish: 2025, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/40750788/" target="_blank">PMID:40750788</a>' },
        // Add more data rows here
      ],
      twelvecolumns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'Organism', align: 'left', label: 'Organism', field: 'Organism', sortable: true },
        { name: 'Summary', align: 'left', label: 'Summary', field: 'Summary', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
      ],
      twelvedetailRows: [
        { 'Type': 'HMO', 'method': 'GlycanDIA uses complementary MS1- and MS2-centric data analysis to accurately identify glycan types, including N-glycans, O-glycans, and HMOs. For HMO and O-glycan analysis, only the mass window needs to be adjusted to 300–1600 m/z due to their smaller size.', "Structural Isomer Identification (GlycanDIA)": "Distinguishes isomers like 2’-FL vs 3-FL using differences in lactose fragments (325.11 vs 343.12 m/z)" },
        { 'Type': 'O-glycans', 'method': 'GlycanDIA uses complementary MS1- and MS2-centric data analysis to accurately identify glycan types, including N-glycans, O-glycans, and HMOs. For HMO and O-glycan analysis, only the mass window needs to be adjusted to 300–1600 m/z due to their smaller size.', "Structural Isomer Identification (GlycanDIA)": "Differentiates positional isomers of fucose/sialic acid modifications; e.g., signature ion at 657.23 m/z" },
        { 'Type': 'N-glycans', 'method': 'GlycanDIA uses complementary MS1- and MS2-centric data analysis to accurately identify glycan types, including N-glycans, O-glycans, and HMOs. For HMO and O-glycan analysis, only the mass window needs to be adjusted to 300–1600 m/z due to their smaller size.', "Structural Isomer Identification (GlycanDIA)": "Resolves high-mannose types (e.g., 6 Man8 isomers) and α2,3 vs α2,6 sialic acid linkages (292.10/274.09 m/z differences)" },
      ],

      twelvedetailColumns: [
        { name: 'Type', align: 'left', label: 'Type', field: 'Type', sortable: true },
        { name: 'method', align: 'left', label: 'Method', field: 'method', sortable: true },
        { name: 'Structural Isomer Identification (GlycanDIA)', align: 'left', label: 'Structural Isomer Identification (GlycanDIA)', field: 'Structural Isomer Identification (GlycanDIA)', sortable: true },
      ],

      thirteenrows: [
        { 'GSE id': '/ ', Title: 'RNA-binding proteins and glycoRNAs form domains on the cell surface for cell-penetrating peptide entry', Organism: '<i>Homo sapiens</i>',
          Publish: 2025, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/40020667/" target="_blank">PMID:40020667</a>' ,
          'Mass spectrometry/chromatography analysis method': 'Cell surface proximity labeling (HRP-biotin-phenol), affinity pulldown, protease digestion, LC-MS/MS. For RNA-glycan conjugates, in follow-up work, rPAL (RNA-optimized periodate oxidation + aldehyde ligation) combined with SWATH-MS was used.',
          'glycans detected by this method contain sialic acid': 'Yes',

        },

      ],
      thirteencolumns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'Organism', align: 'left', label: 'Organism', field: 'Organism', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
        { name: 'Mass spectrometry/chromatography analysis method', align: 'left', label: 'Mass spectrometry/\nchromatography', field: 'Mass spectrometry/chromatography analysis method', sortable: true, headerStyle: 'white-space: pre-line;' },
        { name: 'glycans detected by this method contain sialic acid', align: 'left', label: 'glycans detected by this method contain sialic acids', field: 'glycans detected by this method contain sialic acid', sortable: true, headerStyle: 'white-space: pre-line;' },

      ],
      thirteendetailRows: [
        {
          "Cell line": "HEK293",
          "Method": "To validate the putative csRBPs identified in mass spectrometry (MS) databases, cells underwent crude biochemical fractionation, separating cytosol from bulk membrane organelles (including ER, Golgi, mitochondria, and plasma membrane). Western blot analysis of the ER protein RPN1 confirmed successful membrane isolation, and the absence of RIOK1 (a “never csRBP,” ) verified specificity. Two putative csRBPs, DDX21 and hnRNP-U, showed strong signals in the cytosolic fraction and specific signals in the membrane fraction in two of the four cell lines. Cell-surface localization was further assessed by staining living cells with commercially available, validated antibodies targeting four putative csRBPs (NCL, hnRNP-U, YBX1, and DDX21) followed by flow cytometry (FACS) analysis.",
        },
        {
          "Cell line": "A549",
          "Method": "To validate the putative csRBPs identified in mass spectrometry (MS) databases, cells underwent crude biochemical fractionation, separating cytosol from bulk membrane organelles (including ER, Golgi, mitochondria, and plasma membrane). Western blot analysis of the ER protein RPN1 confirmed successful membrane isolation, and the absence of RIOK1 (a “never csRBP,” ) verified specificity. Two putative csRBPs, DDX21 and hnRNP-U, showed strong signals in the cytosolic fraction and specific signals in the membrane fraction in two of the four cell lines. Cell-surface localization was further assessed by staining living cells with commercially available, validated antibodies targeting four putative csRBPs (NCL, hnRNP-U, YBX1, and DDX21) followed by flow cytometry (FACS) analysis.",
        },
        {
          "Cell line": "K562",
          "Method": "To validate the putative csRBPs identified in mass spectrometry (MS) databases, cells underwent crude biochemical fractionation, separating cytosol from bulk membrane organelles (including ER, Golgi, mitochondria, and plasma membrane). Western blot analysis of the ER protein RPN1 confirmed successful membrane isolation, and the absence of RIOK1 (a “never csRBP,” ) verified specificity. Two putative csRBPs, DDX21 and hnRNP-U, showed strong signals in the cytosolic fraction and specific signals in the membrane fraction in two of the four cell lines. Cell-surface localization was further assessed by staining living cells with commercially available, validated antibodies targeting four putative csRBPs (NCL, hnRNP-U, YBX1, and DDX21) followed by flow cytometry (FACS) analysis.",
        },
        {
          "Cell line": "AML3 (OCI-AML3)",
          "Method": "To validate the putative csRBPs identified in mass spectrometry (MS) databases, cells underwent crude biochemical fractionation, separating cytosol from bulk membrane organelles (including ER, Golgi, mitochondria, and plasma membrane). Western blot analysis of the ER protein RPN1 confirmed successful membrane isolation, and the absence of RIOK1 (a “never csRBP,” ) verified specificity. Two putative csRBPs, DDX21 and hnRNP-U, showed strong signals in the cytosolic fraction and specific signals in the membrane fraction in two of the four cell lines. Cell-surface localization was further assessed by staining living cells with commercially available, validated antibodies targeting four putative csRBPs (NCL, hnRNP-U, YBX1, and DDX21) followed by flow cytometry (FACS) analysis.",
          }
      ],
      thirteendetailColumns: [
        { name: 'Cell line', align: 'left', label: 'Cell line', field: 'Cell line', sortable: true },
        { name: 'Method', align: 'left', label: 'Method', field: 'Method', sortable: true },
      ],


      fourteenrows: [
          { 'GSE id': 'HRA006257 ', Title: 'Deciphering the RNA landscapes on mammalian cell surfaces', Organism: '<i>Homo sapiens</i>',
              Publish: 2025, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/40973153/" target="_blank">PMID:40973153</a>' ,
              Samples: 28, Summary:'Using self-developed method, we profiled the RNA molecules localized on the outer membrane surface of mononuclear cells from human umbilical cord blood.'
          },

      ],
      fourteencolumns: [
          { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
          { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
          { name: 'Organism', align: 'left', label: 'Organism', field: 'Organism', sortable: true },
          { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
          { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
          { name: 'Samples', align: 'left', label: 'Samples', field: 'Samples', sortable: true, headerStyle: 'white-space: pre-line;' },
          { name: 'Summary', align: 'left', label: 'Summary', field: 'Summary', sortable: true, headerStyle: 'white-space: pre-line;' },

      ],
      fourteendetailRows: [
          {   "Sample ID": " HRS1016788",
              "Cell line": "Bcell_1",
              "Description":"human surface RNA",
              "Gender": "female",
             },
          {   "Sample ID": " HRS1016789",
              "Cell line": "Bcell_2",
              "Description":"human surface RNA",
              "Gender": "female",
          },
          {   "Sample ID": " HRS1016790",
              "Cell line": "Bcell_3",
              "Description":"human surface RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1016791",
              "Cell line": "Tcell_1",
              "Description":"human surface RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1016792",
              "Cell line": "Tcell_2",
              "Description":"human surface RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1016793",
              "Cell line": "Tcell_3",
              "Description":"human surface RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1016794",
              "Cell line": "NKcell_1",
              "Description":"human surface RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1016795",
              "Cell line": "NKcell_2",
              "Description":"human surface RNA",
              "Gender": "female",
          },
          {   "Sample ID": " HRS1016796",
              "Cell line": "NKcell_3",
              "Description":"human surface RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1016797",
              "Cell line": "HSPC_1",
              "Description":"human surface RNA",
              "Gender": "female",
          },
          {   "Sample ID": " HRS1016798",
              "Cell line": "HSPC_2",
              "Description":"human surface RNA",
              "Gender": "female",
          },
          {   "Sample ID": " HRS1016799",
              "Cell line": "HSPC_3",
              "Description":"human surface RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1016800",
              "Cell line": "Monocyte_1",
              "Description":"human surface RNA",
              "Gender": "female",
          },
          {   "Sample ID": " HRS1016801",
              "Cell line": "Monocyte_2",
              "Description":"human surface RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1016802",
              "Cell line": "Monocyte_3",
              "Description":"human surface RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1016803",
              "Cell line": "Y1",
              "Description":"10X single-cell transcriptomic",
              "Gender": "female",
          },
          {   "Sample ID": " HRS1016804",
              "Cell line": "Y3",
              "Description":"10X single-cell transcriptomic",
              "Gender": "female",
          },
          {   "Sample ID": " HRS1016805",
              "Cell line": "Y4",
              "Description":"10X single-cell transcriptomic",
              "Gender": "female",
          },
          {   "Sample ID": " HRS1016806",
              "Cell line": "Y5",
              "Description":"10X single-cell transcriptomic",
              "Gender": "female",
          },
          {   "Sample ID": " HRS1303563",
              "Cell line": "Y-mix-nagitave",
              "Description":"10X single-cell transcriptomic",
              "Gender": "male",
          },

          {   "Sample ID": " HRS1303564",
              "Cell line": "Y-mix-positive",
              "Description":"10X single-cell transcriptomic",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1303565",
              "Cell line": "Human-UCB",
              "Description":"10X single-cell transcriptomic",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1988837",
              "Cell line": "TMonocyte1",
              "Description":"Total RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1988839",
              "Cell line": "TTcell1",
              "Description":"Total RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1988841",
              "Cell line": "TBcell1",
              "Description":"Total RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1988838",
              "Cell line": "TMonocyte2",
              "Description":"Total RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1988840",
              "Cell line": "TTcell2",
              "Description":"Total RNA",
              "Gender": "male",
          },
          {   "Sample ID": " HRS1988842",
              "Cell line": "TBcell2",
              "Description":"Total RNA",
              "Gender": "male",
          },

      ],
      fourteendetailColumns: [
          { name: 'Sample ID', align: 'left', label: 'Sample ID', field: 'Sample ID', sortable: true },
          { name: 'Cell line', align: 'left', label: 'Cell line', field: 'Cell line', sortable: true },
          { name: 'Description', align: 'left', label: 'Description', field: 'Description', sortable: true },
          { name: 'Gender', align: 'left', label: 'Gender', field: 'Gender', sortable: true },
      ],

      fifteenrows: [
        { 'GSE id': 'GSE284296 ', Title: 'GlycoRNAs are abundant in glioma and involved in glioma cell proliferation', Organism: '<i>Homo sapiens</i>',
            Publish: 2025, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/41028727/" target="_blank">PMID:41028727</a>' ,
            Samples: 6, Summary:'In this study, through N-Azidoacetylmannosamine-tetraacylated (Ac4ManNAz) labeling method, glycoRNAs were enriched and purified from glioma cell lines LN229 and U87. Northern blot was performed to test the presence of glycoRNAs. It is noteworthy that we developed a sequencespecific RNA capture magnetic bead system to enrich for a specific glycoRNA such as U2, U4, and Y5. The components of glycoRNAs were analyzed and identified through RNA sequencing and chromatography-mass spectrometry.'
        },

    ],
      fifteencolumns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'Organism', align: 'left', label: 'Organism', field: 'Organism', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
        { name: 'Samples', align: 'left', label: 'Samples', field: 'Samples', sortable: true, headerStyle: 'white-space: pre-line;' },
        { name: 'Summary', align: 'left', label: 'Summary', field: 'Summary', sortable: true, headerStyle: 'white-space: pre-line;' },

    ],
      fifteendetailRows: [
        {   "Sample ID": " GSM8681908",
            "Cell line": "Hela cells, H1",
            "Description":"GlycoRNAs in Glioma Cell Lines LN229 and U87",
        },
        {   "Sample ID": " GSM8681909",
            "Cell line": "Hela cells, H2",
            "Description":"GlycoRNAs in Glioma Cell Lines LN229 and U87",
        },
        {   "Sample ID": " GSM8681910",
            "Cell line": "LN229 cells, LN1",
            "Description":"GlycoRNAs in Glioma Cell Lines LN229 and U87",

        },
        {   "Sample ID": " GSM8681911",
            "Cell line": "LN229 cells, LN2",
            "Description":"GlycoRNAs in Glioma Cell Lines LN229 and U87",

        },
        {   "Sample ID": " GSM8681912",
            "Cell line": "U87 cells, U1",
            "Description":"GlycoRNAs in Glioma Cell Lines LN229 and U87",

        },
        {   "Sample ID": " GSM8681913",
            "Cell line": "U87 cells, U2",
            "Description":"GlycoRNAs in Glioma Cell Lines LN229 and U87",

        },
    ],

      fifteendetailColumns: [
        { name: 'Sample ID', align: 'left', label: 'Sample ID', field: 'Sample ID', sortable: true },
        { name: 'Cell line', align: 'left', label: 'Cell line', field: 'Cell line', sortable: true },
        { name: 'Description', align: 'left', label: 'Description', field: 'Description', sortable: true },
    ],



      sixteenrows: [
        { 'GSE id': 'GSE308686 ', Title: 'Catch and release of sialoglycoRNAs enables sequencing-based profiling across cellular and extracellular material', Organism: '<i>Homo sapiens, Mus musculus,Canis lupus familiaris </i>',
            Publish: 2025, Reference: '<a href="https://pubmed.ncbi.nlm.nih.gov/41256410/" target="_blank">PMID:41256410</a>' ,
            Samples: 244, Summary:'Here  present rPAL sequencing (rPAL-seq), a sensitive and selective platform for de novo discovery of sialoglycoRNAs. When applied across 13 human cell lines, rPAL-seq identified lineage-associated glycoRNA patterns alongside a conserved core dominated by uridine-rich snRNAs and snoRNAs, with modification signatures implicating glycosylation on acp³U or related uridine-based modifications.'
        },

    ],
      sixteencolumns: [
        { name: 'GSE id', align: 'left', label: 'GSE id', field: 'GSE id', sortable: true },
        { name: 'Title', align: 'left', label: 'Title', field: 'Title', sortable: true },
        { name: 'Organism', align: 'left', label: 'Organism', field: 'Organism', sortable: true },
        { name: 'Publish', align: 'center', label: 'Published Year', field: 'Publish', sortable: true },
        { name: 'Reference', align: 'left', label: 'Reference', field: 'Reference', sortable: true },
        { name: 'Samples', align: 'left', label: 'Samples', field: 'Samples', sortable: true, headerStyle: 'white-space: pre-line;' },
        { name: 'Summary', align: 'left', label: 'Summary', field: 'Summary', sortable: true, headerStyle: 'white-space: pre-line;' },

    ],
      sixteendetailRows: [
        {   "Sample ID": " GSM9251283 - GSM9251294",
            "Cell line": "293T",
            "Description":"Input, IP, Control(replicate 1-4)",
        },
        {   "Sample ID": " GSM9251294 - GSM9251306",
            "Cell line": "LPS853",
            "Description":"Input, IP, Control(replicate 1-4)",
        },
        {   "Sample ID": " GSM9251307 - GSM9251318",
            "Cell line": "LN308",
            "Description":"Input, IP, Control(replicate 1-4)",

        },
        {   "Sample ID": " GSM9251319 - GSM9251330",
            "Cell line": "Huh7",
            "Description":"Input, IP, Control(replicate 1-4)",
        },
        {   "Sample ID": " GSM9251331 - GSM9251342",
            "Cell line": "Molm13",
            "Description":"Input, IP, Control(replicate 1-4)",
        },
        {   "Sample ID": " GSM9251343 - GSM9251354",
            "Cell line": "A549",
            "Description":"Input, IP, Control(replicate 1-4)",
        },



    ],
      sixteendetailColumns: [
        { name: 'Sample ID', align: 'left', label: 'Sample ID', field: 'Sample ID', sortable: true },
        { name: 'Cell line', align: 'left', label: 'Cell line', field: 'Cell line', sortable: true },
        { name: 'Description', align: 'left', label: 'Description', field: 'Description', sortable: true },
    ],


      detailsVisible: true,
      secondDetailsVisible: true,
      thirdDetailsVisible: true,
      forthDetailsVisible: true,
      fifthDetailsVisible: true,
      sixthDetailsVisible: true,
      sevenDetailsVisible: true,
      eightDetailsVisible: true,
      nineDetailsVisible: true,
      tenDetailsVisible: true,
      elevenDetailsVisible: true,
      twelveDetailsVisible: true,
      thirteenDetailsVisible: true,
      fourteenDetailsVisible: true,
      fifteenDetailsVisible: true,
      sixteenDetailsVisible: true,
    };
  },


  methods: {
    toggleDetails() {
          // Toggle the visibility of the secondary table
          this.detailsVisible = !this.detailsVisible;
      },
    toggleSecongDetails() {
      // Toggle the visibility of the secondary table
      this.secondDetailsVisible = !this.secondDetailsVisible;
    },
    toggleThirdDetails(row) {
      // Toggle the visibility of the third table
      this.thirdDetailsVisible = !this.thirdDetailsVisible;
    },
    toggleForthDetails(row) {
      // Toggle the visibility of the third table
      this.forthDetailsVisible = !this.forthDetailsVisible;
    },
    toggleFifthDetails(row) {
      // Toggle the visibility of the third table
      this.fifthDetailsVisible = !this.fifthDetailsVisible;
    },
    toggleSixthDetails(row) {
      // Toggle the visibility of the third table
      this.sixthDetailsVisible = !this.sixthDetailsVisible;
    },
    togglesevenDetails(row) {
      // Toggle the visibility of the third table
      this.sevenDetailsVisible = !this.sevenDetailsVisible;
    },
    toggleeightDetails(row) {
      // Toggle the visibility of the third table
      this.eightDetailsVisible = !this.eightDetailsVisible;
    },
    togglenineDetails(row) {
      // Toggle the visibility of the third table
      this.nineDetailsVisible = !this.nineDetailsVisible;
    },
    toggletenDetails(row) {
      // Toggle the visibility of the third table
      this.tenDetailsVisible = !this.tenDetailsVisible;
    },
    toggleelevenDetails(row) {
      // Toggle the visibility of the third table
      this.elevenDetailsVisible = !this.elevenDetailsVisible;
    },
    toggletwelveDetails(row) {
      // Toggle the visibility of the third table
      this.twelveDetailsVisible = !this.twelveDetailsVisible;
    },
    togglethirteenDetails(row) {
      // Toggle the visibility of the third table
      this.thirteenDetailsVisible = !this.thirteenDetailsVisible;
    },
    togglefourteenDetails(row) {
      // Toggle the visibility of the third table
      this.fourteenDetailsVisible = !this.fourteenDetailsVisible;
    },

   togglefifteenDetails(row) {
    // Toggle the visibility of the third table
      this.fifteenDetailsVisible = !this.fifteenDetailsVisible;
   },
    togglesixteenDetails(row) {
        // Toggle the visibility of the third table
        this.sixteenDetailsVisible = !this.sixteenDetailsVisible;
    },

    generateLink(gseId) {
      // 在此处生成链接，例如使用字符串模板
      return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE136967`;
      },
    generatesecondLink(gseId) {
      // 在此处生成链接，例如使用字符串模板
      return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE224128`;
    },
    generatethirdLink(id) {
      // 在此处生成链接，例如使用字符串模板
      return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${id}`;
    },
    generateforthLink(id) {
      // 在此处生成链接，例如使用字符串模板
      return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${id}`;
    },
    generatefifthLink(id) {
      // 在此处生成链接，例如使用字符串模板
      return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${id}`;
    },
    generatesixthLink(id) {
      // 在此处生成链接，例如使用字符串模板
      return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${id}`;
    },
    generatesevenLink(id) {
      // 在此处生成链接，例如使用字符串模板
      return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${id}`;
    },
    generateeightLink(id) {
      // 在此处生成链接，例如使用字符串模板
      return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${id}`;
    },
    generatenineLink(id) {
      // 在此处生成链接，例如使用字符串模板
      return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${id}`;
    },
    generatetenLink(id) {
      // 在此处生成链接，例如使用字符串模板
      return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${id}`;
    },
    generateelevenLink(id) {
      return `https://www.ncbi.nlm.nih.gov/sra?term=${id}`;
    },
    generatetwelveLink(id) {
      return `https://www.ncbi.nlm.nih.gov/sra?term=${id}`;
    },
    generatethirteenLink(id) {
      return `https://www.ncbi.nlm.nih.gov/sra?term=${id}`;
    },
    generatefourteenLink(id) {
      return `https://ngdc.cncb.ac.cn/gsa-human/browse/${id}`;
    },
    generatefifteenLink(id) {
      return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${id}`;
    },
    generatesixteenLink(id) {
        return `https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${id}`;
    },

    openLink1() {
      window.open("https://doi.org/10.1016/j.cell.2021.04.023", "_blank");
    },
    openLink2() {
      window.open("https://doi.org/10.1016/j.cell.2023.12.033", "_blank");
    },
    openLink3() {
      window.open("https://doi.org/10.1186/s13059-020-02145-6", "_blank");
    },
    openLink4() {
      window.open("https://doi.org/10.1021/acs.analchem.3c01630", "_blank");
    },
    openLink5() {
      window.open("https://doi.org/10.1101/2023.09.18.558371", "_blank");
    },
    openLink6() {
      window.open("https://doi.org/10.1101/2023.02.26.530106", "_blank");
    },
    openLink7() {
      window.open("https://doi.org/10.1021/jacs.4c01826", "_blank");
    },
    openLink8() {
      window.open("https://www.nature.com/articles/s41587-023-01801-z", "_blank");
    },
    openLink9() {
      window.open("https://www.cell.com/cell/abstract/S0092-8674(24)00838-9", "_blank");
    },
    openLink10() {
      window.open("https://www.nature.com/articles/s41586-025-09310-6", "_blank");
    },
    openLink11() {
      window.open("https://www.nature.com/articles/s41556-025-01682-1", "_blank");
    },
    openLink12() {
      window.open("https://www.nature.com/articles/s41467-025-61473-y", "_blank");
    },
    openLink13() {
      window.open("https://www.cell.com/cell/fulltext/S0092-8674(25)00109-6", "_blank");
    },
    openLink14() {
      window.open("https://academic.oup.com/proteincell/article/17/2/113/8257599", "_blank");
    },
    openLink15() {
      window.open("https://www.nature.com/articles/s41389-025-00570-5", "_blank");
    },
    openLink16() {
        window.open("https://www.biorxiv.org/content/10.1101/2025.10.04.680438v2.full", "_blank");
    },



      // 加载评论
    async submitComment() {
      const datasetId = this.rows[0]["GSE id"];
      if (!this.form.comment.trim()) {
        this.$q.notify({ type: "negative", message: "Comment cannot be empty!" });
        return;
      }

      try {
        await axios.post("http://1.12.236.3:5000/comments", {
          dataset_id: datasetId,
          username: this.form.username || "Anonymous",
          comment: this.form.comment
        });

        // 提交成功提示
        alert("Comment submitted successfully!");

        this.form.comment = "";
        this.form.username = "";
        this.$q.notify({
          type: "positive",
          message: "Your comment has been submitted successfully!"
        });
      } catch (err) {
        console.error("Failed to submit comment", err);
        this.$q.notify({ type: "negative", message: "Submit failed." });
      }
    }
  }
};
</script>


<style scoped>
.summary {

  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: normal; /* 强制换行 */
}



</style>
