<template>
  <img src="~assets/login.webp" class="wave" alt="login-wave" />
  <div class="row" style="height: 90vh">
    <!-- <div class="text-center text-primary">
      <h3>ExamsDaily</h3>
    </div> -->
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="~assets/login.svg" class="responsive" alt="login-image" />
    </div>
    <div
      v-bind:class="{ 'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs }"
      class="col-12 col-md-6 flex content-center"
    >
      <q-card v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }">
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="~assets/google.jpg" alt="avatar" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">Login</h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="login">
            <q-input label="Username" v-model="user.username"> </q-input>
            <q-input label="Password" type="password" v-model="user.password"> </q-input>
            <div>
              <q-btn
                class="full-width"
                color="primary"
                label="Login"
                type="submit"
                rounded
              ></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
// import { required, email, minLength } from 'vuelidate/lib/validators'
import axios from "axios";
// import btoa from "vue";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    localStorage.removeItem("access");
    // var Buffer = require('buffer/').Buffer
    // console.log(Buffer);
    // // console.log(Buffer.from('Hello World!').toString('base64'));
    // return new Promise((resolve, reject) => {
    //   this.$api.get('/telecaller/')
    //   .then((response) => {
    //     console.log(response.data);
    //     resolve(response);
    //   })
    //   .catch((err) => {
    //     console.log("homepage error");
    //     reject(err);
    //   })
    // })
  },
  // validations: {
  //   email: { required, email },
  //   password: { required, minLength: minLength(4), }
  // },
  // setup() {
  //   const inputRef = ref(null);

  //   return {
  //     model: ref(""),
  //     inputRef,

  //     reset() {
  //       inputRef.value.resetValidation();
  //     },
  //   };
  // },
  methods: {
    login() {
      var authAxios = axios.create({
        baseURL: "https://test.examsdaily.in:8443/edaily-auth",
      });
      return new Promise((resolve, reject) => {
        var Buffer = require('buffer/').Buffer
        authAxios({
          method: "post",
          url: "/oauth/token",
          headers: {
            Authorization: "Basic " + Buffer.from('barClientIdPassword:password').toString('base64'),
            // Authorization: "Basic " + $Buffer.from('barClientIdPassword:password').toString('base64'),
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          params: {
            grant_type: "password",
            username: this.user.username,
            password: this.user.password,
          },
        })
          .then((response) => {
            console.log("login()",response.data);
            // $q.notify("login successfully");
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.access_token;
              // this.about();
            localStorage.setItem("access", "approve");
            this.$router.push('/home')
            // localStorage.setItem("accessToken", response.data.access_token);
            // localStorage.setItem("refreshToken", response.data.refresh_token);
            // localStorage.setItem("contact", this.user.username);
            // localStorage.setItem("roles", "USER");
            resolve(response);
          })
          .catch((err) => {
            console.log("login failed");
            // $q.notify({
            //   color: "negative",
            //   position: "top",
            //   message: "Loading failed",
            //   icon: "report_problem",
            // });
            reject(err);
          });
      });
    },
    about() {
      return new Promise((resolve, reject) => {
        axios.get('/about')
        .then((response) => {
          console.log("about",response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        })
      })
    },
  },
};
</script>

<style scoped>
/* .login {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  background: #1976D2 !important;
}
.loginBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.q-card {
  width: 360px;
  margin-top: 40%;
} */
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
