<template>
  <v-app-bar app color="indigo">
    <v-app-bar-nav-icon
      @click.stop="$emit('toggle-drawer')"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>bitNet</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-chip class="ma-2" color="white" outlined pill>
      {{ user }}
      <v-icon right> mdi-account-outline </v-icon>
    </v-chip>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user")) != null ? JSON.parse(localStorage.getItem("user")).user.name : "LOGIN";
    },
  },
};
</script>