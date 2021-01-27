<template>
  <div>
    <div v-if="isLoading">Cargando Foros...</div>
    <div v-else>
      <v-data-table
        :headers="headers"
        :items="foros"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:[`item.nombre`]="{ item }">
          <router-link
            :to="{ name: 'PreguntasPorForo', params: { foro_id: item.id } }"
          >
            {{ item.nombre }}
          </router-link>
        </template>

        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Foros</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
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
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.nombre"
                          label="Nombre"
                          hint="Ingrese un nombre para el foro"
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
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <br />
          <v-alert dense outlined text type="info" color="primary">
            Sin Registros
          </v-alert>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import ForoDataService from "../services/ForoDataService";

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Id", align: "start", value: "id" },
      { text: "Nombre", value: "nombre" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    isLoading: true,
    foros: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      nombre: "",
    },
    defaultItem: {
      id: null,
      nombre: "",
    },
    dialogDelete: false,
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
    this.getForos();
  },

  methods: {
    async getForos() {
      try {
        const response = await ForoDataService.index();
        this.foros = response.data.data;
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async save() {
      if (this.editedIndex > -1) {
        //EDITAR
        try {
          const response = await ForoDataService.update(
            this.editedItem.id,
            this.editedItem
          );
          Object.assign(this.foros[this.editedIndex], response.data.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        //CREAR
        try {
          const response = await ForoDataService.store(this.editedItem);
          this.editedItem.id = response.data.data.id;
          this.foros.push(response.data.data);
        } catch (error) {
          console.error(error);
        }
      }
      this.close();
    },

    async destroy(id) {
      try {
        await ForoDataService.destroy(id);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    },

    editItem(item) {
      this.editedIndex = this.foros.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.foros.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const id = this.editedItem.id;
      this.destroy(id);
      this.foros.splice(this.editedIndex, 1);
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