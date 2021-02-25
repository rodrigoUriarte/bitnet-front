<template>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense v-if="isLogged">
        <v-list-item v-if="$can('showDashboard')" link to="/dashboard">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group v-if="$can('listUsuario')" prepend-icon="mdi-account-supervisor" no-action>
          <template v-slot:activator>
            <v-list-item-title>Gestion Usuarios</v-list-item-title>
          </template>
          <v-list-item v-if="$can('listUsuario')" link to="/usuarios">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Usuarios</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="$can('listRol')" link to="/roles">
            <v-list-item-action>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Roles</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="$can('listPermiso')" link to="/permisos">
            <v-list-item-action>
              <v-icon>mdi-account-key</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Permisos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item v-if="$can('listForo')" link to="/foros">
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Foros</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click.native="logout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("login", {
      isLogged: "isLogged",
    }),
  },
  data: () => ({ drawer: false }),
  methods: {
    logout() {
      this.$store.dispatch("login/logout");
    },
  },
};
</script>