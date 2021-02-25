<template>
  <v-container v-if="$can('showDashboard')" class="pa-3" fluid>
    <div v-if="isLoading">Cargando Dashboard...</div>
    <div v-else>
      <v-card class="mb-2" elevation="10" outlined shaped>
        <v-card-title> Usuario </v-card-title>
        <v-card-subtitle>Nombre: {{ user.name }} </v-card-subtitle>
        <v-row>
          <v-col md="6">
            <v-card-text>Email: {{ user.email }} </v-card-text>
            <v-card-text>Reputacion: {{ user.reputacion }} </v-card-text>
            <v-card-text>Cantidad Likes: {{ user.likes }} </v-card-text>
          </v-col>
          <v-col md="6">
            <v-card-text>Cantidad Dislikes: {{ user.dislikes }} </v-card-text>
            <v-card-text
              >Cantidad Preguntas: {{ user.cant_preguntas }}
            </v-card-text>
            <v-card-text
              >Cantidad Respuestas {{ user.cant_respuestas }}
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="preguntas"
        sort-by="created_at"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Preguntas</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:no-data>
          <br />
          <v-alert dense outlined text type="info" color="primary">
            Sin Registros
          </v-alert>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Id", align: "start", value: "id" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Fecha", value: "created_at" },
    ],
    isLoading: true,
    preguntas: [],

    user: {
      name: "",
      email: "",
      reputacion: "",
      likes: "",
      disklikes: "",
      cant_preguntas: "",
      cant_respuestas: "",
    },
  }),

  created() {
    this.getPreguntas();
  },

  methods: {
    async getPreguntas() {
      try {
        const user_id = JSON.parse(localStorage.getItem("user")).user.id;
        const response = await UserDataService.getPreguntas(user_id);
        console.log(response);
        this.preguntas = response.data.data.preguntas;
        this.user.name = response.data.data.name;
        this.user.email = response.data.data.email;
        this.user.reputacion = response.data.data.reputacion;
        this.user.likes = response.data.data.likes;
        this.user.dislikes = response.data.data.dislikes;
        this.user.cant_preguntas = response.data.data.cant_preguntas;
        this.user.cant_respuestas = response.data.data.cant_respuestas;

        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>