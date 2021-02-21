<template>
  <v-app-bar app color="indigo">
    <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-toolbar-title>bitNet</v-toolbar-title>
  </v-app-bar>
</template>