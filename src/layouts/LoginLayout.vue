<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="bg-primary flex flex-center" style="height: 100vh">
      <div>
        <form class="text-center" @submit.prevent="submitLogin">
          <img class="logo-telegram" src="~/assets/telegram-logo.svg" />
          <input
            class="input-name"
            placeholder="Nome usuário"
            autofocus
            type="text"
            v-model="name"
          />
          <q-btn
            class="q-mt-sm full-width"
            type="submit"
            color="accent"
            label="entrar"
            size="20px"
          />
        </form>

        <div v-show="warning" class="notification">
          Digite o nome do usuário
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
//quasar
import { uid, LocalStorage } from "quasar";

export default {
  name: "Login",
  data() {
    return {
      name: "",
      warning: false,
    };
  },
  methods: {
    submitLogin() {
      if (!this.name || this.name.trim().length == 0) {
        this.warning = true;
        setTimeout(() => {
          this.warning = false;
        }, 3000);
        return;
      }

      let userNew = {
        uuid: uid(),
        name: this.name,
      };

      //adiciona localmente
      LocalStorage.set(`@${this.name}`, userNew);
      LocalStorage.set(`@logger`, this.name);

      this.$router.push("/telegram");
    },
  },
};
</script>

<style scoped>
.input-name {
  padding: 20px 20px;
  font-size: 30px;
  color: aliceblue;

  border-radius: 5px;
  border: none;
  outline: none;
  width: 100%;
  background-color: #242f3d;
}

.logo-telegram {
  width: 100px;
  margin-bottom: 60px;
}

.notification {
  position: absolute;
  width: 620px;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  padding: 15px;
  background-color: brown;
  color: aliceblue;
  border-radius: 5px;
}
</style>