<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <HeaderComponenet></HeaderComponenet>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    HeaderComponenet: defineAsyncComponent(() => import('header_app/HeaderComponent.vue')),
  },
  computed: {
    isLoading () {
      return this.$auth0.isLoading.value
    }
  },
  watch: {
    isLoading (value) {
      if(value) {
        this.$q.loading.show()
      }
      else {
        this.$q.loading.hide()
      }
    }
  }
})
</script>
