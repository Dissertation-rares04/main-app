<template>
  <q-page class="flex justify-center">
    <div class="profile-grid">
      <div class="profile__header">
        <img
          :src="$auth0.user.value.picture"
          alt="Profile"
          class="profile__avatar"
        />
        <div class="profile__headline">
          <h4 class="profile__title">{{ $auth0.user.value.name }}</h4>
          <span class="profile__description">{{
            $auth0.user.value.email
          }}</span>
        </div>
      </div>
      <div class="profile__details">
        <CodeSnippet title="Decoded ID Token" :code="code" />
      </div>
    </div>
  </q-page>
</template>

<script>
import CodeSnippet from "src/components/CodeSnippet.vue";

export default {
  name: "ProfilePage",
  components: {
    CodeSnippet,
  },
  computed: {
    code() {
      return JSON.stringify(this.$auth0.user.value, null, 2);
    },
  },
};
</script>

<style scoped>
.profile-grid {
  display: flex;
  flex-direction: column;

  /* responsive */

  margin-top: 48px;
}

.profile__header {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 16px;
}

.profile__avatar {
  border: solid 2px #3ec6eb;
  border-radius: 50%;

  /* responsive */

  height: 80px;
  width: 80px;
}

.profile__headline {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.profile__title {
  margin-top: 0;
  margin-bottom: 0;

  color: #fff;
}

.profile__details {
  /* responsive */

  margin-top: 32px;
}

@media only screen and (max-width: 480px) {
  .profile-grid {
    margin-top: 2.4rem;
  }

  .profile__avatar {
    height: 5.6rem;
    width: 5.6rem;

    border-radius: 50%;

    border: solid 0.13rem #3ec6eb;
  }

  .profile__title {
    font-size: 1.6rem;
  }

  .profile__description {
    font-size: 1.3rem;
  }

  .profile__details {
    margin-top: 1.6rem;
  }
}
</style>
