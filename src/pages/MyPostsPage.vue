<template>
  <q-page class="flex justify-center">
    <PostPreviewComponent
      v-for="post in posts" :key="post.id"
      :post="post"
    >
    </PostPreviewComponent>
  </q-page>
</template>

<script>
import { API_ROUTES } from 'core_app/api_routes';
import { defineAsyncComponent } from 'vue';

export default {
  name: 'MyPosts',
  components: {
    PostPreviewComponent: defineAsyncComponent(() => import('core_app/PostPreviewComponent.vue')),
  },
  data () {
    return {
      posts: []
    }
  },
  methods: {
    async getPosts() {
      try {
        const { data } = await this.$api.get(`${API_ROUTES.POST_MYPOSTS}`)
        this.posts = data
      }
      catch {
        this.$notify.fail()
      }
    }
  },
  async mounted () {
    await this.getPosts()
  }
}
</script>
