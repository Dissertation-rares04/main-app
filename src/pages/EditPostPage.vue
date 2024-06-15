<template>
  <q-page class="flex justify-center">
    <q-card class="q-pa-md q-mt-lg create-post">
      <q-card-section>
        <div class="text-h5">Edit post</div>
      </q-card-section>

      <q-card-section>
        <q-input
          filled
          v-model="category"
          label="Category"
          :rules="[rules.required()]"
          ref="category"
          :readonly="true"
        />
      </q-card-section>

      <q-card-section>
        <q-input
          filled
          v-model="title"
          label="Title"
          :rules="[rules.required()]"
          ref="title"
        />
      </q-card-section>

      <q-card-section>
        <q-editor v-model="content" label="Content" />
      </q-card-section>

      <q-card-section>
        <q-file
          v-model="filesImages"
          filled
          label="Upload images"
          multiple
          accept=".jpg, image/*"
          clearable
          @clear="medias = []"
          @rejected="onRejected"
        />

        <q-carousel
          v-if="medias && medias.length > 0"
          class="q-pa-md"
          animated
          v-model="slide"
          arrows
          navigation
          infinite
        >
          <q-carousel-slide
            v-for="(media, index) in medias"
            :key="index"
            :name="index"
            :img-src="media.value"
          />
        </q-carousel>
      </q-card-section>

      <q-card-section align="right">
        <q-btn @click="updatePost" label="Update" color="primary" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { API_ROUTES } from "core_app/api_routes";
import { getBase64 } from "core_app/js_utils";
import { rules } from "core_app/rules";

export default {
  name: "CreatePostPage",
  data() {
    return {
      category: null,
      title: null,
      content: "",
      filesImages: null,
      medias: [],
      slide: 0,
      rules,
    };
  },
  methods: {
    async updatePost() {
      this.$refs.category.validate();
      this.$refs.title.validate();
      let hasError = false;
      hasError = this.$refs.category.hasError || this.$refs.title.hasError;
      if (hasError) {
        return;
      }

      try {
        await this.$api.put(`${API_ROUTES.POST_UPDATE}`, {
          id: this.$route.params.id,
          title: this.title,
          content: this.content,
          medias: this.medias,
        });
        this.$router.push("/my-posts");
      } catch {
        this.$notify.fail();
      }
    },

    onRejected(rejectedEntries) {
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    },
  },
  watch: {
    filesImages(value) {
      if (!value) {
        this.medias = [];
        return;
      }

      this.medias = [];
      value.forEach(async (fileImage) => {
        const base64 = await getBase64(fileImage);
        this.medias.push({ type: "img", value: base64 });
      });
    },
  },
  async mounted() {
    try {
      const { data } = await this.$api.get(
        `${API_ROUTES.POST_POST_ID}/${this.$route.params.id}`
      );
      this.category = data.category;
      this.title = data.title;
      this.content = data.content;
      this.medias = data.medias;
    } catch {
      this.$notify.fail();
    }
  },
};
</script>

<style lang="sass" scoped>
.create-post
  width: 60vw
  height: 100%
</style>
