<template>
  <div>
    <q-tabs v-model="tab" inline-label class="bg-teal text-white shadow-2">
      <q-tab name="courses" icon="fas fa-graduation-cap" label="Courses" />
      <q-tab name="learn" icon="fas fa-link" label="Learn" />
      <q-tab name="tables" icon="fas fa-table" label="Tables" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="courses"> </q-tab-panel>
      <q-tab-panel name="learn">
        <div class="q-pa-md">
          <iframe
            width="350"
            height="315"
            src="https://www.youtube.com/embed/ZR3p4D_gVtQ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="q-pa-md">
          <iframe
            width="350"
            height="315"
            src="https://www.youtube.com/embed/B5o3derVK20"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <div class="q-pa-md">
          <iframe
            width="350"
            height="315"
            src="https://www.youtube.com/embed/Xxl1cMp4YMk"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <div class="q-pa-md">
          <iframe
            width="350"
            height="315"
            src="https://www.youtube.com/embed/DCoy2PIcB4w"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <div class="q-pa-md">
          <iframe
            width="350"
            height="315"
            src="https://www.youtube.com/embed/3h6rtOEy2N0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <div class="q-pa-md">
          <iframe
            width="350"
            height="315"
            src="https://www.youtube.com/embed/Zh9fAxTTpe0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </q-tab-panel>
      <q-tab-panel name="tables">
        <div class="q-pa-md">
          <q-table :rows="rows" row-key="name" />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
// export default {
// name:'Dashboard',
// }
var rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
];
import { useQuasar, QSpinnerFacebook } from "quasar";
import { onBeforeUnmount } from "vue";

export default {
  name: "Dashboard",
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
      rows,
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
  data() {
    return {
      tab: "courses",
    };
  },
};
</script>

<style></style>
