<template>
  <div class="logPage">
    <div class="text-center">
      <div v-ripple>ExamsDaily</div>
      <q-icon name="alarm" />
      <q-icon name="cloud" />
      <div>
        <q-btn
          @click="$q.notify('please upgrade your app')"
          color="primary"
          label="Show a notification"
        />
        <q-btn
          @click="showNotification"
          color="dark"
          label="Show another notification"
        />
      </div>
      <div>
        {{ todaysDate }}
      </div>
      <q-btn :icon="$q.platform.is.ios ? 'thumb_up' : 'ion-ios-gear-outline'" />
      <q-icon name="thumb_up"/>
    </div>
    <!-- <q-page class="bg-light-green window-height window-width row justify-center items-center"> -->
    <!-- </q-page> -->
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { date } from "quasar";
import { matMenu } from "@quasar/extras/material-icons";
import { mdiAbTesting } from "@quasar/extras/mdi-v6";
import { fasFont } from "@quasar/extras/fontawesome-v5";

export default {
  created() {
    this.matMenu = matMenu;
    this.mdiAbTesting = mdiAbTesting;
    this.fasFont = fasFont;
  },
  setup() {
    const $q = useQuasar();
    const myInfiniteVariable = ref(false);

    function showNotification() {
      $q.notify("Are you update???");
    }
    function doSomething() {
      // this method has been called (in this case)
      // because @show event was triggered by QBogus component
    }

    function doSomethingElse() {
      // this method has been called (in this case)
      // because @hide event was triggered by QBogus component
    }

    return {
      showNotification,
      myInfiniteVariable,
      doSomething,
      doSomethingElse,
    };
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "D/MM/YYYY hh:mm");
    },
  },
};

// export default {
//   name: "Login",
//   data() {
//     return {
//       email: "",
//       password: "",
//     };
//   },
//   methods: {
//     login: function () {
//       console.log("email", this.email);
//       console.log("password", this.password);
//     },
//   },
// };
</script>

<style>
</style>
