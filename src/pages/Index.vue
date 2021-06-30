<template>
  <q-page class="flex column">
    <!--mensagens-->
    <div style="container-message">
      <q-chat-message
        class="q-mx-lg"
        sent
        text-color="white"
        bg-color="primary"
      >
        <template v-slot:name>me</template>
        <template v-slot:stamp
          ><span>
            7 minutes ago
            <b><q-icon style="color: #83c0eb" name="done_all" size="20px" /></b
          ></span>
        </template>
        <template v-slot:avatar>
          <img
            class="q-message-avatar q-message-avatar--sent"
            src="https://cdn.quasar.dev/img/boy-avatar.png"
          />
        </template>

        <div>
          <span class="text-white">Olá como vc está?</span>
        </div>
      </q-chat-message>

      <q-chat-message class="q-mx-lg" bg-color="accent">
        <template v-slot:name>Mary</template>
        <template v-slot:stamp
          ><span class="text-white"
            >7 minutes ago
            <b><q-icon style="color: #83c0eb" name="done_all" size="20px" /></b
          ></span>
        </template>
        <template v-slot:avatar>
          <img
            class="q-message-avatar q-message-avatar--received"
            src="https://cdn.quasar.dev/img/avatar.png"
          />
        </template>
        <div>
          <span class="text-white">estou bem</span>
        </div>
      </q-chat-message>
    </div>
    <!--fim-->

    <!-- parte em que é enviado as mensagens -->
    <tool-message class="tool-message" />
    <!-- fim -->
  </q-page>
</template>

<script>
//components
import ToolMessage from "src/components/ToolMessage.vue";
//proxy
import { requisicao } from "src/services/proxy";
//quasar
import { LocalStorage } from "quasar";

export default {
  name: "PageCentral",
  components: { ToolMessage },
  data() {
    return {
      messageData: [],
    };
  },
  methods: {
    async loadMessage() {
      await requisicao({
        method: "GET",
        url: `/messages/${this.getUser().uuid}`,
      }).then((resp) => {
        console.log(resp.data);
      });
    },
    getUser() {
      let userName = LocalStorage.getItem(`@logger`);
      return LocalStorage.getItem(`@${userName}`);
    },
  },
  created() {
    this.loadMessage();
  },
};
</script>

<style scoped>
.tool-message {
  position: absolute;
  bottom: 0;
}
</style>
