<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-white ">
      <q-toolbar >
        <q-btn
          flat
          dense
          round
          icon="menu"
          color="black"
          aria-label="Menu"
          class="menu"
          @click="toggleLeftDrawer"
        />
<div class="text-black">
<img class="logo" height="60" src="~/assets/dexter-logo.png">
</div>
    <!-- <ul class="text-black">
      <li><a href="#home">Home</a></li>
      <li><a href="#news">Newsdfassdfdfgs</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#home">Hosdfsdme</a></li>
      <li><a href="#news">News</a></li>
      <li><a href="#contact">Cosdfntact</a></li>
      <li><a href="#about">About</a></li>
    </ul> -->
<div class="text-black q-ml-xs q-gutter-x-md tabs">
  <span class="nav">Home</span>
  <span class="nav">Syllabus</span>
  <span class="nav">Scholarship & awards</span>
  <span class="nav">Downloads</span>
  <span class="nav">Resource Center</span>
  <span class="nav">Terms & Conditions</span>
</div>
<div class="absolute-right q-mt-lg q-mr-lg">
<q-btn
      no-caps
      rounded
      color="light-blue-6"
      size="12px"
      label="Log in"
    />
</div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import EssentialLink from 'components/EssentialLink.vue'
const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  setup () {
    const leftDrawerOpen = ref(false)
    return {
       tab: ref('mails'),
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-left: 100px;
}
li {
  float: left;
}
li a {
  text-decoration: none;
  display: block;
  padding: 18px 30px 18px 30px;
}
.nav{
  margin: 20px;
  cursor: pointer;
}
.tabs :hover{
color: rgb(0, 153, 255);
border-bottom: 3px solid rgb(0, 153, 255);
padding-bottom: 15px;
}
@media screen and (max-width: 1023.98px){
.tabs{
 display: none;
}
.menu{
  display: block;
}
}
@media screen and (min-width: 1116px) {
.menu{
  display: none;
}
.tabs{
 margin-right: 2%;
 margin-left: 2%;
 color: inherit;
 font-size: 15px;
 line-height: 1;
}
}
/* @media screen and (min-width: 1440px) and (max-width: 1919.98px){
.menu{
display: none;
}
}
@media screen and (min-width: 1920px) {
.menu{
display: none;
}
} */
</style>
