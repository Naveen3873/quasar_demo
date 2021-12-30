<template>
  <div>
    <q-page-container>
      <q-page class="flex flex-center">
        <div>
          <div>
            <div class="q-px-sm q-gutter-sm">
              <q-card v-for="p in posts" :key="p.title" bordered>
                <q-card-section vertical>
                  <q-card-section class="q-pt-xs q-pb-xs">
                    <div class="row">
                      <span class="q-mr-lg text-caption text-primary">{{ p.title }}</span>
                      <span class="q-px-xs absolute-right"
                        ><q-icon name="fa fa-ellipsis-v" @click="show()"
                      /></span>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pt-xs" @click="fullpage()">
                    <div class="text-justify">
                      {{ p.content }}
                    </div>
                  </q-card-section>
                  <q-img
                    class="rounded-borders cardimg"
                    :src="p.imageUrl"
                    @click="fullpage()"
                  />
                  <q-card-section class="q-pt-xs q-pb-xl">
                    <div class="row">
                      <span class="absolute-left q-pt-xs text-caption">{{
                        p.views
                      }}</span>
                      <span class="q-px-xs absolute-right text-caption">{{
                        p.time
                      }}</span>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pb-xs">
                    <div class="row">
                      <span class="absolute-left"
                        ><q-icon name="comment" />
                        <span class="text-caption"></span>
                      </span>
                      <span class="q-px-xs absolute-right" @click="share()"
                        ><q-icon name="share" />
                        <span class="text-caption"></span></span
                      >
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-page>
      <q-page-scroller position="bottom-right" :scroll-offset="300" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="light-blue-7" />
      </q-page-scroller>
    </q-page-container>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import axios from 'axios';

export default defineComponent({
  name: "Post",
  data() {
    return {
      search: "",
      posts: [],
    };
  },
  // setup () {
  //    const $q = useQuasar()
  //   return {
  //     showNotif () {
  //       $q.notify({
  //         message: 'Jim pinged you.',
  //         color: 'blue'
  //       })
  //       $q.bottomSheet({ })
  //     },
  //   }
  // }
  mounted() {
	  this.getAllPosts();
  },
  setup() {
    const $q = useQuasar();
    function share(grid) {
      $q.bottomSheet({
        grid,
        actions: [
          {
            label: "Drive",
            img: "https://cdn.quasar.dev/img/logo_drive_128px.png",
            id: "drive",
          },
          {
            label: "Keep",
            img: "https://cdn.quasar.dev/img/logo_keep_128px.png",
            id: "keep",
          },
          {
            label: "Google Hangouts",
            img: "https://cdn.quasar.dev/img/logo_hangouts_128px.png",
            id: "calendar",
          },
          {
            label: "Calendar",
            img: "https://cdn.quasar.dev/img/logo_calendar_128px.png",
            id: "calendar",
          },
          {},
          {
            label: "Share",
            icon: "share",
            id: "share",
          },
        ],
      })
        .onOk((action) => {
          // console.log('Action chosen:', action.id)
        })
        .onCancel(() => {
          // console.log('Dismissed')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }
    function show(grid) {
      $q.bottomSheet({
        grid,
        actions: [
          {
            label: "Share",
            icon: "share",
            id: "share",
          },
          {
            label: "Browse Page",
            icon: "ti-new-window",
            id: "browse",
          },
          {
            label: "Block Page",
            icon: "block",
            id: "block",
          },
          {
            label: "Report",
            icon: "report",
            id: "report",
          },
        ],
      })
        .onOk((action) => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    }
    return { share, show };
  },
  methods: {
    fullpage() {
      this.$router.push("/fullnews");
    },
    getAllPosts() {
      return new Promise((resolve, reject) => {
        axios.post('/post/getAll')
          .then((response) => {
            this.posts = response.data;
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
</script>
<style scoped>
.my-card {
  width: 100%;
}
.cardimg {
  max-height: 200px;
}
/* .q-bottom-sheet_item{
  color: blue;
} */
/* .q-card__section--vert {
    padding: 10px !important;
} */
</style>
