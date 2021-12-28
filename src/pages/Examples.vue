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
        <q-btn @click="showNotification" color="dark" label="Show another notification" />
      </div>
      <div>
        {{ todaysDate }}
      </div>
      <q-btn :icon="$q.platform.is.ios ? 'thumb_up' : 'ion-ios-gear-outline'" />
      <q-icon name="thumb_up" />
    </div>
    <!-- <q-page class="bg-light-green window-height window-width row justify-center items-center"> -->
    <!-- </q-page> -->
  </div>
  <div class="q-pa-md">
    <q-file v-model="file" label="Standard" />
    <q-btn @click="onSubmit()" color="primary" label="Click"></q-btn>
  </div>
  <div>
    <img :src="imageUrl" />
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { date } from "quasar";
import { matMenu } from "@quasar/extras/material-icons";
import { mdiAbTesting } from "@quasar/extras/mdi-v6";
import { fasFont } from "@quasar/extras/fontawesome-v5";
// import axios from "axios";

export default {
  name: 'Examples',
  created() {
    this.matMenu = matMenu;
    this.mdiAbTesting = mdiAbTesting;
    this.fasFont = fasFont;
  },
  components: {},
  mounted() {
    // return new Promise((resolve, reject) => {
    //   this.$router
    //     .push("/examples")
    //     // this.doSomething()
    //     .then((response) => {
    //       this.$q.notify({
    //         color: "positive",
    //         position: "top",
    //         message: "Request sent! We'll contact you soon.",
    //         icon: "done",
    //       });
    //       resolve(response);
    //     })
    //     .catch((err) => {
    //       reject(err);
    //     });
    // });
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
  data() {
    return {
      editor: "",
      file: "",
      file_selected: "",
      imageUrl: "",
    };
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "D/MM/YYYY hh:mm");
    },
  },
  methods: {
    onSubmit() {
      console.log("file", this.file);
      var authAxios = axios.create();
      var formData = new FormData();
      formData.append("file", this.file);
      return new Promise((resolve, reject) => {
        authAxios
          .post("http://localhost:8088/image/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("imageUpload", response.data);
            this.imageUrl = response.data;
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    singleUploadForm(file) {
      console.log("file", file);
      var authAxios = axios.create();
      var formData = new FormData();
      formData.append("file", file);
      return new Promise((resolve, reject) => {
        authAxios
          .post("http://localhost:8088/image/upload", file)
          .then((response) => {
            console.log("singleUploadForm", response.data);
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
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

<style></style>
