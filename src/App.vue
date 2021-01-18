<template>
  <v-app id="inspire">
      <sidebar></sidebar>

      <v-main>
          <router-view></router-view>
      </v-main>

      <v-footer color="indigo" app>
          <span class="white--text"
            >&copy; {{ new Date().getFullYear() }}
            <a
              href="https://github.com/rodrigoUriarte/"
              target="_blank"
              style="color: white"
              >Rodrigo Uriarte</a
            >
          </span>
      </v-footer>
  </v-app>
</template>

<script>
import sidebar from "./layouts/Sidebar.vue";

export default {
  components: {
    sidebar,
  },
};
</script>