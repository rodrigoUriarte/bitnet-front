<template>
  <v-row justify="center" align="center">
    <v-col md="6">
      <v-card color="indigo">
        <v-form @submit.prevent="login">
          <v-container fluid>
            <v-row>
              <v-col md="12">
                <v-card-title> Ingrese sus credenciales </v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6">
                <v-text-field
                  v-model="email"
                  type="email"
                  name="email"
                  label="Ingrese su email"
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  name="password"
                  label="Ingrese su contraseña"
                  hint="Al menos 8 caracteres"
                  counter
                  @click:append="show = !show"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6">
                <v-card-actions>
                  <v-btn text type="submit"> Ingresar </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      this.$store
        .dispatch("login/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "Dashboard" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>