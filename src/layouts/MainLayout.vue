<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> ExamsDaily </q-toolbar-title>

        <q-toggle
          v-model="dense"
          color="dark"
          true-value="yes"
          false-value="no"
          @click="darkMode()"
        />
        <!-- <div>{{ todaysDate }}</div> -->
        <!-- <q-btn color="red" text-color="white" label="logout" @click="this.$router.push('/')" /> -->
        <div class="q-pa-md">
          <q-btn
            round
            color="dark"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
          />
        </div>
        <div class="notification">
          <q-btn round icon="notifications">
            <q-badge floating color="red" rounded />
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="date text-white">{{ todaysDate }}</div>
      <q-item-label header class="profileHeader">
        <q-btn
          class="profilePicture"
          @click="confirm = true"
          round
          color="primary"
          icon="camera"
        />
        <q-dialog v-model="confirm">
          <q-card>
            <q-card-section class="row">
              <q-file v-model="file" ref="file" label="choose" append/>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn @click="setAvatar()" color="primary" label="upload" v-close-popup />
              <q-btn flat label="cancel" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-avatar>
          <img :src="avatar" />
        </q-avatar>
        <div class="text-white username">
          {{ username }}
        </div>
        <div class="text-white email">
          {{ email }}
          <q-icon class="logout" name="fas fa-sign-out-alt" @click="logout()" />
          <!-- <q-tooltip class="text-red"> logout </q-tooltip> -->
          <!-- </q-icon> -->
        </div>
        <!-- <q-file
          class="file"
          ref="file"
          v-model="file"
          @update:model-value="setAvatar()"
        /> -->
      </q-item-label>
      <q-list>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const linksList = [
  {
    title: "Home Page",
    // caption: "homepage",
    icon: "home",
    link: "/#/home",
  },
  // {
  //   title: "Login",
  //   caption: "login",
  //   icon: "code",
  //   link: "/#/login",
  // },
  {
    title: "Profile",
    caption: "View your profile",
    icon: "fas fa-user",
    link: "/#/profile",
  },
  {
    title: "Dashboard",
    // caption: "@QuasarFramework",
    icon: "public",
    link: "/#/dashboard",
  },
  {
    title: "Youtube",
    caption: "ExamsDaily videos",
    icon: "fab fa-youtube",
    link: "https://www.youtube.com/c/Examsdaily",
  },
  {
    title: "Gmail",
    caption: "Mail to examsdaily",
    icon: "fas fa-envelope",
    link: "mailto:support@examsdaily.in",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

import EssentialLink from "components/EssentialLink.vue";
import { date } from "quasar";
import { defineComponent, ref } from "vue";
import Global from "../global/global.js";
import axios from "axios";

export default defineComponent({
  name: "MainLayout",
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "D/MM/YYYY hh:mm a");
    },
  },
  mounted() {
    this.getUserData();
    // this.getAvatar();
  },
  data() {
    return {
      dense: "no",
      username: "",
      email: "",
      confirm: false,
      avatar: null,
      file: [],
    };
  },
  components: {
    EssentialLink,
  },
  methods: {
    darkMode() {
      if (this.dense == "yes") {
        // console.log(this.dense);
        this.$q.dark.set(true);
      } else {
        // console.log(this.dense);
        this.$q.dark.set(false);
      }
    },
    getUserData() {
      var currentUser = JSON.parse(localStorage.getItem("current_user"));
      this.avatar = currentUser.avatar;
      this.username = currentUser.username;
      this.email = currentUser.email[0];
      if (currentUser.avatar != null) {
        this.avatar = currentUser.avatar;
        localStorage.setItem("avatar", currentUser.avatar);
        console.log(localStorage.getItem("avatar"));
      } else {
        this.avatar =
          "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
        localStorage.setItem("avatar", this.avatar);
      }
      // console.log("thiss.avatar", this.avatar);
    },
    fileUpload() {
      this.$refs.file.pickFiles();
    },
    setAvatar() {
      // console.log("file", this.file);
      var authAxios = axios.create();
      var formData = new FormData();
      formData.append("file", this.file);
      // console.log("formData",formData);
      return new Promise((resolve, reject) => {
        authAxios
          .post("http://localhost:8888/image/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // console.log("imageUpload", response.data);
            localStorage.setItem("avatar", response.data);
            this.avatar = localStorage.getItem("avatar");
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getAvatar() {
      return new Promise((resolve, reject) => {
        axios
          .get("/image/get/2")
          .then((response) => {
            // console.log("getAvatar()", response.data);
            this.avatar = response.data;
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        var accessToken = localStorage.getItem("accessToken");
        Global.logout(accessToken)
          .then((response) => {
            localStorage.clear();
            this.$router.push("/");
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
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

<style scoped>
.profileHeader {
  height: 20%;
  background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhMVFhMSFQ8VGBcVFhUPFRgXFRUWFxUXFxUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOkA2AMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EADQQAAIBAgQDBgQGAwEBAAAAAAABAgMRBCExUQUSQSJhcYGRoROxwdEUMkJS4fAGI/EVsv/EABoBAAMBAQEBAAAAAAAAAAAAAAECAwAEBQb/xAAqEQACAgEDAwMEAgMAAAAAAAAAAQIRIQMSMUGh4QVRUhMVIkIyYgQUcf/aAAwDAQACEQMRAD8AxMPif0yfgxq5ksawuJ6S8n9z7XW0P2ifI2NVKiim28kY1bEylK/ou4vjsTzuy/KvfvFkJDTpZKJB4zuduLhYz3JT06yhWi9xerXvkilWrfwBjw06yykYdWaeBxV+y3n0e/8AI7cwUzUwmJ5lZ/mXv3j62jT3RFnHqhlyMjic3GafSS+X9RqmdxmHZi9nb1/4GOklGmHT/lkDGd80ztxCnNrQcpzUtCE9PaUlGi9zquRIjYsY7nROy9Gdn4jVxA0MLBzXzZ0TglwEkU3khn4PLFt62fkGp01HQri32H5fMkwNmemS5U6JpwuRAZxPD4zXNHst59z8uhkV6MoO0k18n4M9DhZXgvT0L1KakrSV13l46zg6fBeM2jy9yXNHF8KazhmtuvluZ1jp+rGrKJ2S5CEOSU3J2E0mRI6Q6pz6I42K1Y2ZUYrRuvApSo38CfJWLtFIQb0G6dJItGNtDpRRoJnYmhyvLR/2wE1pxTVmZtak4u3oLJUUi7KjeGhZX6sXoQu+4cnNLVm1ZdBkgkZtA8ZLmg49Xml4Z/QUq4v9vqM8Ep803J/pXu/6yW9pCzqK3GbTore4eGRziWH+HUaWjzXg+nkAVRiO5DfyVjpIQb0RbBxUld+g4mh4RcVwc8pNYQKnhktc/kM0520KcxLgak+SLcrsehNMDjX2fNAYTtmgleXOklvmK4stGW5V1FqNK/gFxFPqugaMbZHS8IbUXWkttHMA8mtmNCmEVpNbq/8AfU7jMTy5L8z9iE4NzpEVF8FMbibdmOvV7dxk1qfVBzh0rSSjtLJUhIgWtTtmtCHLKLi6ZhjhvE7dippopPp3P7m1ZHjpGnwvifJaE849Hq1/B20HU0+qNqtZLRZgFbYk53zOIUjq6f4WuS3Ijnw0Q6pBOXfL3K/CA4miuXtNJblcVj1HJZv2RmVaspvtO/yXghXI6NOM3lhfjcqsl5/YBKTebCnHE5fqXydFgjf4NStC/wC7P7GNTw7k7I9JQjaKS6fQE3gh/kSxQnxrDc0OZawz8uv38jzp7Fnm62F5Krj0Wa8On2Dpu8G/x9TDTD0lay2GBcLTZ1cCsuQgOU9gSko8gLSmU1KhIkFNuVmKqbXVhFiJAmdjG52NqrG3NdQ6xL1srq4hPEO7us+8bYKtS5vE53J3aDHUzkW+O+4nx33A5Rtkzgu+XuWsYoc0nbp18CDmGpcq73qQqljJzz1G3gwXqEhEkYli6R3sawmK5cn+X5GpF3zRhDGExThk84/LwBKPsK1ZrlqcbsHCSautBqjGy8REeVqR2toxuM0bT5ukl7rX6CVNZm9xSjzU3vHtLy19rmHSRLVwjs0Z3D/hcNh8O5dy3+wXDYS+ctNtx9KwuloXmQzZWjTUckPxQpTWaGJ1Nja8W5JI5tblF27CeKpqbvo1dJhWm9zqpPYMNKMcvkmk1wZlSk46+pWJrfAfcJuMFNcru1m0tMu8dtFVb6A8RSlHXQAayrRlk/RimJwls45rbqiE4PlCxl0kKBUDQ9g8LzZvKK8riwQzdAqWElPNLL09Ajwc1+n3Q/PExjlFXt5IVqVnLV+XQvTaJ7mxN0pbP5lXF7DWHnqMxqbk4yi3TwNkyKtJSKYTD53fTTxNxxT6Io6Mdl8iy082ZauKEyFsVUhHJK8vHJeJDOaRlFsAnuddCL/SvQoy0JDRnWGNnoVeEh+33aKPAQ7/AFG1YsCWslwPHd7i1Ch8PO7a2f36B3xC2sff+DlbT0F1G4IyclYNSKbyMriMf2v2Yp8D4fa5JSWbVrZLvWtw9PDpO4/h3kCV1YtrTyjDlxV9IrzdzlPFVp/lsu+2Xvc1eIYeDV3Fc19dH521F4tLKwn1G3llo60WuDlOEks5tvfS3gkDhxGrF2dnbdL6WGExXG0/1ev0GeRsMbp8Z/dD0f0Yf/1qdsr32tb30MCUrAWxoaW7IVppmxiMXKeuS2X13OYP83kxKhWvk9fmP4JZvwBNbU0JTToNWh1KwqNaMYF5xsQTDJEpxUppWV3fuTsr+QxUk9Hlbpol5GZGvapGXSLXp1+p6WvQUvHce9vJGcPYyiMJVpOLswU9GPeLJAqUrMbEhunK6ORjoupWF8bimsllfr9g4vXhzIMdVxxeDUrECEIUKjFi6QvOo0DbY29C7GNuaXUq8QluKhaNK/gK5m2pZCTxGSusm/MZptWyM/Gy7Vtl/foUoVbF4L8bGq1ZqhsK9ROFfcZozSu+lvkZ8MlPMQWMneVtgB13eZ3l3ObkMNNtYKlK9VRXa69OoKvjEsoev2EZPqysNN8svHSrlhYUOZXUvbQ7+De/sAo1eV39TRjK6uhvqzXUM3KIp+De6H8FeOUs21l321+Z2hS5nb18BfiNS1Xs/oUUvn9RJazeJAjJyeTQlWt0B1Kt1axelUUkmupHTRdQhzQZQl0ZlTg1qeqwFXmpxfcr+KyfyMWph7jnDMQqcHGb0bt1bT/m4mtDGBJJ1k1JwTVnoZeOo8nXJ6blcRxOTyiuVb6v+BGUm83m+/MnGLMtG+QgbDy6CykXhLO5OUWicoOI5IGWmykpJauxB8isWxdPO+5DtbFRs1r7EL6ak1wVjGTXAOSuBasHZ34VxIXdDAaVO77hxKxIxtkgeJlaL9PU2ZOjnbcnQhUldt7sqQ7GNz0OEdXAbDSbaj1eS+xt4fh1k+Z5vbRfcw4ZZrVHqaM+ZKS6pP1JTZGfODExUlTylrtv4GZiMS5dy2+5vcSoRm7Ppaz6owsVhZQeea6P+6BhBJWdEJ2hc5I6cmM+BygfC1rO3RgEhqlSt4kGwTqsnoMNS5F36s87VnzSct236s38bVtSb3j/APWX1POnOR0lyxvh9ez5Xo/mahgo1PiT5VlnbM6dLUqLKuSjyErVrZLUUk+pGcIPVk5Jsi5NlozLAS0ZHoKfuBx9ghaKb8glKg3m8l6MpXqXyj+Ve5pOPsZX1Kzry0TAuLfW5exCK0VywJ1wLSIXrR6kKVWDqi7QxHExTs00/VDEKiejTEcRC/ihQgsEklI3BPHS0Xn/AH3FaeJmtH65na9Z5SaTvtlYMY/luE+n+VnYw3CC6xS2ZdYiO5RjOMvYKbnBqt4W/a2vJ5r6mCpp9UaHCK3LNr9yfqs19RWsE5LA5Ud233spKKas80zkppatLxAzxcF1v4FLSCJYzh7WcM1t1XhuZ0kbE8fsvUSnLmbllfwtcSTTwisZvqDpU7eIQH8Q6qiJPTn7AabHuI1f9VNb2fov5M+lSctP4GMp8t3lFWt11b+wdTSySBDRb5E3bVSJQoKPjuFAuozjkzpUawiTTeWGlbqClGP9zKBaUOrE1FBK5GqjmGoxk2nLNdNGaNKlGOi89X6nnnN3utbtmnguI37M8nv0fjsBZVM6NuAnEK+fL3CXOhziUMk9jPKRwJQXnROdAiDWbaEk08iHYRsdA8mU3HCIxavC2fRjLOON8jmugRlTFaceoxGKcbMo42CUjokl9PA8nizOq03F2ZQ0sRR5l3rQz1F3sInZaE9yOJDOHhZp3zJTp2LhFlK8BpRKhTqouWhN4IJi82covMJUw010v4ZgoZMRS/KylYL1ad81qLjoKrTvmtTrTBGXRlaLDKQCmFHWQS5CJkBjNLDyeuS9xXSEaOUoX8C+JlaL8LeuQRIV4hLspbv5HDKTnInH8pIzyEHcLhesvJfcq3R1tpBcI5ctpadL6/8AAE42dh4BiodfI2lqXhkN2bFgsI2JCNixczZCEIYU4yGjjcLbtJZde7+BSxzrRc1aZrAyVytNarwGLIB+ItJPpp/I8dOUItXgeNvAzTwzeuS9wrw1PZETIKpUDdQOWFp9/qDlg47v2GAdeVkZzNuYXCYaLinr/A0qKEuF1NY+a+v0NCUkld6AilJWxivwkIYqvFvlik81m8/Qri8Y5ZLKPuxalqvFD7UugGzUWHg1eyOPCLp8juGl0Dk7JcmdiMA3mrXBUsM3q7d3UfxFTovM7GiqkFusrlIzaQ0ZdGCp0lHRfcuKTUoOzuvkdWIfiHks9F8p2GqIzMfK8ktl8/6jQ/EJ6r6itkpOTu29NrdCTjUrEjBwlbRzC4W2ctdthoXeK7ifFk9ELslIDt5YwQCubq/Q6l4jR0ZC2i8qSByptDkVkTlRvrbXTBKaXKECDlWEbNtaJshRayfQ0Xu4NSSM3F4flzX5X7GmzOx2OWcY59G9V5EtObiwIza9TovMWqaBXAHPQ6tyksHRAYwFf9L8vsPGKmamFrcy71r9yMl1Bqw6oMxXEy6eYw2Z9ermyUreEJFWy9KtyNS2f/QlfFup4bffvM6Ur6nE7F9PT2ot9PA6Xo/mQtCvuNYf8y8wywiUk0sjkJWdxqrUsr+glKRx1H1JQ05NWSSdFmxrAS1Xn/fYUTC4WVpLvy9QsQerUVJWf8oya9Bwdn5Pc2SlZRafNa3fl7mTotparhjoYcmMLTyFqzjdqLul10C15WVtx5vbG2W1JbmDpyV9LBRUNTnfLqS0Na/xkRnHqEOwWaOBKKzOmTpCIOQhDiasMlaAY+VoPvsvU4B4rLKK3bfp/wBIU0lSLaEdsTRxkqkrxirLduzf2QrHh0urXuzVkig+xIVIRjw5dZPyVgWOwsIx63y6mlJ2MziM8l3u/p/0V0nSA5U0kZU4NHKdZxd0MFXSTGsup+4TD1py1eXgdeHj3+oanFJWRGaa2q0bbfGAP4aP9ZPw8dvcs6mdupxsncvci9y5ZV0Ibe7LUbRd0strshxht+5rZr0cNTmrxb8LrLxOvh20vVGXQrSg7xf2fibVDGwlG7drap/3MqtSQrtCz4fLo17orLDTjm7ZdbpfMJX4l0gvN/YQq1XLOTuM23yDkdxOPa/JFt7vT06mTiKlSTvK78mkvIep6I63YnDV29AKe11RlwdmMVZXfhkFqVb6AWhdaT1VhFotyKkO2OWOJ2mYPTncZw61EEaVCD5V35nXHVc4U+SbjTLEO8jJysFMOBPiULwvs0/oQZrU7xa3TIPF4KwkqNIpJFwNWp0RWcklkjKW0DUlczcfLtJbI0GjLxLvJ+NvTI545dktLMrYNIJFWJGNjpZIu2WgzsipY0sxKacuhnYiXbb8PkMUavN4itZ9p+LKxlbNFnp7oopKNmgcZWlU5kWZy1TpnPVEGo0rR7yuGp9X5DAyJTl0QoRlqkbMlOF2Uk8FIVdssqll6gpSb1HuVWt0AVMNt6E3CianFtsXISUbakAuS0Hk4clY6LVJ3Y0op8lmrG4R6bmuo5W2M7BK8k/M0gatKkjnKkOtCeNxFuytevcaOQUDxuIv2Vp1+xBMhZKh0qN2rWWia9QXOt16nzrDYZzkoRScpZJZK7tks+r0XeXXD6jhGoqUnCdrSUHJZycErpZNyVktXdbo+fl6m27ce/g9CXpFv+fbyfQZSW69TKT67nmJ8Grrl/0VO0pNJU5NpRlyyukrqztrut0Go8Aryh8TkjCLkoR+LKNCU5NRlaEZtOWUovLW6tcMfU9v69/AY+kqP79vJ6PmW5OZbnmcRwLEwk4yw9W6qOllSm06ibXJGSVpSyeSLz4BXjbnpuClFyvNOCVpVI8km12Z3pVLRefZG+7f07+B/ta+Xbyej5ludUlueJsticq2D91fw7+DL0xL9+3k9E5HLnnrEsV+9P4d/BX/AEV8u3k9HCdndGhh2p9cup4yxHFbCT9W3fp38Cz9OUv27eT6DzLdE5luj59yLZE5FshPur+HfwQ+0L59vJ72rZhaSSWqPnvKtkc5Fsg/dn8O/gL9JxW/t5PovMt0TmW6PnXItkTkWyD92fw7+Bfs6+fbyfRJWethapR2dzwnItkTlWyA/Vb/AE7+Bo+k1+/byevr1OnqAueYsiZG+6v4d/Bf/Q/t28nvuFSXLdtba7DcsQj5tyrZHOVbIV+ptu9vfwTfpl8T7eT6NKv3oXqUovrZngbLuOdnu9gL1NriPfwJ9q/v28ntqlJrZruOniVFbIhRerv4d/A69N/v28hKdRxalF2lFxkns4u6fqjbl/k073VOEbNqCjkowfInTeXM1aCzTjm288rYRDxz1DTo8VjGMYKj2acoSjeo+ZOEpThzSUVzJSqVbqyuprTlTG8H/k9Sk6sow/2Vm7t1Knw84KHaoJqNRrNxb0bvnZGCQ1BPTv8AzOd5NYemnUVSnLt1M6M51Kkqas1yvmqz7azSt1u3n8U458ahSw/woxp4bn+DaTlKCnOcpxba7SfNDXT4Stq0ZBAUjEIQgQEIQhjEIQhjEIQhjEIQhjEIQhjEGMDi5Upc8bX5ZLNXWecXbeMlGS74q91dNchjGz/7+d/w2Gt+1U0o9LZLw+W132P+RPljF0KDjByaTh2VzdEr2SzfiYpDUE1anGubkvQo9hTStGy7as/TVbd5etx5u9sPh4ZZOFNRcZJtqcXre7WWnZRjkNRj0L/yypdP4VPJyeTmm+arGs7tPN80ddfe9F/lVXkjBwptRVr2ab/1/D7Vnnv020MEhqRhniWMlWqzqySUptNqOSySXyRBYhgH/9k=);
  z-index: -1;
}
.username {
  margin-top: 15px;
}
.email {
  margin-top: 10px;
}
.logout {
  float: right;
}
.date {
  margin-top: 5%;
  float: right;
}
.profilePicture {
  left: 50px;
  z-index: 100;
  font-size: 5px !important;
}
.file {
  z-index: -100;
  opacity: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}
</style>
