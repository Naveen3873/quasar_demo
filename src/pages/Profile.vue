<template>
  <div>
    <q-avatar size="100px" class="avatar">
      <img src="https://cdn.quasar.dev/img/avatar.png" />
    </q-avatar>
  </div>
  <div>
    <div class="tabs">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="profile" label="Profile" />
          <q-tab name="security" label="Security" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="profile">
            <q-input v-model="firstName" label="First name" />
            <q-input v-model="lastName" label="Last name" />
            <q-input v-model="username" label="Username" />
            <q-input v-model="email" label="Email" />
            <q-input v-model="mobile" label="Mobile number" />
            <div class="button">
              <q-btn push color="primary" label="save" />
            </div>
          </q-tab-panel>

          <q-tab-panel name="security">
            <q-input v-model="oldPassword" label="Old password" />
            <q-input v-model="newPassword" label="New password" />
            <q-input v-model="confirmPassword" label="Confirm password" />
            <div class="button">
              <q-btn push color="primary" label="save" />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useQuasar, QSpinnerFacebook } from "quasar";
import { onBeforeUnmount } from "vue";

export default {
  name: "About",
  data() {
    return {
      tab: "profile",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      mobile: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  },
  mounted() {
    this.showLoading();
    this.getUserData();
  },
  setup() {
    const $q = useQuasar();
    let timer;

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    return {
      showLoading() {
        $q.loading.show();

        // hiding in 2s
        timer = setTimeout(() => {
          $q.loading.hide();
          timer = void 0;
        }, 1000);
      },
    };
  },
  methods: {
    getUserData() {
      var currentUser = JSON.parse(localStorage.getItem("current_user"));
      // console.log(currentUser);
      this.firstName = currentUser.firstName;
      this.lastName = currentUser.lastName;
      this.username = currentUser.username;
      this.email = currentUser.email[0];
      this.mobile = currentUser.mobile[0];
    },
  },
};
</script>

<style scoped>
.avatar {
  margin-top: 10%;
  margin-left: 38%;
}
.tabs {
  margin-top: 5%;
  /* left: 38%; */
}
.button {
  margin-top: 5%;
  margin-left: 40%;
}
</style>
