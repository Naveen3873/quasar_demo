<template>
  <div>
    <div v-bind:style="{ background: headerBg }">
      <div class="row headcontent">
        <div class="col-9 text-white">
          <div class="title q-mx-lg text-bold" v-bind:style="{ color: headerColor }">
            TITLE 2022
          </div>
          <span
            class="subtitle q-mx-lg text-bold q-px-md"
            v-bind:style="{ background: subHeaderBg, color: subHeaderColor }"
            >Result Announced</span
          >
        </div>
        <div class="col-2">
          <img class="dexter-logo" src="~assets/dexter-logo.png" />
        </div>
      </div>
    </div>
    <div>
      <p class="forLogin">Click below to login to your dashboard</p>
    </div>

    <div class="loginButton">
      <q-btn class="glossy" rounded color="primary" label="Glossy Rounded" />
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed } from "vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Responsive",
  components: {
    Navbar,
  },
  data() {
    return {
      /* css dynamically change for header box*/
      degree: "76deg",
      firstColor: "#833ab4",
      secondColor: "#fd1d1d",
      thirdColor: "#fcb045",
      headerBg: "",
      headerColor: "#fff",
      subHeaderBg: "#191970",
      subHeaderColor: "#fff",
    };
  },
  mounted() {
    this.headerBg =
      "linear-gradient(" +
      this.degree +
      "," +
      this.firstColor +
      "," +
      this.secondColor +
      "," +
      this.thirdColor +
      ")";
    // console.log(this.headerBg);
  },
  // setup() {
  //   const $q = useQuasar();
  //   const buttonColor = computed(() => {
  //     return $q.screen.lt.md ? "primary" : "secondary";
  //   });
  //   return { buttonColor };
  // },
};
</script>

<style scoped>
@media screen and (min-width: 1920px) {
  .title {
    font-size: 80px;
    /* color: black; */
  }
  .subtitle {
    font-size: 80px;
    width: 70%;
  }
  .dexter-logo {
    width: 250px;
  }
  .forLogin {
    color: white;
    background-color: #388dd2;
    font-size: 15px;
    padding: 1%;
    text-align: center;
  }
}
@media screen and (min-width: 1440px) and (max-width: 1919.98px) {
  .title {
    font-size: 80px;
    /* color: black; */
  }
  .subtitle {
    font-size: 80px;
    width: 70%;
  }
  .dexter-logo {
    width: 250px;
  }
  .forLogin {
    color: white;
    background-color: #388dd2;
    font-size: 15px;
    padding: 1%;
    text-align: center;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1439.98px) {
  .title {
    font-size: 70px;
    /* color: black; */
  }
  .subtitle {
    font-size: 70px;
  }
  .dexter-logo {
    width: 250px;
  }
  .forLogin {
    color: white;
    background-color: #388dd2;
    font-size: 15px;
    padding: 1%;
    text-align: center;
  }
  .loginButton{
    margin-top: 10%;
  }
}
@media screen and (min-width: 600px) and (max-width: 1023.98px) {
  .title {
    font-size: 50px;
    /* color: black; */
  }
  .subtitle {
    font-size: 50px;
  }
  .dexter-logo {
    width: 150px;
  }
  .forLogin {
    color: white;
    background-color: #388dd2;
    font-size: 15px;
    padding: 1%;
    text-align: center;
  }
}
@media screen and (max-width: 559.98px) {
  .title {
    font-size: 30px;
    /* color: black; */
  }
  .subtitle {
    font-size: 27px;
    text-align: center;
  }
  [class*="col-"] {
    width: 100%;
  }
  .dexter-logo {
    margin-left: 70px;
  }
  .forLogin {
    color: white;
    background-color: #388dd2;
    font-size: 15px;
    padding: 1%;
    text-align: center;
  }
}
</style>
