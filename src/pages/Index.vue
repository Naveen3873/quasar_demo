<template>
  <q-page>
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
    <!-- <h5 class="text-center text-primary">ExamsDaily</h5> -->
    <q-container>
      <q-img
        src="https://cdn.filestackcontent.com/output=compress:true/tGVLsElPSxe2bF8G4rFp"
      >
        <div class="absolute-bottom text-subtitle1 text-center text-white">
          Success is the sum of small efforts repeated day in and day out
        </div>
      </q-img>
    </q-container>
    <q-container>
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
    </q-container>
    <q-container>
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
    </q-container>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
  setup() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
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
.q-pt-none{
  margin-top: 5px;
}
</style>
