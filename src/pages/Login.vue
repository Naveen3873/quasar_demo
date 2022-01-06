<template>
  <img src="~assets/login.webp" class="wave" alt="login-wave" />
  <div class="row" style="height: 90vh">
    <!-- <div class="text-center text-primary">
      <h3>ExamsDaily</h3>
    </div> -->
    <!-- <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="~assets/bg1.jpg" class="responsive" alt="login-image" />
    </div> -->
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
          <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
          >
            Sign in with Google
          </g-signin-button>
          <!-- <div class="g-signin2" data-onsuccess="onSignIn">Google</div> -->
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">Login</h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input label="Username" v-model="user.username"> </q-input>
            <q-input label="Password" type="password" v-model="user.password"> </q-input>
            <div>
              <q-btn
                class="full-width"
                color="primary"
                label="Login"
                @click="signin()"
                rounded
              ></q-btn>
            </div>
          </q-form>
        </q-card-section>
        <div class="pushRegister">
          <p class="text-primary" @click="pushRegister = true">i dont have an account</p>
        </div>
        <div>
          <q-dialog v-model="pushRegister">
            <q-card>
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Register</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section class="register">
                <q-form class="q-gutter-md">
                  <q-input type="text" label="First Name" v-model="register.firstName">
                  </q-input>
                  <q-input type="text" label="Last Name" v-model="register.lastName">
                  </q-input>
                  <!-- <q-input label="Mobile" v-model="register.mobile"> </q-input> -->
                  <q-input type="email" label="Email" v-model="register.email"> </q-input>
                  <q-input type="password" label="Password" v-model="register.password">
                  </q-input>
                  <div>
                    <q-btn
                      class="full-width"
                      color="primary"
                      label="Register"
                      rounded
                      @click="userRegister()"
                    ></q-btn>
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// import { required, email, minLength } from 'vuelidate/lib/validators'
import axios from "axios";
// import btoa from "vue";
// import GSignInButton from '../boot/GSignInButton'
// import GSignInButton from 'vue-google-signin-button'

export default {
  name: "Login",
  data() {
    return {
      googleSignInParams: {
        client_id:
          "171717666890-5qr9lc7kfeim2m8jr90suh2cn51d4o1m.apps.googleusercontent.com",
      },
      user: {
        username: "",
        password: "",
      },
      pushRegister: ref(false),
      register: {
        firstName: "",
        lastName: "",
        email: "",
        // mobile: "",
        // username: "",
        password: "",
      },
    };
  },
  mounted() {
    // localStorage.removeItem("access");
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
    // localStorage.removeItem("contact");
    // localStorage.removeItem("roles");
    // localStorage.removeItem("current_user");
  },
  // validations: {
  //   email: { required, email },
  //   password: { required, minLength: minLength(4), }
  // },
  components: {
    // GSignInButton
  },
  methods: {
    handleSignInClick(googleUser) {
      var profile = googleUser.getBasicProfile();
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    },
    async signin() {
      await this.login();
      await this.getUserInfo(this.user.username);
      await this.routeToHomePage();
    },
    // login() {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .post("/login",this.user)
    //       .then((response) => {
    //         console.log("login()", response.data);
    //         this.getUserInfo(this.user.username);
    //         resolve(response);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    //   });
    // },
    // getUserInfo(contact){
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get("/user/get/"+contact)
    //       .then((response) => {
    //         console.log("login()", response.data);
    //         localStorage.setItem("current_user", JSON.stringify(response.data));
    //         resolve(response);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    //   });
    // },
    login() {
      var authAxios = axios.create({
        baseURL: "https://test.examsdaily.in:8443/edaily-auth",
      });
      return new Promise((resolve, reject) => {
        var Buffer = require("buffer/").Buffer;
        authAxios({
          method: "post",
          url: "/oauth/token",
          headers: {
            Authorization:
              "Basic " + Buffer.from("barClientIdPassword:password").toString("base64"),
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
            this.$q.notify({
              color: "positive",
              position: "top",
              message: "login successfully",
              icon: "done",
            });
            console.log("login()", response.data);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + response.data.access_token;
            localStorage.setItem("accessToken", response.data.access_token);
            localStorage.setItem("refreshToken", response.data.refresh_token);
            // localStorage.setItem("contact", this.user.username);
            localStorage.setItem("roles", "USER");
            resolve(response);
          })
          .catch((err) => {
            console.log("login failed");
            this.$q.notify({
              color: "negative",
              position: "top",
              message: "login failed",
              icon: "report_problem",
            });
            reject(err);
          });
      });
    },
    getUserInfo: function (contact) {
      var authAxios = axios.create({
        baseURL: "https://test.examsdaily.in:8443/edaily-auth",
      });
      return new Promise((resolve, reject) => {
        authAxios({
          method: "get",
          url: "manage/user/find/" + contact,
        })
          .then((response) => {
            localStorage.setItem("current_user", JSON.stringify(response.data));
            console.log("getUserInfo", localStorage.getItem("current_user"));
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    routeToHomePage: function () {
      return new Promise((resolve, reject) => {
        this.$router
          .push("/home")
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    userRegister() {
      // console.log(this.register);
      return new Promise((resolve, reject) => {
        // axios.get("/user/view")
        axios
          .put("/user/register", this.register)
          .then((response) => {
            console.log("register()", response.data);
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    about() {
      return new Promise((resolve, reject) => {
        axios
          .get("/about")
          .then((response) => {
            console.log("about", response.data);
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
</script>

<style scoped>
/* .body {
  background-image: url("~assets/bg1.jpg");
} */
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
p {
  float: right;
  padding-right: 10px;
}
.register {
  margin: 0 10px 2px 10px;
}
</style>
