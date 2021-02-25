<template>
  <v-container class="pa-3 fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col md="4">
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-card color="indigo">
          <v-form @submit.prevent="login">
            <v-container fluid>
              <v-row>
                <v-col md="12">
                  <v-card-title> Ingrese sus credenciales </v-card-title>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12">
                  <v-text-field
                    v-model="email"
                    type="email"
                    name="email"
                    label="Ingrese su email"
                    :error-messages="loginError"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12">
                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    label="Ingrese su contraseña"
                    hint="Al menos 8 caracteres"
                    counter
                    @click:append="show = !show"
                    :error-messages="loginError"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12" class="text-right">
                  <v-btn text type="submit" @click="overlay = !overlay">
                    Ingresar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      email: "",
      password: "",
      overlay: false,
      loginError: "",
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
          location.reload();
        })
        .catch((err) => {
          this.overlay = false;
          this.loginError = err.response.data.message;
        });
    },
  },
};
</script>