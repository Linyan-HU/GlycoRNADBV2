<template>
  <q-list separator>
    <q-item clickable v-ripple to="/" style="color: midnightblue">
      <q-item-section avatar>
        <q-icon name="home_filled" style="color: midnightblue"/>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-grey-9">Home</q-item-label>
        <q-item-label caption>go homepage</q-item-label>
      </q-item-section>
    </q-item>

    <q-expansion-item icon="tips_and_updates" label="Help" caption="help">
      <q-item clickable v-ripple :inset-level="1" to="/help">
        <q-item-section avatar>
          <q-icon name="local_library" style="color: midnightblue"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>About GlycoRNA</q-item-label>
          <q-item-label caption>database</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :inset-level="1" to="Download">
        <q-item-section avatar>
          <q-icon name="file_download" style="color: midnightblue"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Download</q-item-label>
          <q-item-label caption>download</q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>

    <q-item clickable v-ripple to="/aboutus">
      <q-item-section avatar>
        <q-icon name="groups_3"  style="color: midnightblue"/>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-grey-9">About us</q-item-label>
        <q-item-label caption>About us</q-item-label>
      </q-item-section>
    </q-item>

  </q-list>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {
      menuData: [
        { title: "Home", caption: "home page", icon: "map", route: "/" },
      ],

    };
  },
};
</script>
