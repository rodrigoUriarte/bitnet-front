<template>
  <v-container class="pa-3" fluid>
    <div v-if="isLoading">Cargando Respuestas...</div>
    <div v-else>
      <v-card class="mb-2" elevation="10" outlined shaped>
        <v-card-title> Pregunta </v-card-title>
        <v-card-subtitle> {{ pregunta.titulo }} </v-card-subtitle>
        <v-card-text> {{ pregunta.descripcion }} </v-card-text>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="respuestas"
        sort-by="created_at"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Respuestas</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              class="mr-2"
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="$can('createRespuesta')"
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nuevo Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col md="12">
                        <v-text-field
                          v-model="editedItem.descripcion"
                          label="Descripcion"
                          hint="Desarrolle su respuesta"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Esta seguro que desea borrar este item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            v-if="$can('updateRespuesta')"
            small
            :style="classLike(item)"
            class="mr-2"
            @click="like(item)"
          >
            mdi-thumb-up
          </v-icon>
          <v-icon
            v-if="$can('updateRespuesta')"
            small
            :style="classDislike(item)"
            class="mr-2"
            @click="dislike(item)"
          >
            mdi-thumb-down
          </v-icon>
          <v-icon
            v-if="$can('updateRespuesta')"
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            v-if="$can('deleteRespuesta')"
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
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
import RespuestaDataService from "../services/RespuestaDataService";
import InteraccionDataService from "../services/InteraccionDataService";

export default {
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      { text: "Id", align: "start", value: "id" },
      { text: "Descripcion", value: "descripcion", width: "60%" },
      { text: "Autor", value: "user.name" },
      { text: "Fecha", value: "created_at" },
      { text: "Likes", value: "cant_likes" },
      { text: "Dislikes", value: "cant_dislikes" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    isLoading: true,
    respuestas: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      descripcion: "",
      pregunta_id: "",
      user_id: "",
      like: "",
      dislike: "",
    },
    defaultItem: {
      id: null,
      titulo: "",
      descripcion: "",
      pregunta_id: "",
      user_id: "",
      like: "",
      dislike: "",
    },
    dialogDelete: false,
    pregunta: {
      titulo: "",
      descripcion: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Item" : "Editar Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getRespuestas();
  },

  methods: {
    contieneLike(item, userId) {
      for (var element in item.interacciones) {
        if (
          item.interacciones[element].user_id == userId &&
          item.interacciones[element].respuesta_id == item.id &&
          item.interacciones[element].like == 1
        ) {
          return true;
        } else {
          return false;
        }
      }
    },

    contieneDislike(item, userId) {
      for (var element in item.interacciones) {
        if (
          item.interacciones[element].user_id == userId &&
          item.interacciones[element].respuesta_id == item.id &&
          item.interacciones[element].like == 0
        ) {
          return true;
        } else {
          return false;
        }
      }
    },

    classLike(item) {
      const userId = JSON.parse(localStorage.getItem("user")).user.id;
      return {
        color: this.contieneLike(item, userId) ? "blue" : "",
      };
    },

    classDislike(item) {
      const userId = JSON.parse(localStorage.getItem("user")).user.id;
      return {
        color: this.contieneDislike(item, userId) ? "red" : "",
      };
    },

    async getRespuestas() {
      try {
        const pregunta_id = this.$route.params.pregunta_id;
        const respuestas = await RespuestaDataService.index(pregunta_id);
        this.respuestas = respuestas.data.data.respuestas;
        this.pregunta.titulo = respuestas.data.data.titulo;
        this.pregunta.descripcion = respuestas.data.data.descripcion;
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async save() {
      if (this.editedIndex > -1) {
        //EDITAR
        try {
          const response = await RespuestaDataService.update(
            this.editedItem.id,
            this.editedItem
          );
          Object.assign(this.respuestas[this.editedIndex], response.data.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        //CREAR
        try {
          const pregunta_id = this.$route.params.pregunta_id;
          const user_id = JSON.parse(localStorage.getItem("user")).user.id;
          this.editedItem.pregunta_id = pregunta_id;
          this.editedItem.user_id = user_id;
          const response = await RespuestaDataService.store(this.editedItem);
          this.editedItem.id = response.data.data.id;
          this.respuestas.push(response.data.data);
        } catch (error) {
          console.error(error);
        }
      }
      this.close();
    },

    async destroy(id) {
      try {
        await RespuestaDataService.destroy(id);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    async like(item) {
      try {
        this.editedIndex = this.respuestas.indexOf(item);
        this.editedItem = Object.assign({}, item);
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        var interaccion = {
          respuesta_id: this.editedItem.id,
          user_id: loggedUser.user.id,
          like: 1,
        };
        await InteraccionDataService.store(interaccion);
        //ESTO DE ABAJO SIRVE PARA CAMBIAR EL LIKE DE SI UN SOLO USUARIO INTERACTUO CON LA RESPUESTA, CORREGIR
        this.respuestas[this.editedIndex].interacciones[0].like = 1;
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    async dislike(item) {
      try {
        this.editedIndex = this.respuestas.indexOf(item);
        this.editedItem = Object.assign({}, item);
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        var interaccion = {
          respuesta_id: this.editedItem.id,
          user_id: loggedUser.user.id,
          like: 0,
        };
        await InteraccionDataService.store(interaccion);
        //ESTO DE ABAJO SIRVE PARA CAMBIAR EL LIKE DE SI UN SOLO USUARIO INTERACTUO CON LA RESPUESTA, CORREGIR
        this.respuestas[this.editedIndex].interacciones[0].like = 0;
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    editItem(item) {
      this.editedIndex = this.respuestas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.respuestas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const id = this.editedItem.id;
      this.destroy(id);
      this.respuestas.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>