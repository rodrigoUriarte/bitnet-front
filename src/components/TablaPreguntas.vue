<template>
  <v-container class="pa-3" fluid>
    <div v-if="isLoading">Cargando Preguntas...</div>
    <div v-else>
      <v-card class="mb-2" elevation="10" outlined shaped>
        <v-card-title> Foro: {{ foro }} </v-card-title>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="preguntas"
        sort-by="name"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.titulo`]="{ item }">
          <router-link
            :to="{
              name: 'RespuestasPorPregunta',
              params: { pregunta_id: item.id },
            }"
          >
            {{ item.titulo }}
          </router-link>
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Preguntas</v-toolbar-title>
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
                  v-if="$can('createPregunta')"
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
                          v-model="editedItem.titulo"
                          label="Titulo"
                          hint="Ingrese un titulo para su pregunta"
                        ></v-text-field>
                      </v-col>
                      <v-col md="12">
                        <v-text-field
                          v-model="editedItem.descripcion"
                          label="Descripcion"
                          hint="Desarrolle su pregunta"
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
            v-if="$can('updatePregunta')"
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon v-if="$can('deletePregunta')" small @click="deleteItem(item)">
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
import PreguntaDataService from "../services/PreguntaDataService";

export default {
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      { text: "Id", align: "start", value: "id" },
      { text: "Titulo", value: "titulo" },
      { text: "Autor", value: "user.name" },
      { text: "Fecha", value: "created_at" },
      { text: "Cantidad Resp.", value: "cant_respuestas" },
      { text: "Fecha Ult. Resp.", value: "fecha_ult_resp" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    isLoading: true,
    preguntas: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      titulo: "",
      descripcion: "",
      foro_id: "",
      user_id: "",
    },
    defaultItem: {
      id: null,
      titulo: "",
      descripcion: "",
      foro_id: "",
      user_id: "",
    },
    dialogDelete: false,
    foro: "",
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
    this.getPreguntas();
  },

  methods: {
    async getPreguntas() {
      try {
        const foro_id = this.$route.params.foro_id;
        const response = await PreguntaDataService.index(foro_id);
        this.preguntas = response.data.data.preguntas;
        this.foro = response.data.data.nombre;
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async save() {
      if (this.editedIndex > -1) {
        //EDITAR
        try {
          const response = await PreguntaDataService.update(
            this.editedItem.id,
            this.editedItem
          );
          Object.assign(this.preguntas[this.editedIndex], response.data.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        //CREAR
        try {
          const foro_id = this.$route.params.foro_id;
          const user_id = JSON.parse(localStorage.getItem("user")).user.id;
          this.editedItem.foro_id = foro_id;
          this.editedItem.user_id = user_id;
          const response = await PreguntaDataService.store(this.editedItem);
          this.editedItem.id = response.data.data.id;
          this.preguntas.push(response.data.data);
        } catch (error) {
          console.error(error);
        }
      }
      this.close();
    },

    async destroy(id) {
      try {
        await PreguntaDataService.destroy(id);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    editItem(item) {
      this.editedIndex = this.preguntas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.preguntas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const id = this.editedItem.id;
      this.destroy(id);
      this.preguntas.splice(this.editedIndex, 1);
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