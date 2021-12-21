<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> ExamsDaily </q-toolbar-title>

        <q-toggle
          v-model="dense"
          color="secondary"
          true-value="yes"
          false-value="no"
          @click="darkMode()"
        />
        <!-- <div>{{ todaysDate }}</div> -->
        <q-btn color="red" text-color="white" label="logout" @click="this.$router.push('/')" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { date } from "quasar";
const linksList = [
  {
    title: "Home Page",
    caption: "homepage",
    icon: "home",
    link: "/",
  },
  {
    title: "Login",
    caption: "login",
    icon: "code",
    link: "/#/login",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "D/MM/YYYY hh:mm");
    },
  },
  data() {
    return {
      dense: 'no',
    };
  },
  components: {
    EssentialLink,
  },
  methods: {
    darkMode() {
      if (this.dense == 'yes') {
        // console.log(this.dense);
        this.$q.dark.set(true);
      }
      else{
        // console.log(this.dense);
        this.$q.dark.set(false);
      }
    },
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
