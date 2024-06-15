<template>
  <q-page class="flex justify-center">
    <q-card
      class="q-my-md q-px-lg q-py-md"
      style="max-width: 848px; max-height: 830px"
    >
      <div class="text-center" style="font-size: 18px">
        <p>
          This is a sample application for exemplifying an event driven
          microservice architecture.
          <br />
          The diagram below represents the architecture of the system
        </p>
      </div>
      <div>
        <q-img
          src="~assets/architecture.png"
          style="height: 562px; width: 800px"
        />
      </div>
      <div class="text-center q-mt-lg" style="font-size: 18px">
        <p>What can users do?</p>
        <p>
          Users can create and manage posts and comments, receive real-time
          email notifications for interactions such comments, and get
          personalized content recommendations based on their activity
        </p>
        <p class="text-primary text-weight-bold" style="font-size: 20px">
          Start the journey by <a href="/" @click="logIn">logging in</a> !
        </p>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      img: "@assets/architecture.png",
    };
  },
  methods: {
    logIn() {
      this.$auth0.loginWithRedirect({
        appState: {
          target: "/profile",
        },
        authorizationParams: {
          prompt: "login",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
a:link,
a:visited {
  color: $primary;
  text-decoration: none;
}
</style>
