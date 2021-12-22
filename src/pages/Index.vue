<template>
  <q-page>
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
    <!-- <h5 class="text-center text-primary">ExamsDaily</h5> -->
    <div>
      <q-img
        src="https://cdn.filestackcontent.com/output=compress:true/tGVLsElPSxe2bF8G4rFp"
      >
        <div class="absolute-bottom text-subtitle1 text-center text-white">
          Success is the sum of small efforts repeated day in and day out
        </div>
      </q-img>
    </div>
    <div>
      <div class="row text-center card">
        <div class="col-4 col-md">
          <q-card class="my-card">
            <img src="~assets/css.jpg" />

            <q-card-section>
              <div class="text-h6">CSS</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>

            <!-- <q-card-section class="q-pt-none">
              {{ lorem }}
            </q-card-section> -->
          </q-card>
        </div>
        <div class="col-4 col-md">
          <q-card class="my-card">
            <img src="~assets/js.png" />

            <q-card-section>
              <div class="text-h6">Javascript</div>
              <div class="text-subtitle2">by Steve</div>
            </q-card-section>

            <!-- <q-card-section class="q-pt-none">
              {{ lorem }}
            </q-card-section> -->
          </q-card>
        </div>
        <div class="col-4 col-md">
          <q-card class="my-card">
            <img src="~assets/java.jpg" />

            <q-card-section>
              <div class="text-h6">Java</div>
              <div class="text-subtitle2">by Brandon</div>
            </q-card-section>

            <!-- <q-card-section class="q-pt-none">
              {{ lorem }}
            </q-card-section> -->
          </q-card>
        </div>
      </div>
    </div>
    <div>
      <q-card class="cardSelect" flat bordered>
        <q-card-section horizontal>
          <q-img class="col" src="~assets/card1.jpg" />

          <q-card-actions vertical class="justify-around q-px-md">
            <q-btn flat round color="red" icon="favorite" />
            <q-btn flat round color="accent" icon="bookmark" />
            <q-btn flat round color="primary" icon="share" />
          </q-card-actions>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ lorem }}
        </q-card-section>
      </q-card>
      <q-card class="cardSelect" flat bordered>
        <q-card-section horizontal>
          <q-img class="col" src="~assets/card4.jpg" />

          <q-card-actions vertical class="justify-around q-px-md">
            <q-btn flat round color="red" icon="favorite" />
            <q-btn flat round color="accent" icon="bookmark" />
            <q-btn flat round color="primary" icon="share" />
          </q-card-actions>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ lorem }}
        </q-card-section>
      </q-card>
      <q-card class="cardSelect" flat bordered>
        <q-card-section horizontal>
          <q-img class="col" src="~assets/card3.jpg" />

          <q-card-actions vertical class="justify-around q-px-md">
            <q-btn flat round color="red" icon="favorite" />
            <q-btn flat round color="accent" icon="bookmark" />
            <q-btn flat round color="primary" icon="share" />
          </q-card-actions>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ lorem }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar, QSpinnerFacebook } from "quasar";
import { onBeforeUnmount } from "vue";

export default defineComponent({
  name: "PageIndex",
  mounted() {
    this.showLoading();
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
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
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
});
</script>

<style scoped>
.my-card {
  width: 90%;
  max-width: 200px;
  max-height: 150px;
  margin-top: 50px;
  margin-left: 7px;
}
.cardSelect {
  margin-top: 50px;
  margin-left: 7px;
  width: 96%;
  /* max-width: 200px; */
}
.q-pt-none {
  margin-top: 5px;
}
</style>
