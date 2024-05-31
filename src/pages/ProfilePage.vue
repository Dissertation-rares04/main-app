<template>
  <q-page class="flex justify-center">
    {{ code }}
  </q-page>
</template>

<script>
export default {
  name: 'ProfilePage',
  computed: {
    code () {
      return JSON.stringify(this.$auth0.user.value, null, 2)
    }
  }
}
</script>
