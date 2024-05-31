<template>
  <q-page class="flex justify-center">
    <div>
      <div class="col-12">
        <PostComponent
          v-if="post"
          :post="post"
        />
      </div>
      <div class="col-12 q-mt-md">
        <q-input
          rounded
          outlined
          v-model="commentInput"
          placeholder="Add a comment"
          dense
        >
          <template #append>
            <q-icon name="send" v-ripple class="cursor-pointer q-hoverable" @click="createComment()">
              <span class="q-focus-helper"></span>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-12 q-mt-md">
        <CommentComponent
          v-for="comment in this.comments" :key="comment.id"
          :comment="comment"
          @comment-delete="(commentId) => removeCommentFromArray(commentId)"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { API_ROUTES } from 'core_app/api_routes'
import { defineAsyncComponent } from 'vue';

export default {
  name: 'PostPage',
  components: {
    PostComponent: defineAsyncComponent(() => import('core_app/PostComponent.vue')),
    CommentComponent: defineAsyncComponent(() => import('core_app/CommentComponent.vue')),
  },
  data() {
    return {
      postId: null,
      post: null,
      comments: [],
      commentInput: null
    };
  },
  methods: {
    async fetchPostData () {
      try {
        const { data } = await this.$api.get(`${API_ROUTES.POST_POST_ID}/${this.postId}`)
        this.post = data
      }
      catch {
        this.$notify.fail()
      }
    },
    async fetchComments () {
      try {
        const { data } = await this.$api.get(`${API_ROUTES.COMMENT_COMMENTS_POSTID}/${this.postId}`)
        this.comments = data
      }
      catch {
        this.$notify.fail()
      }
    },
    async createComment () {
      try {
        await this.$api.post(`${API_ROUTES.COMMENT_CREATE}`, { postId: this.post.id, content: this.commentInput })
        this.commentInput = null
        this.$notify.success()
        await this.fetchComments()
      }
      catch {
        this.$notify.fail()
      }
    },
    removeCommentFromArray (commentId) {
      const indexToRemove = this.comments.map(x => x.id).indexOf(commentId)
      this.comments.splice(indexToRemove, 1)
    },
    async viewPost () {
      try {
        await this.$api.post(`${API_ROUTES.POST_VIEW}?postId=${this.post.id}`)
      }
      catch {
      }
    }
  },
  async mounted() {
    this.postId = this.$route.params.id
    await this.fetchPostData()
    await this.fetchComments()

    if(this.post.userId !== this.$auth0.user.value.sub) {
      await this.viewPost()
    }
  }
}
</script>
