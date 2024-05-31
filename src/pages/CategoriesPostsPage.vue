<template>
  <q-page class="flex justify-center">
    <q-list class="list">
      <q-expansion-item
        v-for="(item, index) in categories" :key="index"
        :label="item.category"
        default-opened
        class="q-mt-md"
      >
        <PostPreviewComponent
          v-for="post in item.posts" :key="post.id"
          :post="post"
        />
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script>
import { API_ROUTES } from 'core_app/api_routes'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'CategoriesPostsPage',
  components: {
    PostPreviewComponent: defineAsyncComponent(() => import('core_app/PostPreviewComponent.vue')),
  },
  data () {
    return {
      categories: []
    }
  },
  async mounted () {
    try {
      const { data } = await this.$api.get(API_ROUTES.POST_CATEGORIESPOSTS)
      this.categories = data
      console.log(data)
    }
    catch {
      this.$notify.fail()
    }
  }
}
</script>

<style lang="sass" scoped>
.list
  width: 60vw
  height: 100%
</style>
